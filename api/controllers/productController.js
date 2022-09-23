const { where } = require("sequelize");
const db = require("../../database/models");
const { pasarATrueOrFalseArray, pasarATrueOrFalse } = require("../../helpers/pasarATrue");
const Op = db.Sequelize.Op;

//lista todos los productos, o lista por categoria.
const listProduct = async (req, res) => {
    try {
        const products = await db.Product.findAll({
            include: [
                { association: 'picture_product', attributes: { exclude: ['id_picture', 'fk_id_product'] }, require: false },
                { association: 'category_product', attributes: { exclude: ['id_category'] }, require: false }
            ], attributes: { exclude: ['fk_id_category'] }
        });
        if (products[0] != null) {
            pasarATrueOrFalseArray(products)
            return res.status(200).json({ Productos: products });
        } else {
            res.status(404).json({ msg: 'No existen productos.' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Server error' });
    }
}

const listProductByID = async (req, res) => {
    try {
        const product = await db.Product.findByPk(req.params.id, {
            include: [
                { association: 'picture_product', attributes: { exclude: ['id_picture', 'fk_id_product'] }, require: false },
                { association: 'category_product', attributes: { exclude: ['id_category'] }, require: false }
            ], attributes: { exclude: ['fk_id_category'] }
        });
        if (product) {
            pasarATrueOrFalse(product);
            return res.status(404).json({ Producto: product });
        } else {
            res.status(404).json({ msg: 'No existe el producto.' });
        }
    } catch (error) {
        const errObj = {};
        error.errors.map(er => {
            errObj[er.path] = er.message;
        })
        if (errObj) res.status(500).json(errObj);
        else res.status(500).json({ msg: 'Server error.' });
    }
}

const listProductByKeyword = async (req, res) => {
    try {
        let key = req.query.q;
        //preguntar esto//
        const list = await db.Product.findAll( { 
            where: { [Op.or]: [{ description: { [Op.like]: `${key}` } }, { title: { [Op.like]: `${key}` } }] } ,
             include: [
                {association: 'picture_product', attributes:{exclude: ['id_picture', 'fk_id_product']}, require: false},
               {association: 'category_product',attributes:{exclude: ['id_category']}, require: false}
            ], attributes:{exclude: ['fk_id_category']}
        });
        if (list[0] != null) {
            pasarATrueOrFalseArray(list);
            res.status(200).json({ Lista: list });
        } else {
            res.status(404).json({ msg: 'No hay ningun producto con esa palabra.' })
        }
    } catch (error) {
        const errObj = {};
        error.errors.map(er => {
            errObj[er.path] = er.message;
        })
        if (errObj) res.status(500).json(errObj);
        else res.status(500).json({ msg: 'Server error.' });
    }
}

const listMostWantedProduct = async (req, res) => {
    try {
        const mostWanted = await db.Product.findAll({
            where: { mostwanted: 1 },
            include: [
                {association: 'picture_product', attributes:{exclude: ['id_picture', 'fk_id_product']}, require: false},
                {association: 'category_product',attributes:{exclude: ['id_category']}, require: false}
            ], attributes:{exclude: ['fk_id_category']}
        })
        if (mostWanted[0] != null) {
            pasarATrueOrFalseArray(mostWanted);
            res.status(200).json({ ProductsMostwanted: mostWanted });
        } else {
            res.status(404).json({ msg: 'No hay productos requeridos.' })
        }
    } catch (error) {
        const errObj = {};
        error.errors.map(er => {
            errObj[er.path] = er.message;
        })
        if (errObj) res.status(500).json(errObj);
        else res.status(500).json({ msg: 'Server error.' });
    }
}

const createProduct = async (req, res) => {
    try {
        const body = req.body;
        const newProduct = await db.Product.create(body);
        pasarATrueOrFalse(newProduct);
        res.status(201).json({ newProduct });
    } catch (error) {
        const errObj = {};
        error.errors.map(er => {
            errObj[er.path] = er.message;
        })
        if (errObj) res.status(500).json(errObj);
        else res.status(500).json({ msg: 'Server error.' });
    }
}

const editProduct = async (req, res) => {
    try {
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
            pasarATrueOrFalse(productEdited);
            res.status(200).json({ ProductoEditado: productEdited });
        }
        else res.status(404).json({ msg: 'No existe no el producto o la cateogira.' })
    } catch (error) {
        const errObj = {};
        error.errors.map(er => {
            errObj[er.path] = er.message;
        })
        if (errObj) res.status(500).json(errObj);
        else res.status(500).json({ msg: 'Server error.' });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const oldData = await db.Product.findByPk(id);
        const cartInProduct = await db.Cart.findOne({ where: {fk_id_product: Number(oldData.id_product) }});
        if (oldData) {
            if (!cartInProduct) {
                const pictureProductDelete = await db.Picture.findOne({ where: { fk_id_product: Number(oldData.id_product) } });
                if (!pictureProductDelete) {
                    await db.Product.destroy({ where: { id_product: id } });
                    res.status(200).json({ oldData });
                } else {
                    res.status(404).json({ msg: 'Ese producto tiene una picture asociada y por ende no se puede borrar' })
                }
            } else {
                res.status(404).json({ msg: 'Ese producto tiene un carro asociado y por ende no se puede borrar' })
            }
        } else {
            res.status(404).json({ msg: 'Ese producto no existe.' })
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    listProduct,
    listProductByID,
    listProductByKeyword,
    listMostWantedProduct,
    createProduct,
    editProduct,
    deleteProduct
};