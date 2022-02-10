const mysql2 = require('mysql2');
const{database}  = require('./keys');

const pool= mysql2.createPool(database);

pool.getConnection((err,connection)=>{
    if (err) {
        console.error('ERROR');
        console.error(err.code);
        console.log(err);
    }else{
        connection.release();
        console.log('Conexion exitosa a la BD-mysql');
        return;
    }
});

module.exports={
    pool
}
