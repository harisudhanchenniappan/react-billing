import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BillingPage from './pages/BillingPage';
import AddItemPage from './pages/AddItemPage';
import SummaryPage from './pages/SummaryPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomePage from './pages/WelcomePage';
import LoginSignupPage from './pages/LoginSignupPage';
import Home from './pages/Home';
import TodayBillsPage from './pages/TodayBillsPage ';
import TodaySummaryPage from './pages/TodaySummaryPage ';
import PastWeekSummaryPage from './pages/PastWeekSummaryPage ';
import DateRangeSummaryPage from './pages/DateRangeSummaryPage ';
import NavBar from './pages/Navbar';

const router=createBrowserRouter([
  {
  path:'/',
  element:<WelcomePage />
  
  },
  {
      path:'/Login-signup',
      element:<LoginSignupPage />
    },
    {
      path:'/home',
      element:<>
      
      <Home />
    </>,        
    },
    {
      path:'/billingPage',
      element:<>
      <NavBar />
      <BillingPage />
    </>,        
    },
    {
      path:'/addItemPage',
      element:<>
      <NavBar />
      <AddItemPage />
    </>,        
    },
    {
      path:'/summary',
      element:<>
      <NavBar />
      <SummaryPage />
    </>,     
      children:[
        {
          index:true,
          element:<TodayBillsPage />
        },
        {
          path:'/summary/today-bills',
          element:<TodayBillsPage />
        },
        {
          path:'/summary/today-summary',
          element:<TodaySummaryPage />
        },
        {
          path:'/summary/past-week-summary',
          element:<PastWeekSummaryPage />
        },
        {
          path:'/summary/date-range-summary',
          element:<DateRangeSummaryPage />
        }
      ]   
    },
  
    
    
  ])

const App = () => {
  return (
   <div>
<div className="container mt-4">
        <h1 className="text-center mb-4">React Billing !</h1>
        <RouterProvider router={router} />
      </div>

   </div>
      
   
  );
};

export default App;
