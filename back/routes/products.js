const express = require("express")
const router = express.Router();

///Traemos la respuesta json desde el controlador
const {getProducts, newProduct, getProductById, updateProduct, deleteProduct} = require("../controllers/productsController")

router.route('/productos').get(getProducts); //Ruta para ver todos los productos
router.route('/productos/nuevo').post(newProduct); //Ruta para la creacion del producto
router.route('/producto/:id').get(getProductById); //Ruta para ver el Producto por Id
router.route('/producto/:id').put(updateProduct); //Ruta para actualizacion del producto por Id
router.route('/producto/:id').delete(deleteProduct); //Ruta para la eliminacion del producto por Id

module.exports=router;