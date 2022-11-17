const User = require ("../models/auth")
const ErrorHandler = require ("../utils/errorHandler")
const catchAsyncErrors = require ("../middleware/catchAsyncErrors")

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

    res.status(201).json({
        success:true,
        user
    })
})