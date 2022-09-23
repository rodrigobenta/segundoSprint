const express = require('express');
const { sequelize } = require('../../database/models')
const app = express();
const db = require('../../database/models')
const jwt = require('../../helpers/generateJWT')

const login = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
    // try {
    //     let data = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
    //     data = JSON.parse(data);
    //     let userLogin = data.find(data => data.username == req.body.username && data.password == req.body.password);
    //     if(!userLogin) res.status(500).json({
    //         msg: "No existe usuario o contraseña"
    //     })
    //     else {
    //         const token = await jwt(userLogin);
    //         userLogin.password = '';
    //         res.status(200).json({
    //             success: true,
    //             message: 'Authorized',
    //             user: {
    //                 iduser: userLogin.id,
    //                 username: userLogin.username,
    //                 },
    //             token
    //         })
    //     }
    // } catch (error) {
    //     res.status(500).json({
    //         msg: "Error interno"
    //     })
    // }
}

const listUsers = async (req,res) => {
    try {
        const users = await db.User.findAll(
                    {
                        attributes: {
                        exclude: 'password'
                        }
                    });
        if(users[0]!= null) res.status(200).json({ Usuarios: users});
        else res.status(404).json({msg: 'No existen usuarios en la BD'})
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

const listUserById = async (req,res) => {
    try {
        const user = await db.User.findByPk(req.params.id,
                    {
                        attributes: {
                        exclude: 'password'
                        }
                    });
        if(user) res.status(200).json({ Usuario: user});
        else res.status(404).json({msg: 'No existe dicho usuario en la BD'})
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
        const body = req.body;
        const create = await db.User.create(body)
        res.status(200).json({usuario: create});
    } catch (error) {
        const errObj = {};
            error.errors.map( er => {
            errObj[er.path] = er.message;
            })
        if(errObj) res.status(500).json(errObj);
        else res.status(500).json({ msg: 'Server error.' });
    }
}

const editUserById = async (req,res) => {
    try {
        const body = req.body;
        const userEdit = await db.User.findByPk(Number(req.params.id));
        await db.User.update(body,{ where: { id_user: Number(req.params.id) }});
        if(userEdit) res.status(200).json(userEdit);
        else res.status(404).json({ msg: 'El usuario no existe.'});
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
        const userDeleted = await db.User.findByPk(Number(req.params.id));
        await db.User.destroy({where:{
                    id_user: req.params.id
                }})
        if(userDeleted) res.status(200).json({userDeleted});
        else return res.status(404).json({ msg: 'El usuario no existe.'});
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