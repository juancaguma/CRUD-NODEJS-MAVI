const jwt= require('jsonwebtoken');


const generarJWT = (id_usuario)=>{
    return new Promise((resolve,reject)=>{
        const payload={id_usuario};
        jwt.sign(payload,process.env.JWT_KEY,{
            expiresIn:'24h'
        },(err,token)=>{
            if (err) {
                //No se creo el token
                reject('No se pudo generar el JWT');
            }else{
                //generar el token
                resolve(token);
            }
        })
    });
}
const comprobarJWT = (token='')=>{
    try {
        const {id_usuario}= jwt.verify(token,process.env.JWT_KEY);
        return {
            'ok':true,
            'user_id':id_usuario   
        };
    } catch (error) {
       return {
        'ok':false,
        'user_id':null   
    };
    }
}

module.exports={
    generarJWT,
    comprobarJWT
}