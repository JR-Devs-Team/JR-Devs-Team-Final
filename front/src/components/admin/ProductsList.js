import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
//import { Link } from 'react-router-dom';
import { useAlert } from "react-alert";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";

const ProductsList = () => {
    const { loading, productos, error } = useSelector(state => state.products)
    const alert = useAlert();

    const dispatch = useDispatch();
    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        dispatch(getProducts());
    }, [dispatch, alert, error])

    const setProducts = () => {
        const data = {
            columns:[
                {
                    label:"Nombre",
                    field:"nombre",
                    sort:"asc"
                },
                {
                    label:"Precio",
                    field:"precio",
                    sort:"asc"
                },
                {
                    label:"Inventario",
                    field:"inventario",
                    sort:"asc"
                },
                {
                    label: 'Vendedor',
                    field: 'vendedor',
                    sort: 'asc'
                },
                {
                    label: 'Acciones',
                    field: 'acciones',
                },
            ],
            rows:[]
        }

        productos.forEach(product => {
            data.rows.push({
                nombre: product.nombre,
                precio: `$${product.precio}`,
                inventario: product.inventario,
                vendedor: product.vendedor,
                acciones: 
               <Fragment>
{/*                    <Link to={`/producto/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link><Link to={`/updateProduct/${product._id}`} className="btn btn-warning py-1 px-2">
                    <i class="fa fa-pencil"></i>
                   </Link>

                     <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
            </button>*/}
                </Fragment>
            })
        })
        return data;
    } 

    return (
    <Fragment>
        <MetaData title={"Todos los Productos"}></MetaData>
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>

            <div className="col-12 col-md-10">
                <Fragment>
                    <h1 className="my-5">Todos los Productos</h1>
                    {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>: (
                        <MDBDataTable
                        data={setProducts()}
                        className="px-3"
                        bordered
                        striped
                        hover>
                        </MDBDataTable>
                    )}
                </Fragment>
            </div>
        </div>
    </Fragment>
  )
}

export default ProductsList