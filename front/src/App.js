import './App.css';
import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/products/productDetails';
//Router traido desde react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import { Login } from './components/user/Login';
import { Register } from './components/user/Register';
import { loadUser } from './actions/userAction';
import store from './store'
import { Profile } from './components/user/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import { UpdateProfile } from './components/user/UpdateProfile';
import { UpdatePassword } from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import Cart from './components/cart/Cart';
import { NewPassword } from './components/user/NewPassword';

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  //const {user, isAuthenticated, loading} = useSelector(state => state.auth)

  return (
    <Router>
      <div className="App">
        <Header/>
        <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/producto/:id" element={<ProductDetails/>}/>
            <Route path="/productList" element={<ProductsList />}/>
            <Route path="/search/:keyword" element={<Home/>}/>
            <Route path="/carrito" element={<Cart/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/password/forgot" element={<ForgotPassword/>}/>
            <Route path="/resetPassword/:token" element={<NewPassword/>} />
            
             {/*Ruta protegida*/}
             <Route path="/dashboard"
              element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>} />
              <Route path="/perfil"
              element={<ProtectedRoute><Profile/></ProtectedRoute>} />
              <Route path="/perfil/update"
                element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>} />
              <Route path="/password/update"
              element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />
              
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;