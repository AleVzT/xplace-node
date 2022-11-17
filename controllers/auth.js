const { response } = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        let usuario = await Users.findOne({ email });
        
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo!'
            });
        }

        usuario = new Users( req.body );

        // Encriptando password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar JWT
        const token = await generateJWT( usuario.id, usuario.name, usuario.type );
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            type: usuario.type,
            token
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con administrador'
        });
    }
}

const loginUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Users.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El email y/o password no son correctos!'
            });
        }
        
        const passwordValid = bcrypt.compareSync(password, usuario.password );
        if ( !passwordValid ) {
            return res.status(400).json({
                ok: false,
                msg: 'El email y/o password no son correctos!'
            });
        }

        // Generar JWT
        const token = await generateJWT( usuario.id, usuario.name, usuario.type );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            type: usuario.type,
            token
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con administrador'
        });
    }
}

const revalidarToken = async (req, res = response ) => {
    const { uid, name, type } = req;

    const token = await generateJWT( uid, name, type );
    res.json({
        ok: true,
        uid, name, type,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidarToken
}
