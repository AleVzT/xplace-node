const jwt = require('jsonwebtoken');

const generateJWT = (uid, name, type) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid, name, type };
        jwt.sign( payload, process.env.SECRECT_JWT_SEED, {
            expiresIn: '24h'
        }, ( err, token ) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve( token );
        });
    });
}

module.exports = {
    generateJWT
}

