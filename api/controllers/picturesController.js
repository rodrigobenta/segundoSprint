const db = require('../../database/models')


const listPictures = async(req, res) => {
    try {
        if(req.params.id){
            const id = req.params.id;
            const pictures = await db.Picture.findAll({where: {fk_id_product: id}});
            (pictures.length > 0) ? res.status(200).json({pictures: pictures}) :res.status(404).json({msg: 'No existe el producto indicado o no hay fotos'});
        }
        else{
            const {product} = req.query;
            const pictures = await db.Picture.findAll({where: {fk_id_product: product}});
            (pictures.length > 0) ? res.status(200).json({pictures}) : res.status(404).json({msg: 'No existe el producto indicado o no hay fotos'});
            }
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}
const listPictureById = async(req, res) => {
    const id = req.params.id;
    try {
        const picture = await db.Picture.findByPk(id);
        (picture) ? res.status(200).json({picture}) : res.status(404).json({msg: 'No existe la foto indicada'});
    } catch (error) {
        res.status(500).json({msg: 'server error'});
    }
};

const createPicture = async(req, res) => {
    try {
        const body = req.body;
        const newPicture = await db.Picture.create(body)
        res.status(201).json({ picture: newPicture });
    } catch (error) {
        const errObj = {};
            error.errors.map( er => {
            errObj[er.path] = er.message;
            })
        if(errObj) res.status(500).json(errObj);
        else res.status(500).json({ msg: 'Server error.' });
    }
}

const editPicture = async(req, res) => {
    try {
        const body = req.body;
        const id = Number(req.params.id);
        const pictureAnterior = await db.Picture.findByPk(id)
        if (pictureAnterior){
            await db.Picture.update(body, {where: {id_picture: id}});
            const pictureEdit = await db.Picture.findByPk(id);
            res.status(200).json({ foto_anterior: pictureAnterior, foto_editada: pictureEdit});
        }
        else res.status(404).json({msg: "La foto no existe"});
    } catch (error) {
        const errObj = {};
            error.errors.map( er => {
            errObj[er.path] = er.message;
            })
        if(errObj) res.status(500).json(errObj);
        else res.status(500).json({ msg: 'Server error.' });
    }
};

const deletePicture = async(req, res) => {
    try {
        const id = req.params.id;
        const pictureDeleted = req.picture;
        await db.Picture.destroy({where: {id_picture: id}})
        res.status(200).json({PictureDeleted: pictureDeleted})
    } catch (error) {
        console.log(error);
        res.status(500).json({mensaje: 'Server error'});
    }
};

module.exports = {
    listPictures,
    listPictureById,
    createPicture,
    editPicture,
    deletePicture
}