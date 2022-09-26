const express = require('express');
const { sequelize } = require('../../database/models')
const app = express();
const db = require('../../database/models')
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require('../../helpers/generateJWT')

const login = async (req,res) => {
    try {
        const {username} = req.body
        const userLogged = await db.User.findOne({
            where: {
                username: username
            },
            raw: true
        })
        if(userLogged){
            const password_valid = await bcrypt.compare(req.body.password,userLogged.password);
            if(password_valid){
                const {password, ...userLogin} = userLogged;
                token = await jwt(userLogin);
                res.status(200).json({
                    success: true,
                    message: 'Authorized',
                    user: {
                        id: userLogin.id_user,
                        username: userLogin.username
                        },
                    token
                })
            } else {
                res.status(400).json({ error : "No existe usuario o contraseña" });
            }
        }else{
            res.status(404).json({ error : "No existe usuario o contraseña" });
        }
        //console.log(userLogged[0].lastname);
    } catch (error) {
        console.log(error);
    }
}

const listUsers = async (req,res) => {
    try {
        const users = await db.User.findAll(
                    {
                        attributes: {
                        exclude: 'password'
                        }
                    });
<<<<<<< HEAD
        if(users[0]!= null) res.status(200).json({ Usuarios: users});
=======

        if(users[0]!= null) res.status(200).json({ Usuarios: users});

>>>>>>> 89a0ca616f28ddf545a3211074097c5a0b74bbc9
        else res.status(404).json({msg: 'No existen usuarios en la BD'})
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

const listUserById = async (req,res) => {
    try {
<<<<<<< HEAD
        if(req.user) res.status(200).json({ Usuario: req.user});
=======

        const user = await db.User.findByPk(req.params.id,

                    {
                        attributes: {
                        exclude: 'password'
                        }
                    });
        if(user) res.status(200).json({ Usuario: user});
        else res.status(404).json({msg: 'No existe dicho usuario en la BD'})
>>>>>>> 89a0ca616f28ddf545a3211074097c5a0b74bbc9
    } catch (error) {
        const errObj = {};
            error.errors.map( er => {
            errObj[er.path] = er.message;
            })
        if(errObj) res.status(500).json(errObj);
        else res.status(500).json({ msg: 'Server error.' });
    }
}

const createUser = async (req,res) => {
    try {
        let {password, ...body} = req.body;
        const salt = await bcrypt.genSalt(10); //saltRounds
        password = await bcrypt.hash(password, salt); //hash
        body['password'] = password; //le asigno la nueva password
        let create = await db.User.create(body);
        create['password'] = null;
        res.status(200).json({usuario: create});
    } catch (error) {
        const errObj = {};
            error.errors.map( er => {
            errObj[er.path] = er.message;
            })
        if(errObj) res.status(500).json(errObj);
        else  res.status(500).json({ msg: 'Server error.' });
        console.log(error);
    }
}

const editUserById = async (req,res) => {
    try {
        if(req.user){
            let {password, ...body} = req.user;//user asignaado al request desde middleware
            if(password){
                const salt = await bcrypt.genSalt(10); //saltRounds
                password = await bcrypt.hash(password, salt); //hash
                body['password'] = password; //le asigno la nueva password
            }
            /* const userEdit =  */await db.User.update(body,{ where: { id_user: Number(req.params.id) }}/* ,{returning: true,raw: true} */);
            const userEdit = await db.User.findByPk(Number(req.params.id));
            userEdit['password'] = null;
            res.status(200).json(userEdit); 
        } 
    } catch (error) {
        const errObj = {};
            error.errors.map( er => {
            errObj[er.path] = er.message;
            })
        if(errObj) res.status(500).json(errObj);
        else res.status(500).json({ msg: 'Server error.' });
    }
}

const deleteUserById = async (req,res) => {
    try {
            if(req.user){
            const {password, ...userShow} = req.user;
            await db.User.destroy({where:{
                id_user: req.params.id
            }})
            res.status(200).json({userShow});
        }
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

module.exports = {
    login,
    listUsers,
    listUserById,
    createUser,
    editUserById,
    deleteUserById
};