import { HomePage } from '../Home/HomePage'
import {Routes, Route} from 'react-router';
import { CheckoutPage } from '../checkout/CheckoutPage';
import { OrdersPage } from '../orders/OrdersPage';
import './App.css'
import { TrackingPage } from './pages/TrackingPage';
import { useState,useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cart, setCart]= useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3000/api/cart-items")
          .then((response)=>{
            setCart(response.data);
          })
          }, []);
  return (
   <Routes>
    <Route index element={<HomePage cart={cart}/> }></Route>
    <Route path='checkout' element={<CheckoutPage cart={cart}/>}></Route>
    <Route path='orders' element={<OrdersPage cart={cart}></OrdersPage>}></Route>
   
    
   </Routes>
     
    
  );
}

export default App
