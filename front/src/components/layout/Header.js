import React, { Fragment } from 'react'
import '../../App.css'

const Header = () => {
  return (
    <Fragment>
        <nav className='navbar row'>
            <div className='col-12 col-md-3'>
                <div className='navbar-brand'>
                    <a href="/">
                        <img className='image-logo' src="./logo_YeJen.png" alt="YeJen Logo"/>
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
                <span><button type="button" class="btn btn-outline-warning">Inicie Sesion</button></span>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <i className="fa fa-shopping-cart fa-lg text-white" aria-hidden="true"/>
                <span className="ml-1" id="cart_count">2</span>
            </div>
        </nav>
    </Fragment>
  )
}

export default Header