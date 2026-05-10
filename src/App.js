import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom'
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addgadget from './components/Addgadget';
import Getgadget from './components/Getgadget';
import Endnote from './components/Endnote';
import Mpesapayement from './components/Mpesapayement'
import Navbar from './components/Navbar';
import Termsandconditions from './components/Termsandconditions';
import { CartProvider } from "./components/CartContext";
import Cartview from './components/Cartview';



function App() {
  return (
    <CartProvider>
      <Router>
      <div className='App'>
        <Navbar/>
        <br />
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/addgadget' element={<Addgadget/>}/>
          <Route path='/' element={<Getgadget/>}/>
          <Route path='/mpesapayement' element={<Mpesapayement/>}/>
          <Route path='/termsandconditions' element={<Termsandconditions/>}/>
          <Route path="/cart" element={<Cartview />} />
        </Routes>

      </div>
      <Endnote/>


    </Router>
    </CartProvider>
    
  );
}

export default App;
