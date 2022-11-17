/* 
    Rutas de jobs / jobs
    host + /api/jobs
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { isDate } = require('../helpers/isDate');
const { fieldsValidators } = require('../middlewares/fields-validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const { 
    getAllJobs,
    getJobById,
    getJobsByUser,
    createJob,
    deleteJob,
    editJob,
} = require('../controllers/jobs');

router.use( validateJWT );

// Obtener todos los jobs
router.get('/', getAllJobs );

// Obtener un job by id GET
router.get('/:id', getJobById);

// Obtener todos los jobs by user
router.get('/user/:id', getJobsByUser);

// Agregar un Job POST
router.post(
    '/',
    [
        check('name', 'El nombre es opbligatorio').not().isEmpty(),
        check('offerStartDate', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('offerEndDate', 'La fecha de fin es obligatoria').custom( isDate ),
        check('active', 'active es obligatorio').not().isEmpty(),
        check('company', 'La company es obligatorio').not().isEmpty(),
        check('tools', 'Las tools debe ser un array').isArray(),
        check('disciplines', 'Las disciplines debe ser un array').isArray(),
        fieldsValidators,
    ],
    createJob
);

// Editar un job by id PUT
router.put('/:id', editJob );

// Eliminar un job by id DELETE
router.delete('/:id', deleteJob );


module.exports = router;
