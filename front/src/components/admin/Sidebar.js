import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <div className='sidebar-wrapper'>
        <nav id='sidebar'>
            <ul className='list-unstyled components'>
                <li>
                    <Link to="/admin/dashboard"><i className='fa fa-tachometer'/>Administracion</Link>
                </li>
                {/*Botones de Producto*/}
                <li>
                    <a href='#productSubmenu' data-toggle="collapse" arailexpanded="false" 
                    className='dropdown-toggle'>
                        <i className='fa fa-product-hunt'/>Productos
                    </a>
                    <ul className='collapse list-unstyled' id="productSubmenu"> 
                        <li>
                            <Link to="#"><i className='fa fa-clipboard'/>Lista de Productos</Link>
                        </li>
                        <li>
                            <Link to="#"><i className='fa fa-plus'/>Crear Producto</Link>
                        </li>
                    </ul>
                </li>
                {/*Botones de Pedidos*/}
                <li>
                    <Link to="#"><i className='fa fa-shopping-basket'/>Pedidos</Link>
                </li>
                {/*Botones de Usuarios*/}
                <li>
                    <Link to="#"><i className='fa fa-users'/>Usuarios</Link>
                </li>
                {/*Botones de Opiniones*/}
                <li>
                    <Link to="#"><i className='fa fa-users'/>Reviews</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Sidebar