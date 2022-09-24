const db = require("../../database/models");
const {check} = require('express-validator');
const handleErrors = require('./handleErrors');
const {verifyUrl} = require("../../helpers/verifyPicture")


const createPictureVerify = [
    check("url", "Ingrese una url").not().isEmpty(),
    check("fk_id_product", "Ingrese un id de producto").not().isEmpty(),
    check("url").custom(verifyUrl),
    (req,res,next) => {
        handleErrors(req,res,next);
    }
]

const editPictureVerify = [
    check("url").isEmpty().optional({nullable: true}),
    check("url").custom(verifyUrl).optional({nullable: true}),
    (req,res,next) => {
        handleErrors(req,res,next);
    }
]

const existPictureVerify = async(req,res,next) => {
    try{        
        const picture = await db.Picture.findByPk(req.params.id);
        if (picture){
            req.picture = picture;
            next();
        }
        else res.status(404).json({msg: "la foto no existe"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg: "Server error"});
    }
}

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
    createPictureVerify,
    editPictureVerify,
    existPictureVerify,
    verifyRoleEditPicture
};