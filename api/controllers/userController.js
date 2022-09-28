const db = require('../../database/models')
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
            } 
            else res.status(400).json({ error : "No existe usuario o contraseña" });
        }
        else res.status(404).json({ error : "No existe usuario o contraseña" });
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

const listUsers = async (req,res) => {
    try {
        const users = await db.User.findAll({
            attributes: {exclude: 'password'},
            include: {association: 'carts',attributes: ['title'], as: 'Cart',
            through: {attributes:['quantity']}}
            });
        if(users[0]!= null) res.status(200).json({ Usuarios: users});
        else res.status(404).json({msg: 'No existen usuarios en la BD'})
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

const listUserById = async (req,res) => {
    try {
        if(req.user) res.status(200).json({ Usuario: req.user});
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

const createUser = async (req,res) => {
    try {
        let {password, ...body} = req.body;
        const salt = await bcrypt.genSalt(10); 
        password = await bcrypt.hash(password, salt); 
        body['password'] = password;
        let create = await db.User.create(body);
        create['password'] = '*****************';
        res.status(200).json({usuario: create});
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

const editUserById = async (req,res) => {
    try {
        let {password, ...body} = req.body;
        if(password){
            const salt = await bcrypt.genSalt(10); 
            password = await bcrypt.hash(password, salt); 
            body['password'] = password; 
        }
        await db.User.update(body,{ where: { id_user: Number(req.params.id) }});
        const userEdit = await db.User.findByPk(Number(req.params.id));
        userEdit['password'] = '******************';
        res.status(200).json(userEdit); 
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

const deleteUserById = async (req,res) => {
    try {
            if(req.user){
            const {password, ...userShow} = req.user;
            await db.User.destroy({
                where:{id_user: req.params.id}
            })
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