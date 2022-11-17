const { response } = require('express');
const Jobs = require('../models/Jobs');

const getAllJobs = async(req, res = response) => {

    try {
        const query = {
            active: true
        };
        const jobs = await Jobs.find(query);

        return res.json({
            ok: true,
            jobs: jobs
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con administrador'
        });
    }
}


const getJobById = async(req, res = response) => {

    const jobId = req.params.id;

    try {
        const job = await Jobs.findById(jobId);

        if ( !job ) {
            return res.status(404).json({
                ok: false,
                msg: 'Job no existe por ese Id'
            });
        }

        return res.json({
            ok: true,
            job: job
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con administrador'
        });
    }
}

const getJobsByUser = async(req, res = response) => {

    const userId = req.params.id;
    const query = {
        createUser: userId
    };

    try {
        const jobs = await Jobs.find(query);

        return res.json({
            ok: true,
            jobs: jobs
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con administrador'
        });
    }
}

const createJob = async(req, res = response) => {
    
    const job = new Jobs( req.body );

    try {

        job.createUser = req.uid;
        
        const jobSave =  await job.save();

        return res.status(201).json({
            ok: true,
            job: jobSave
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con administrador'
        });
    }
}

const editJob = async(req, res = response) => {

    const jobId = req.params.id;
    const uid = req.uid;

    try {
        
        const job = await Jobs.findById(jobId);

        if ( !job ) {
            return res.status(404).json({
                ok: false,
                msg: 'Job no existe por ese Id'
            });
        }

        const nuevoJob = {
            ...req.body,
            user: uid
        }

        const updateJob = await Jobs.findByIdAndUpdate( jobId, nuevoJob, { new: true } );
        res.json({
            ok: true,
            job: updateJob
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con administrador'
        });
    }
}


const deleteJob = async(req, res = response) => {
    const jobId = req.params.id;
    const uid = req.uid;

    try {
        
        const job = await Jobs.findById(jobId);

        if ( !job ) {
            return res.status(404).json({
                ok: false,
                msg: 'Job no existe por ese Id'
            });
        }

        if ( job.createUser.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No se puede eliminar este Job'
            });
        }

        await Jobs.findByIdAndDelete(jobId);
        res.json({
            ok: true,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con administrador'
        });
    }
}

module.exports = {
    getAllJobs,
    getJobById,
    getJobsByUser,
    createJob,
    deleteJob,
    editJob,
}