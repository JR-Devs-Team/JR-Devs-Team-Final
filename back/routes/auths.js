const express = require("express")
const router = express.Router();

///Traemos la respuesta json desde el controlador
const 
{
    registroUsuario, 
    loginUser,
    logOut,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    getAllUsers,
    getUserDetails,
    updateUser,
    deleteUser
} = require("../controllers/authController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

router.route('/usuario/registro').post(registroUsuario); //Ruta para la creacion del Usuario
router.route('/login').post(loginUser); //Ruta para iniciar sesion del Usuario
router.route('/logout').get(isAuthenticateUser, logOut); //Ruta para cerrar sesion del Usuario
router.route('/forgotPassword').post(forgotPassword); //Ruta para recuperar contraseña
router.route('/resetPassword/:token').post(resetPassword); //Ruta para resetear la contraseña
router.route('/perfil').get(isAuthenticateUser, getUserProfile); //Ruta para visualizar el perfil
router.route('/perfil/updatePassword').put(isAuthenticateUser, updatePassword); //Ruta para actualizar password
router.route('/perfil/updateProfile').put(isAuthenticateUser, updateProfile); //Ruta para actualizar perfil

//Rutas para Admin
router.route('/admin/allUsers').get(isAuthenticateUser, authorizeRoles("admin"), getAllUsers); //Ruta para ver todos los usuarios
router.route('/admin/user/:id').get(isAuthenticateUser, authorizeRoles("admin"), getUserDetails); //Ruta para ver todos los usuarios
router.route('/admin/updateUser/:id').put(isAuthenticateUser, authorizeRoles("admin"), updateUser); //Ruta para actualizar los datos del usuarios
router.route('/admin/deleteUser/:id').delete(isAuthenticateUser, authorizeRoles("admin"), deleteUser); //Ruta para eliminar los usuarios

module.exports = router;