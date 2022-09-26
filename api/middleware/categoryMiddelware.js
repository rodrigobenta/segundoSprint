const fs = require('fs');

const {check} = require('express-validator');
const handleErrors = require('./handleErrors');
const { verifyCategory, verifyTitle } = require("../../helpers/verifyProduct");
const Op = db.Sequelize.Op;




const verifyCreateCategory = [
    check('title', 'Ingrese un titulo').not().isEmpty(),
    check('fk_id_category').custom(verifyCategory),
    (req,res,next) => {
        handleErrors(req,res,next);
    }
]
