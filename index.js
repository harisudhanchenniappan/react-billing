const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectDB } = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
connectDB();

// Schema and Models

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  username: String,
});

const billSchema = new mongoose.Schema({
  billNumber: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      totalPrice: Number,
    },
  ],
  totalPrice: Number,
  username: { type: String, default: 'default' },
  date: { type: String, required: true }, // Date is required and sent from frontend
  
});
const Bill = mongoose.model('Bill', billSchema);

const Item = mongoose.model('Item', itemSchema);
const UserModel = mongoose.model('User', userSchema);

// Routes

app.get('/', async (req, res) => {
  res.send('Server started successfully');
});

app.post('/api/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    const newUser = new UserModel({ username, password, email });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    res.status(200).json({ message: 'Login successful!', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});



app.get('/api/items', async (req, res) => {
  const { username } = req.query;

  try {
    const items = await Item.find({ username });
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete an item
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Item.findByIdAndDelete(id);
    res.status(200).send({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/bills', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = {};
    if (startDate && endDate) {
      filter.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const bills = await Bill.find(filter);
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bills', async (req, res) => {
  try {
    const { billNumber, items, totalPrice, date ,username} = req.body;

    if (!date) {
      return res.status(400).json({ error: 'Date is required.' });
    }

    

    const bill = new Bill({
      billNumber,
      items,
      totalPrice,
      date,
      username
    });

    await bill.save();
    res.status(201).send(bill);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/summary', async (req, res) => {
  try {
    const { startDate, endDate, username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    let filter = { username }; // Match bills for the given username
    if (startDate && endDate) {
      filter.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const summary = await Bill.aggregate([
      { $match: filter },
      { $unwind: '$items' }, // Unwind items array to work with individual items
      {
        $group: {
          _id: '$items.name', // Group by item name
          totalQuantity: { $sum: '$items.quantity' }, // Sum quantities for each item
          totalPrice: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }, // Calculate total price per item
        },
      },
    ]);

    const revenueAndBills = await Bill.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
          totalBills: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      totalRevenue: revenueAndBills[0]?.totalRevenue || 0,
      totalBills: revenueAndBills[0]?.totalBills || 0,
      itemsSummary: summary,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
