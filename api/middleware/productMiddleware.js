const db = require("../../database/models");
const {check} = require('express-validator');
const handleErrors = require('./handleErrors');
const { verifyCategory, verifyTitle } = require("../../helpers/verifyProduct");
const Op = db.Sequelize.Op;

const verifyCreate = [
    check('title', 'Ingrese un titulo').not().isEmpty(),
    check('title').custom(verifyTitle),
    check('stock', 'Ingrese un numero mayor a 0').isInt({ min: 1}),
    check('description', 'Ingrese una descripcion').not().isEmpty(),
    check('mostwanted', 'Ingrese un valor entre 1 y 0 siendo 1 True').isInt({min:0, max:1}),
    check('fk_id_category', 'Ingrese un id de categoria que exista').not().isEmpty(),
    check('fk_id_category').custom(verifyCategory),
    (req,res,next) => {
        handleErrors(req,res,next);
    }
]

const verifyEdit = [
    check('title').custom(verifyTitle),
    check('fk_id_category').custom(verifyCategory),
    (req,res,next) => {
        handleErrors(req,res,next);
    }
]

const existProductListVerify = async (req,res,next) => {
    const products = await db.Product.findAll({
        include: [
            { association: 'picture_product', attributes: { exclude: ['id_picture', 'fk_id_product'] }, require: false },
            { association: 'category_product', attributes: { exclude: ['id_category'] }, require: false }
        ], attributes: { exclude: ['fk_id_category'] }
    });
    if (products[0] != null) {
        req.products = products;
        next();
    } else {
        res.status(404).json({ msg: 'No existen productos.' });
    }
}

const existProductListByIdVerify = async (req,res,next) => {
    const product = await db.Product.findByPk(req.params.id, {
        include: [
            { association: 'picture_product', attributes: { exclude: ['id_picture', 'fk_id_product'] }, require: false },
            { association: 'category_product', attributes: { exclude: ['id_category'] }, require: false }
        ], attributes: { exclude: ['fk_id_category'] }
    });
    if (product) {
        req.product = product;
        next();
    } else {
        res.status(404).json({ msg: 'No existe el producto.' });
    }
}

const existProductListKeywordVerify = async (req,res,next) => {
    const key = req.query.q;
    const list = await db.Product.findAll( { 
        where: { [Op.or]: [{ description: { [Op.like]: `${key}` } }, { title: { [Op.like]: `${key}` } }] } ,
            include: [
            {association: 'picture_product', attributes:{exclude: ['id_picture', 'fk_id_product']}, require: false},
            {association: 'category_product',attributes:{exclude: ['id_category']}, require: false}
        ], attributes:{exclude: ['fk_id_category']}
    });
    if (list[0] != null) {
        req.list = list;
        next(); 
    } else {
        res.status(404).json({ msg: 'No hay ningun producto con esa palabra.' })
    }
}

const existProductListMostwantedVerify = async (req,res,next) => {
    const mostWanted = await db.Product.findAll({
        where: { mostwanted: 1 },
        include: [
            {association: 'picture_product', attributes:{exclude: ['id_picture', 'fk_id_product']}, require: false},
            {association: 'category_product',attributes:{exclude: ['id_category']}, require: false}
        ], attributes:{exclude: ['fk_id_category']}
    })
    if (mostWanted[0] != null) {
        req.mostwanted = mostWanted;
        next();
    } else {
        res.status(404).json({ msg: 'No hay productos requeridos.' })
    }
}

const existProductEditVerify = async (req,res,next) => {
    const { fk_id_category, ...body } = req.body;
    const { idProduct } = req.params;
    const product = await db.Product.findByPk(Number(idProduct));
    const category = await db.Category.findByPk(fk_id_category);
    if (product && category) {
        await db.Product.update({ ...body, fk_id_category }, { where: { id_product: Number(idProduct) } });
        const productEdited = await db.Product.findByPk(Number(idProduct), {
            include: [
                { association: 'picture_product', attributes: { exclude: ['id_picture', 'fk_id_product'] }, require: false },
                { association: 'category_product', attributes: { exclude: ['id_category'] }, require: false }
            ], attributes: { exclude: ['fk_id_category'] }
        });
        req.productEdited = productEdited;
        next();
    }
    else res.status(404).json({ msg: 'No existe no el producto o la cateogira.' })
}

const existProductDeleteVerify = async (req,res,next) => {
    const id = Number(req.params.id);
    const oldData = await db.Product.findByPk(id);
    const cartInProduct = await db.Cart.findOne({ where: {fk_id_product: Number(oldData.id_product) }});
    if (oldData) {
        if (!cartInProduct) {
            const pictureProductDelete = await db.Picture.findOne({ where: { fk_id_product: Number(oldData.id_product) } });
            if (!pictureProductDelete) {
                req.id = id;
                req.oldData = oldData;
                next();
            } else {
                res.status(404).json({ msg: 'Ese producto tiene una picture asociada y por ende no se puede borrar' })
            }
        } else {
            res.status(404).json({ msg: 'Ese producto tiene un carro asociado y por ende no se puede borrar' })
        }
    } else {
        res.status(404).json({ msg: 'Ese producto no existe.' })
    }
}

const verifyRoleCreateDelete = (req,res,next) => {
    try {
        let role = req.role;
        if(role === 'guest') res.status(401).json({msg: 'No tiene permisos para crear o eliminar productos'});
        else next();
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}

const verifyRoleEdit = (req,res,next) => {
    try {
        let role = req.role;
        if(role == 'guest') res.status(401).json({msg: 'No tiene permisos para editar productos'});
        else next();
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}

module.exports = {
    verifyRoleCreateDelete,
    verifyRoleEdit,
    existProductListVerify,
    existProductListByIdVerify,
    existProductListKeywordVerify,
    existProductListMostwantedVerify,
    existProductEditVerify,
    existProductDeleteVerify,
    verifyCreate,
    verifyEdit
};