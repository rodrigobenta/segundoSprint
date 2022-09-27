const {check} = require('express-validator');
const handleErrors = require('./handleErrors');
const { verifyCategoryName } = require('../../helpers/verifyCategory');
const db = require('../../database/models')

const verifyCreateCategory = [
    check('title', 'Ingrese un titulo').not().isEmpty(),
    check('title').custom(verifyCategoryName),
    (req,res,next) => {
        handleErrors(req,res,next);
    }
]

const existListCategory = async ( req,res,next) => {
    try {
        const id = req.params.id;
        if (id){
            const category = await db.Category.findByPk(id);
            if (category) {
                req.category = category;
                next();
            } else res.status(404).json({ msg: 'No existe la categoria.' });
        } else{
            const categorys = await db.Category.findAll({order: ['id_category']});
            if (categorys[0] != null) {
                req.category = categorys;
                next();
            } else res.status(404).json({ msg: 'No existe esa categoria.' });
        }
    }catch(error){
        res.status(500).json({ msg: 'Server error.' })
    }
}

const existEditCategory = async (req,res,next) => {
    try{
        const body  = req.body;
        const id  = Number(req.params.id);
        const category = await db.Category.findByPk(id);
        if (category) {
            req.id = id;
            req.body = body;
            next();
        }
        else res.status(404).json({ msg: 'No existe la cateogira.' })
    }catch(error){
        res.status(500).json({ msg: 'Server error.' })
    }
}

const existDeleteCategory = async (req,res,next) => {
    try {
        let ucategoryDeleted;
        let productCategory;
        const id = Number(req.params.id);
        productCategory = await  db.Product.findOne({ 
            where:{ fk_id_category: id}
        })
        if(!productCategory){
            if(ucategoryDeleted = await db.Category.findByPk(id,{raw: true})){
                const {id_category, ...categoryShow} = ucategoryDeleted;
                req.categoryShow = categoryShow;
                req.id = id;
                next();
            }else return res.status(404).json({ msg: 'La categoria no existe.'});
        }else res.status(404).json({ msg: 'La categoria tiene asociada un producto no se puede borrar.'});
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

module.exports = { 
    verifyCreateCategory,
    existListCategory,
    existEditCategory,
    existDeleteCategory
};
