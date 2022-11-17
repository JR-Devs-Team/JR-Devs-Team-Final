const express = require("express")
const router = express.Router();

///Traemos la respuesta json desde el controlador
const {registroUsuario} = require("../controllers/authController")

//router.route('/productos').get(getProducts); //Ruta para ver todos los productos
router.route('/usuario/registro').post(registroUsuario); //Ruta para la creacion del Usuario
//router.route('/producto/:id').get(getProductById); //Ruta para ver el Producto por Id
//router.route('/producto/:id').put(updateProduct); //Ruta para actualizacion del producto por Id
//router.route('/producto/:id').delete(deleteProduct); //Ruta para la eliminacion del producto por Id

module.exports=router;