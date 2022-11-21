const express = require ("express");
const app = express();
const errorMiddleware = require ("./middleware/errors")
const cookieParser = require ("cookie-parser")

//Uso de constantes importadas
app.use(express.json());
app.use(cookieParser());


//Importar rutas
const productos = require("./routes/products")
const usuarios = require("./routes/auths")
const ordenes = require("./routes/orders")

//(ruta del navegador)
app.use('/api',productos)
app.use('/api',usuarios)
app.use('/api',ordenes)


//Middlewares para manejar errores
app.use(errorMiddleware)

module.exports = app
