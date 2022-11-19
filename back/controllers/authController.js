const User = require ("../models/auth")
const ErrorHandler = require ("../utils/errorHandler")
const catchAsyncErrors = require ("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");

//Registrar un nuevo usuario /api/usuario/registro
exports.registroUsuario = catchAsyncErrors( async (req, res, next) =>{
    const{nombre, email, password} = req.body;

    const user = await User.create({
        nombre,
        email,
        password,
        avatar:{
            public_id: "qTO8srKnYIEpIiINyooVR4CIgZUREBERAREQERED",
            url: "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
        }
    })

    tokenEnviado(user, 201, res)
})


//Iniciar Sesion - Login
exports.loginUser = catchAsyncErrors(async(req, res, next) =>{
    const{email, password} = req.body

    //revisar si los campos estan completos
    if(!email || !password){
        return next(new ErrorHandler("Por favor ingrese email & Contraseña",400))
    }

    //Buscar al usuario en nuestra base de datos
    const user = await User.findOne({email}).select("+password")
    if (!user){
        return next(new ErrorHandler("Email o Contraseña invalidos"),401)
    }

    //Comparar contraseñas, verificar si esta bien
    const contrasenaOK = await user.compararPass(password);

    if(!contrasenaOK){
        return next(new ErrorHandler("Contraseña invalida"),401)
    }

    tokenEnviado(user, 200, res)
})