import './App.css';
import React from 'react';
import Header from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/products/productDetails';
//Router traido desde react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
//import ProtectedRoute from './routes/ProtectedRoute';
//import NewProduct from './components/admin/NewProduct';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/producto/:id" element={<ProductDetails/>}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/productList" element={<ProductsList />}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;