const db = require("../../database/models");


const verifyCreateEditPictures = (req,res,next) => {
    try {
        let arr = Object.keys(req.body);
        if (arr.length > 3) res.status(400).json({msg: "Campos incorrectos"});
        next();
    } catch (error) {
        res.status(500).json({msg: 'Server Error'})
    }
};

const verifyRoleEditPicture = (req,res,next) => {
    try {
        let role = req.role;
        if(role == 'guest') res.status(401).json({msg: 'No tiene permisos sobre las fotos'});
        else next();
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}

module.exports = {
    verifyCreateEditPictures,
    verifyRoleEditPicture
};