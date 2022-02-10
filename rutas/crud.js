const express = require('express');
const router = express.Router();
const asyncFunction = require('../util/async_handler');
const {generarJWT,comprobarJWT} = require('../util/jwt');
const { pool } = require('../conexion/db_conexion');




    //Renderiza y lanza el archivo index
    router.route('/') 
    .get(asyncFunction(async (req, res, next) => {
        //Generar el JWT con algun Id de usuario, para este caso lo voy a simular, solo genere 1 para las pruebas
        //const token=  await generarJWT(260896);
        console.log(id_user);
        res.json({ "Servidor en linea": "Prueba del servicio principal "});
    }));
    
    //Insertar un cliente
    router.route('/setCliente').post(asyncFunction(async (req, res, next) => {
        const token = req.header('x-token');
        const response = await comprobarJWT(token);

        if (response.ok) {
            var [datos] = await pool.promise().query('INSERT INTO clientes SET ? ',req.body);
            res.status(200).json({
                ok: true,
                msg: 'Datos insertados correctamente',
                idUser: datos.insertId
            });
        }else{
            res.status(500).json({
                ok: false,
                msg: 'Token invalido'
            });
        }
    }));

    //Leer todos los clientes que no hayan sido borrados (Manejo borrado logico)
    router.route('/getClientes').get(asyncFunction(async (req, res, next) => {
        const token = req.header('x-token');
        const response = await comprobarJWT(token);

        if (response.ok) {
            var [datos] = await pool.promise().query('SELECT * FROM clientes WHERE borrado = 0');
            //console.log(token);
            res.status(200).json({
                ok: true,
                msg: 'Lista de clientes',
                datos: datos
            });
        }else{
            res.status(500).json({
                ok: false,
                msg: 'Token invalido'
            });
        }
        
    }));

    //Borrar un cliente
    router.route('/deleteCliente').post(asyncFunction(async (req, res, next) => {
        const token = req.header('x-token');
        const response = await comprobarJWT(token);

        if (response.ok) {
            var [datos] = await pool.promise().query('DELETE  FROM clientes WHERE id = ?',req.body.id);res.status(200).json({
                ok: true,
                msg: 'Cliente borrado con exito',
                idUser: req.body.id
            });
        }else{
            res.status(500).json({
                ok: false,
                msg: 'Token invalido'
            });
        }
    }));

    //Actualizar un cliente
    router.route('/updateCliente').post(asyncFunction(async (req, res, next) => {
        const token = req.header('x-token');
        const response = await comprobarJWT(token);

        if (response.ok) {
            var [datos] = await pool.promise().query('UPDATE  clientes set ? where id = ?',[req.body,req.body.id]);
            console.log(datos);
            res.status(200).json({
                ok: true,
                msg: 'Cliente actualizado con exito',
                idUser: req.body
            });
        }else{
            res.status(500).json({
                ok: false,
                msg: 'Token invalido'
            });
        }
    }));





  module.exports = router;