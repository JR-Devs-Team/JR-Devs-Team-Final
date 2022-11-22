//const { restart } = require("nodemon");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const producto = require("../models/productos");
const ErrorHandler = require("../utils/errorHandler");
const fetch =(url) => import('node-fetch').then(({default:fetch}) => fetch(url));
const APIFeatures = require("../utils/apiFeatures");

// Ver Lista de Productos
exports.getProducts = catchAsyncErrors( async(req,res,next) => {  
    const resPerPage = 4;
    const cantidad = await producto.countDocuments();
    const apiFeatures = new APIFeatures(producto.find(), req.query)
        .search()
        .filter();

    let productos = await apiFeatures.query;
    let filteredCantidad= productos.length;
    apiFeatures.pagination(resPerPage);
    productos = await apiFeatures.query.clone();

    res.status(200).json({
        success:true,
        cantidad,
        resPerPage,
        filteredCantidad,
        productos
    })
})


// Ver un Producto por ID
exports.getProductById = catchAsyncErrors( async(req,res,next) => {
    const productId = await producto.findById(req.params.id)
    if (!productId){
        return next(new ErrorHandler("Producto no Encontrado", 404))        
    }
    res.status(200).json({
        success:true,
        message: "Aqui se muestra la informacion del producto",
        productId
    })
})

//Update un Producto
exports.updateProduct = catchAsyncErrors( async (req,res,next) => {
    //Variable de tipo modificable
    let productId = await producto.findById(req.params.id)
    //Verifico que el objeto no existe para finalizar el proceso
    if (!productId){
        return next(new ErrorHandler("Producto no Encontrado", 404)) 
    }
    //Si el objeto si existia, entonces si ejecuto la actualizacion
    productId = await producto.findByIdAndUpdate(req.params.id, req.body, {
        // valido solo los atributos nuevos o actualizados
        new:true,
        runValidators:true
    });
    //Respondo OK si el producto si se actualizo
    res.status(200).json({
        success:true,
        message: "Producto actualizado Correctamente",
        productId
    })
})

//Crear Nuevo Producto /api/productos
exports.newProduct= catchAsyncErrors ( async(req,res,next) => {
    req.body.user = req.user.id
    const product = await producto.create(req.body);
    res.status(200).json({
        success:true,
        product
    })
})

//Eliminar un Producto
exports.deleteProduct = catchAsyncErrors( async (req,res,next) => {
    //Variable de tipo modificable
    const productId = await producto.findById(req.params.id)
    //Verifico que el objeto no existe para finalizar el proceso
    if (!productId){
        return next(new ErrorHandler("Producto no Encontrado", 404)) 
    }
    //Eliminamos el producto
    await productId.remove();
    res.status(200).json({
        success:true,
        message: "Producto eliminado Correctamente",
    })
})


//FETCH
//Ver todos los productos function verProductos()
function verProductos(){
    fetch('http://localhost:4000/api/productos')
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

//verProductos();

//Ver por ID
function verProductosPorId(id){
    fetch('http://localhost:4000/api/producto/'+id)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

//VerProductosPorID('63573dc49a029d73214abd26');