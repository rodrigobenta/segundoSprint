const db = require('../../database/models')

const listCategory = async (req, res) => {
    try {
        const categorys =req.category;
        return res.status(200).json({ Categories: categorys }); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Server error' });
    }
}

const listCategoryID =(req, res) => {
    try {
        const category = req.category;
        return res.status(404).json({ Category: category });
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

const createCategory = async (req, res) => {
    try {
        const body = req.body;
        const newCategory = await db.Category.create(body);
        res.status(201).json({ newCategory });
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

const deleteCategoryById = async (req,res) => {
    try {
        const id = req.id;
        const categoryShow = req.categoryShow;
        await db.Category.destroy({
            where: {id_category: id}
        })
        res.status(200).json( {CategoryDeleted : categoryShow});
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

const editCategory = async (req, res) => {
    try {
        const body = req.body;
        const id = req.id;
        await db.Category.update({ ...body }, { where: { id_category: Number(id) } });
        const categoryEdit = await db.Category.findByPk(id, { attributes: { exclude: ['id_category'] }})
        res.status(200).json({ CategoryEdited: categoryEdit });
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

module.exports = {
    listCategory,
    listCategoryID,
    createCategory,
    deleteCategoryById,
    editCategory
};
