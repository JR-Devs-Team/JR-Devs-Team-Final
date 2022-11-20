const express = require("express")
const router = express.Router();

///Traemos la respuesta json desde el controlador
const {registroUsuario, loginUser, logOut, forgotPassword, resetPassword} = require("../controllers/authController");
const { isAuthenticateUser } = require("../middleware/auth");

router.route('/login').get(loginUser); //Ruta para iniciar sesion del Usuario
router.route('/logout').get(isAuthenticateUser, logOut); //Ruta para cerrar sesion del Usuario
router.route('/usuario/registro').post(registroUsuario); //Ruta para la creacion del Usuario
router.route('/forgotPassword').post(forgotPassword); //Ruta para recuperar contraseña
router.route('/resetPassword/:token').post(resetPassword); //Ruta para resetear la contraseña
//router.route('/producto/:id').delete(deleteProduct); //Ruta para la eliminacion del producto por Id

module.exports=router;