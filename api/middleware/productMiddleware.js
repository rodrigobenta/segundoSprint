const db = require("../../database/models");
const {check} = require('express-validator');
const handleErrors = require('./handleErrors');
const { verifyCategory, verifyTitle } = require("../../helpers/verifyProduct");
const Op = db.Sequelize.Op;

const verifyCreate = [
    check('title', 'Ingrese un titulo').not().isEmpty(),
    check('title').custom(verifyTitle),
    check('stock', 'Ingrese un numero mayor a 0').isInt({ min: 1}),
    check('price', 'El precio debe ser mayor a 0').not().isEmpty().isNumeric({min:0}),
    check('description', 'Ingrese una descripcion').not().isEmpty(),
    check('mostwanted', 'Ingrese un valor entre 1 y 0 siendo 1 True').isInt({min:0, max:1}),
    check('fk_id_category', 'Ingrese un id de categoria que exista').not().isEmpty(),
    check('fk_id_category').custom(verifyCategory),
    (req,res,next) => {
        handleErrors(req,res,next);
    }
]

const verifyEdit = [
    check('title').isLength({ min: 1}).custom(verifyTitle).optional({nullable: true}),
    check('stock', 'Ingrese un numero mayor a 0').isInt({ min: 1}).optional({nullable: true}),
    check('price', 'El precio debe ser mayor a 0').not().isEmpty().optional().isInt({min:0}),
    check('description', 'Ingrese una descripcion').not().isEmpty().optional({nullable: true}),
    check('mostwanted', 'Ingrese un valor entre 1 y 0 siendo 1 True').isInt({min:0, max:1}).optional({nullable: true}),
    check('fk_id_category').custom(verifyCategory).optional({nullable: true}),
    (req,res,next) => {
        handleErrors(req,res,next);
    }
]

const existProductListVerify = async (req,res,next) => {
    let products = null;
    const {category} = req.query;
    if(category){
        products = await db.Product.findAll({
            include: [
                { association: 'pictures', attributes: { exclude: ['id_picture', 'fk_id_product'] }, require: false }, 
                { association: 'category', attributes: { exclude: ['id_category'] }, where:{ title: { [Op.like]: `${category}` } }, require: false }
            ], 
            attributes: { exclude: ['fk_id_category'] }
        });
    }else{
        products = await db.Product.findAll({
            include: [
                { association: 'pictures', attributes: { exclude: ['id_picture', 'fk_id_product'] }, require: false },
                { association: 'category', attributes: { exclude: ['id_category'] }, require: false }
            ], 
            attributes: { exclude: ['fk_id_category'] }
        });
    }
    if (products[0] != null) {
        req.products = products;
        next();
    } else res.status(404).json({ msg: 'No existen productos.' });
}

const existProductListByIdVerify = async (req,res,next) => {
    const product = await db.Product.findByPk(req.params.id, {
        include: [
            { association: 'pictures', attributes: { exclude: ['id_picture', 'fk_id_product'] }, require: false },
            { association: 'category', attributes: { exclude: ['id_category'] }, require: false }
        ], attributes: { exclude: ['fk_id_category'] }
    });
    if (product) {
        req.product = product;
        next();
    } else res.status(404).json({ msg: 'No existe el producto.' });
}

const existProductListKeywordVerify = async (req,res,next) => {
    const key = req.query.q;
    const list = await db.Product.findAll( { 
        where: { [Op.or]: [{ description: { [Op.like]: `${key}` } }, { title: { [Op.like]: `${key}` } }] } ,
            include: [
            {association: 'pictures', attributes:{exclude: ['id_picture', 'fk_id_product']}, require: false},
            {association: 'category',attributes:{exclude: ['id_category']}, require: false}
        ], 
        attributes:{exclude: ['fk_id_category']}
    });
    if (list[0] != null) {
        req.list = list;
        next(); 
    } else res.status(404).json({ msg: 'No hay ningun producto con esa palabra.' })
}

const existProductListMostwantedVerify = async (req,res,next) => {
    const mostWanted = await db.Product.findAll({
        where: { mostwanted: 1 },
        include: [
            {association: 'pictures', attributes:{exclude: ['id_picture', 'fk_id_product']}, require: false},
            {association: 'category',attributes:{exclude: ['id_category']}, require: false}
        ], 
        attributes:{exclude: ['fk_id_category']}
    })
    if (mostWanted[0] != null) {
        req.mostwanted = mostWanted;
        next();
    } else res.status(404).json({ msg: 'No hay productos requeridos.' })
}

const existProductEditVerify = async (req,res,next) => {
    const { fk_id_category, ...body } = req.body;
    const { idProduct } = req.params;
    let category = null;
    const product = await db.Product.findByPk(Number(idProduct));
    if (!fk_id_category)  category = product.fk_id_category;
    else category = fk_id_category;
    if (product){
        req.body = body;
        req.id = idProduct;
        req.category= category;
        next();
    }
    else return res.status(404).json({ msg: 'No existe el producto.' })
}

const existProductDeleteVerify = async (req,res,next) => {
    const id = Number(req.params.id);
    const oldData = await db.Product.findByPk(id, {raw: true});
    const cartInProduct = await db.Cart.findOne({ where: {fk_id_product: Number(oldData.id_product) }});
    if (oldData) {
        if (!cartInProduct) {
            const pictureProductDelete = await db.Picture.findOne({ where: { fk_id_product: Number(oldData.id_product) } });
            if (!pictureProductDelete) {
                req.id = id;
                req.oldData = oldData;
                next();
            } else res.status(404).json({ msg: 'Ese producto tiene una picture asociada y por ende no se puede borrar' })
        } else res.status(404).json({ msg: 'Ese producto tiene un carro asociado y por ende no se puede borrar' })
    } else res.status(404).json({ msg: 'Ese producto no existe.' })
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