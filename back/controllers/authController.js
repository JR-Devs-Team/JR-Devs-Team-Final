const User = require ("../models/auth")
const ErrorHandler = require ("../utils/errorHandler")
const catchAsyncErrors = require ("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require ("crypto");
const cloudinary = require ("cloudinary")
const { trusted } = require("mongoose");

//Registrar un nuevo usuario /api/usuario/registro
exports.registroUsuario = catchAsyncErrors( async (req, res, next) =>{
    const{nombre, email, password} = req.body;

    const result= await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder:"avatars",
        width:240,
        crop:"scale"
    })

    const user = await User.create({
        nombre,
        email,
        password,
        avatar:{
            public_id: result.public_id,
            url: result.secure_url
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

//Cerrar Sesion
exports.logOut = catchAsyncErrors(async(req, res, next) =>{
    res.cookie("token",null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        sucess: true,
        message: "Cerro Sesion"
    })
})

//Olvide mi contraseña, recupear contraseña
exports.forgotPassword = catchAsyncErrors( async(req, res, next) =>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler("Usuario no se encuentra registrado", 404))
    }

    const resetToken = user.genResetPasswordToken();

    await user.save({validateBeforeSave: false})

    //crear una Url para hacer el reset de la contraseña
    const resetUrl = `${req.protocol}://${req.get("host")}/resetPassword/${resetToken}`;
    const mensaje = `Hola!\n\n 
    Tu Link para ajustar una nueva constraseña es el siguiente: \n\n
    ${resetUrl}\n\n
    Si no solicitaste este, por favor comunicate con Soporte.\n\n
    Att:\n
    JR-Devs-Teams`

    try {
        await sendEmail({
            email: user.email,
            subject: "JR-Dev-Team Recuperacion e la contraseña",
            mensaje
        })
        res.status(200).json({
            success: true,
            message: `correo enviado a ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))
    }
})

//resetear la contraseña
exports.resetPassword = catchAsyncErrors(async(req, res, next) =>{
    //Hash el token que llego con la URl
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex')
    //Buscamos al usuario al que le vamos a resetear la contraseña
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire :{$gt: Date.now()}
    })
    //El usuario si esta en la base de datos
    if(!user){
        return next(new ErrorHandler("El Token es invalido o ya expiro",400))
    }
    //Diligenciamos bien los campos
    if(req.body.password!==req.body.confim.Password){
        return next(new ErrorHandler("Contraseñas no conciden",400))
    }
    //Setear la nueva contraseña
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    tokenEnviado(user,200,res)
})

//Ver perfil de usuario
exports.getUserProfile = catchAsyncErrors (async(req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

//Update Contraseña
exports.updatePassword = catchAsyncErrors( async(req, res, next) =>{
    const user = await User.findById(req.user.id).select("+password");

    //Revisamos si la Contraseña vieja es igual que la nueva
    const passIguales = await user.compararPass(req.body.oldPassword)

    if(!passIguales){
        return next(new ErrorHandler("La Contraseña anterior no es correcta",401))
    }

    user.password = req.body.newPassword;
    await user.save();

    tokenEnviado(user,200, res)
})

//Update perfil de usuario
exports.updateProfile = catchAsyncErrors (async(req, res, next) => {
    const nuevaData = {
        nombre: req.body.nombre,
        email: req.body.email
        // campo: req.body.campo (direccion,telefono) /* Depende de los campos que necesitemos*/
    }

    //update Avatar: 
    if (req.body.avatar !==""){
        const user= await User.findById(req.user.id)
        const image_id= user.avatar.public_id;
        const res= await cloudinary.v2.uploader.destroy(image_id);

        const result= await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 240,
            crop: "scale"
        })

        newUserData.avatar={
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, nuevaData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

//Servicios controladores sobre usuarios por parte de los Administradores

//Ver todos los Usuarios
exports.getAllUsers = catchAsyncErrors(async(req,res, next) => {
    const users = await User.find

    res.status(200).json({
        success: true,
        users
    })
})

// Ver el detalle del Usuario
exports.getUserDetails = catchAsyncErrors(async(req,res, next) => {
    const user = await User.findById(req.params.id);
    
    if(!user){
        return next(new ErrorHandler(`No se Ha encontrado ningun Usuario con el id:${req.params.id}`,401))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//Actualizar perfil de usuario 
exports.updateUser = catchAsyncErrors(async(req,res, next) => {
    const nuevaData = {
        nombre: req.body.nombre,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, nuevaData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

//Eliminar un Usuario
exports.deleteUser = catchAsyncErrors(async(req,res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(` Usuario con el id:${req.params.id} no se encuentra en la base de datos`,401))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "Usuario Eliminado Correctamente"
    })
})


//Inactivar Usuario
exports.inactiveUser = catchAsyncErrors(async(req,res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(` Usuario con el id:${req.params.id} no se encuentra en la base de datos`,401))
    }

    user.estado = "Inactivo";

    res.status(200).json({
        success: true,
        message: "Usuario dado de baja Correctamente"
    })
})