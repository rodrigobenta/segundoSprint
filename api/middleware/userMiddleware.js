const fs = require('fs');

const createUserVerify = (req,res,next) =>{
    let data = fs.readFileSync(process.env.RUTA_DB_USER, 'utf-8');
    let dataParsed = JSON.parse(data);
    let { email, username, password, firstname, lastname, profilepic, role} = req.body;
    let proveUsername, proveEmail;
    if(proveUsername = dataParsed.find( dataParsed => dataParsed.username === username)) return res.status(400).json({msg: 'Username ya utilizado'});
    if(proveEmail = dataParsed.find(dataParsed => dataParsed.email === email)) return res.status(400).json({Mensaje: 'Email ya utilizado'});
    if((!email)|| (!username) || (!password) || (!firstname) || (!lastname))
        return res.status(400).json({Mensaje: 'Para crear un usuario debe contener todos los elementos'});
    if(!role)
        req.body.role = 'guest';
    if(profilepic)
        profilepic = req.profilepic;
    next();
};

const verifyRoleList = (req , res, next) => {
    let idDb = Number(req.id);
    let id = Number(req.params.id);
    let role = req.role;
    role = role.toLowerCase();
    if (role === 'guest' && (id !== idDb)) return res.status(401).json({ Mensaje: 'No tienes permisos.' });
    next();
}

const verifyRoleEdit = (req , res, next) => {
    let idDb = Number(req.id);
    let id = Number(req.params.id);
    let role = req.role.toLowerCase();
    if( (role === 'admin' && (id !== idDb))  || (role === 'guest' && (id !== idDb))) return res.status(401).json({ Mensaje: 'No tienes permisos' });
    next();
}


module.exports = {
    createUserVerify,
    verifyRoleList,
    verifyRoleEdit
};