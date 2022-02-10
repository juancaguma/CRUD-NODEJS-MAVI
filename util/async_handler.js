//Funcion para evitar colocar try-catch en todos las llamadas y continuar con la cadena de llamadas (next)
module.exports = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};