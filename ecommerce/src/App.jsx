import { HomePage } from './pages/HomePage'
import {Routes, Route} from 'react-router';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import './App.css'
import { TrackingPage } from './pages/TrackingPage';

function App() {
  
  return (
   <Routes>
    <Route index element={<HomePage/> }></Route>
    <Route path='checkout' element={<CheckoutPage/>}></Route>
    <Route path='orders' element={<OrdersPage></OrdersPage>}></Route>
    <Route path='tracking' element={<TrackingPage/>}></Route>
    
   </Routes>
     
    
  );
}

export default App
