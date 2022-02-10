//Crear el servidor
const express = require('express');  
//Establecer correctamente las cabeceras HTTP 
const helmet   = require('helmet');   
//Comprime la peticion
const compress = require('compression');  
//Asignar parte del body al req.body
const bodyParser = require('body-parser');  
//Acceder a las variables de entorno del archivo .env
require('dotenv').config();   

//App de Express
const app  = express();
const http = require('http').createServer(app);

// Middlewares
app.use(express.json({ limit: '30mb' }));   //Parsear json automaticamente
app.use(express.urlencoded({ limit: '30mb', extended: true }));  // Procesar forms
app.use(helmet());
app.use(compress()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Rutas http
app.use('/crud', require('./rutas/crud'));

//Servidor Node
const puerto = process.env.PORT || 3000;
http.listen(puerto, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor arriba en el puerto:', puerto);
});
