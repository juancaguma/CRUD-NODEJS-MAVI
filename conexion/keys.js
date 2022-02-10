//Parametros de conexion a la base de datos
module.exports={
    database:{
        host: process.env.HOST,
        user:process.env.USUARIO,
        password: process.env.PASS,
        database: process.env.DATABASE,
        insecureAuth: true
    }
};