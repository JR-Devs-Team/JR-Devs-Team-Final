const User = require ("../models/auth")
const jwt = require ("jsonwebtoken")
const ErrorHandler = require ( "../utils/errorHandler")
const catchAsyncErrors = require ("../middleware/catchAsyncErrors")

//Verificamos si estamos autenticados, Existencia y veracidad del Token
exports.isAuthenticateUser = catchAsyncErrors (async (req, res, next) => {
    const {token} = req.cookies

    if(!token){
        return next (ErrorHandler("Debe iniciar sesion para acceder a este recurso", 401))
    }

    const decodificada = jwt.decode(token, process.env.JWT_SECRET)
    req.user = await User.findById(decodificada.id);

    next()
})

//Capturamos role
exporte.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next (new ErrorHandler(`Role (${req.user.role}) No esta Autorizado a entrar a esta Area`, 403))
        }
        next()
    }
}