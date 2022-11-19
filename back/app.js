const express = require ("express");
const app = express();
const errorMiddleware = require ("./middleware/errors")
const cookieParser = require ("cookie-parser")

//Uso de constattes importadas
app.use(express.json());
app.use(cookieParser());


//Importar rutas
const productos = require("./routes/products")
const usuarios = require("./routes/auths")

//(ruta del navegador)
app.use('/api',productos)
app.use('/api',usuarios)


//Middlewares para manejar errores
app.use(errorMiddleware)

module.exports = app
