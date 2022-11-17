/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldsValidators } = require('../middlewares/fields-validators');
const { createUser, loginUser, revalidarToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post(
    '/register',
    [ 
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        fieldsValidators
    ],
    createUser
);

router.post(
    '/',
    [ 
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        fieldsValidators
    ],
    loginUser
);

router.get('/renew', validateJWT, revalidarToken );


module.exports = router;
