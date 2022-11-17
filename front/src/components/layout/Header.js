import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

const Header = () => {
  return (
    <Fragment>
        <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#D1C9FF'}}>
            <div className='col-12 col-md-3'>
                <div className='navbar-brand'>
                    <a href="/">
                        <img className='image-logo' src="./logo.png" alt="Logo"/>
                    </a>                    
                </div>
            </div>
            <div className='col-12 col-md-6 mt-2 mt-md-0'>
                <div className="input-group">
                    <input 
                        type="text" 
                        id="search_field"
                        className="form-control"
                        placeholder='Que producto Busca?'/>
                    <div className='input-group-append'>
                        <button id="search-btn" class="btn">
                            <i className= "fa fa-search-plus fa-lg text-white" aria-hidden="true"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
            <div className='ml-4 dropdown d-inline'>
                    <Link to="#" className="btn dropdown-toggle text-black mr-4" type="button"
                        id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>Panel de Control</span>
                    </Link>
                    <div className='dropdown-menu' aria-labelledby="dropDownMenu">
                        <Link to="/admin/dashboard" className='dropdown-item'>Administracion de Productos</Link>
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