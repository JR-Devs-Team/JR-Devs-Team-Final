//const { restart } = require("nodemon");
const producto = require("../models/productos")
const fetch =(url) => import('node-fetch').then(({default:fetch}) => fetch(url));

// ver lista de productos
exports.getProducts = async(req,res,next) => {
    const productos = await producto.find();
    if(!productos){
        return res.status(404).json({
            success:false,
            error:true
        })
    }
    res.status(200).json({
        success:true,
        cantidad: productos.length,
        productos
    })
}

// ver un producto por id
exports.getProductById = async(req,res,next) => {
    const productId = await producto.findById(req.params.id)
    if (!productId){
        return res.status(404).json({
            success:false,
            message: "No se encontro el producto",
            error:true
        })
    }
    res.status(200).json({
        success:true,
        message: "Aqui se muestra la informacion del producto",
        productId
    })
}

//Update un producto
exports.updateProduct = async (req,res,next) => {
    //Variable de tipo modificable
    let productId = await producto.findById(req.params.id)
    //Verifico que el objeto no existe para finalizar el proceso
    if (!productId){
        return res.status(404).json({
            success:false,
            message: "No se encontro el producto"
        })
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
}

// crear nuevo producto /api/productos
exports.newProduct= async(req,res,next) => {
    const product = await producto.create(req.body);
    res.status(200).json({
        success:true,
        product
    })
}

// Eliminar un producto
exports.deleteProduct = async (req,res,next) => {
    //Variable de tipo modificable
    const productId = await producto.findById(req.params.id)
    //Verifico que el objeto no existe para finalizar el proceso
    if (!productId){
        return res.status(404).json({
            success:false,
            message: "No se encontro el producto"
        })
    }
    // Eliminamos el producto
    await productId.remove();
    res.status(200).json({
        success:true,
        message: "Producto eliminado Correctamente",
    })
}


//FETCH
//Ver todos los productos function verProductos()
function verProductos(){
    fetch('http://localhost:4000/api/productos')
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

//verProductos();

//ver por Id
function verProductosPorId(id){
    fetch('http://localhost:4000/api/producto/'+id)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

//verProductosPorId('63573dc49a029d73214abd26');