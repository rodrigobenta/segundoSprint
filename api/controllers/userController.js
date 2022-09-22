const fs = require('fs');
const jwt = require('../../helpers/generateJWT')

const login = async (req,res) => {
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

const listUsers = (req,res) => {
    try {
    
        // let usersSinPass = users.map(el => {
        //     el.password = "**********";
        //     return el;
        // })
        // res.status(200).json({
        //     listaUsers: usersSinPass
        // });
    } catch (error) {
       //res.status(500).json({ Mensaje: 'Server error.' });
    }
}

const listUserById = (req,res) => {
    try {
        
        // if(user = users.find(el => el.id === Number(req.params.id))){
        //     user.password = "*********"
        //     return res.status(200).json({
        //         User: user
        //     });
        // }
        //return res.status(404).json({ Mensaje:'user not found'});
    } catch (error) {
        //res.status(500).json({ Mensaje: 'Server error.' });
    }
}

const createUser = (req,res) => {
    
    // let dataParsed = JSON.parse(data);
    // const {email, username, password, firstname, lastname, role} = req.body;
    
    // const cart = [];
    // const newUser = {id, email, username, password, firstname, lastname, role, cart};
    // if(req.profilepic){
    //     let profilepic = req.body.profilepic;
    //     newUser = {id, email, username, password, firstname, lastname, profilepic, role, cart};
    // }
    // try {
    //     let dbUser = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
    //     let users = JSON.parse(dbUser);
    //     users.push(newUser);
        
    //     res.status(201).json(newUser);
    // } catch (error) {
    //     res.status(500).json({ Mensaje: 'Server error.' });
    // }
}

const editUserById = (req,res) => {
    // try{
    //     let {...propiedades} = req.body;
    //     let id = Number(req.params.id);
    //     let newEl;
    //     let dbUser = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
    //     let users = JSON.parse(dbUser);
    //     let userEdited = users.find(el => el.id === id);
    //     if(userEdited) {
    //         const usersUpdate = users.map(elem => {
    //                 if (Number(elem.id) == id){
    //                     newEl = {...elem, ...propiedades};
    //                     return newEl;
    //                 }
    //                 else return elem;
    //                 })
    //         fs.writeFileSync(process.env.RUTA_DB_USER, JSON.stringify(usersUpdate));
    //         res.status(200).json({
    //             Mensaje: "propiedades editadas",
    //             data: {...propiedades}
    //         });
    //     }else{
    //         return res.status(404).json({ Mensaje: 'El usuario no existe.'})
    //     }
    // } catch(error){
    //     res.status(500).json({ Mensaje: 'Server error.' });
    // }
}

const deleteUserById = (req,res) => {
    // let id = Number(req.params.id);
    // try {
    //     let dbUser = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
    //     let users = JSON.parse(dbUser);
    //     let userDeleted = users.filter(el => el.id === Number(id));
    //     if (userDeleted.length > 0){
    //         let newUsers = users.filter(el => el.id !== Number(id));
    //         fs.writeFileSync(process.env.RUTA_DB_USER, JSON.stringify(newUsers));
    //         res.status(200).json({userDeleted})
    //     }
    //     else return res.status(404).json({ Mensaje: 'El usuario no existe.'})
    // } catch (error) {
    //     res.status(500).json({ Mensaje: 'Server error.' });
    // }
}

module.exports = {
    login,
    listUsers,
    listUserById,
    createUser,
    editUserById,
    deleteUserById
};