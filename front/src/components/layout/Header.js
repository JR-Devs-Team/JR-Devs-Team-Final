import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import { Search } from './Search'

const Header = () => {
  return (
    <Fragment>
        <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#D1C9FF'}}>
            <div className='col-12 col-md-3'>
                <div className='navbar-brand'>
                    <Link to="/">
                        <img className='image-logo' src="Logo.png" alt="Logo"/>
                    </Link>           
                </div>
            </div>
            <div className='col-12 col-md-4 mt-2 mt-md-0'>
                {/*Aqui va buscar*/}
                <Search></Search>
            </div>
            {/*Boton inicio Sesion*/}
            <Link to="/login" className='btn ml-4' id='login_btn'>
                Login
            </Link>
            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
            <div className='ml-4 dropdown d-inline'>
                    <Link to="#" className="btn dropdown-toggle text-black mr-4" type="button"
                        id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>Panel de Control</span>
                    </Link>
                    <div className='dropdown-menu' aria-labelledby="dropDownMenu">
                        <Link to="/dashboard" className='dropdown-item'>Administracion de Productos</Link>
                        <Link to="#" className='dropdown-item'>Pedidos</Link>
                        <Link to="#" className='dropdown-item'>Mi cuenta</Link>
                        <Link to="#" className='dropdown-item'>Cerrar Sesion</Link>
                    </div>
                </div>              
                <i className="fa fa-shopping-cart fa-lg text-white" aria-hidden="true"/>
                <span className="ml-1" id="cart_count">2</span>
            </div>
        </nav>
    </Fragment>
  )
}

export default Header