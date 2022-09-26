const fs = require('fs');
const { check } = require('express-validator');
const handleErrors = require('./handleErrors.js');
const {verifyEmail, verifyUsername} = require('../../helpers/verifyUser');
const db = require('../../database/models')
const e = require('express');
    
    const createUserVerify = [
        check('email', 'Ingrese un email valido').isEmail(),
        check('username', 'El nombre de usuario es requerido').not().isEmpty(),
        check('password', 'La contraseña es requerida y debe tener 6 caracteres').isLength({ min: 6 }),
        check('firstname', 'El nombre es requerido').not().isEmpty(),
        check('lastname', 'El apellido es requerido').not().isEmpty(),
        check('email').custom(verifyEmail),
        check('username').custom(verifyUsername),
        (req,res,next) => {
            handleErrors(req,res,next);
        }
    ]

    const editUserVerify = [
        check('email').isEmail().optional({nullable: true}),
        check('username').isEmpty().optional({nullable: true}),
        check('email').custom(verifyEmail).optional({nullable: true}),
        check('username').custom(verifyUsername).optional({nullable: true}),
        (req,res,next) => {
            handleErrors(req,res,next);
        }
    ]

    const userExists = async (req,res,next) => {
        try {
            const userExist = await db.User.findByPk(Number(req.params.id),{
                attributes: {
                exclude: 'password'
                }
            },
            {raw: true});
            if(userExist) {
                req.user = userExist;
                next();
            }
            else res.status(400).json({msg: 'El usuario no existe'});
        } catch (error) {
            res.status(500).json({msg: 'Server error'});
        }
    }

const verifyRoleList = (req , res, next) => {
    let idDb = Number(req.id); //el id proviene de la verificacion del token. previamente asignado al request o req.
    let id = Number(req.params.id);
    let role = req.role.toLowerCase();
    if (role === 'guest' && (id !== idDb)) return res.status(401).json({ Mensaje: 'No tienes permisos.' });
    next();
}

const verifyRoleEdit = (req , res, next) => {
    let idDb = Number(req.id); //el id proviene de la verificacion del token. previamente asignado al request o req.
    let id = Number(req.params.id);
    let role = req.role.toLowerCase();
    if((role === 'admin' && (id !== idDb))  || (role === 'guest' && (id !== idDb))) return res.status(401).json({ Mensaje: 'No tienes permisos' });
    next();
}


module.exports = {
    createUserVerify,
    editUserVerify,
    userExists,
    verifyRoleList,
    verifyRoleEdit
};