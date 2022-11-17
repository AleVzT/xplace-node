const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next ) => {

    // x-token headers
    const token  = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición"
        });
    }

    try {

        const { uid, name, type } =jwt.verify(
            token,
            process.env.SECRECT_JWT_SEED
        );

        req.uid = uid;
        req.name = name;
        req.type = type;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no válido"
        });
    }

    next();
}

module.exports = { validateJWT }
