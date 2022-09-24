const db = require('../../database/models')
const Op = db.Sequelize.Op;






//lista todos los productos, o lista por categoria.
const listCategory = async (req, res) => {

    try {
        const category = await db.Category.findAll({  attributes: { exclude: ['id_category'] }
        });
        if (category[0] != null) {
       
            return res.status(200).json({ Category: category });
        } else {
            res.status(404).json({ msg: 'No existe esa categoria.' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Server error' });

    }
}

const listCategoryID = async (req, res) => {
    console.log("hola")

    try {
        const category = await db.Category.findByPk(req.params.id, { attributes: { exclude: ['id_category'] }
        });
        if (category) {
   
            return res.status(404).json({ Category: category });
        } else {
            res.status(404).json({ msg: 'No existe la categoria.' });
        }
    } catch (error) {
       res.status(500).json({ msg: error });
    }
}

const createCategory = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const newCategory = await db.Category.create(body);
        console.log(newCategory);
    
        res.status(201).json({ newCategory });
    } catch (error) {
        const errObj = {};
        error.errors.map(er => {
            errObj[er.path] = er.message;
        })
        if (errObj) res.status(500).json(errObj);
        else res.status(500).json({ msg: 'Server error.' });
    }
}

const deleteCategoryById = async (req,res) => {
    try {
        let ucategoryDeleted;
        let productCategory;
        const id = Number(req.params.id);

        productCategory = await  db.Product.findOne({ where:{
            fk_id_category:id
    }})
      if(!productCategory  ){

      
    

        if(ucategoryDeleted = await db.Category.findByPk(id,{raw: true})){
   
            const {id_category, ...categoryShow} = ucategoryDeleted;
         
            await db.Category.destroy({where:{
              
                id_category: id
           }})
            res.status(200).json( {Categoria_Borrada :categoryShow});
        }
     return res.status(404).json({ msg: 'La categoria no existe.'});
    }else{
        res.status(404).json({ msg: 'La categoria tiene asociada un producto no se puede borrar.'});
    }
    } catch (error) {
        res.status(500).json({ msg: 'Server error.' });
    }
}

const editCategory = async (req, res) => {
    try {
        const { id_category, ...body } = req.body;
        const { id } = req.params;

      
        const category = await db.Category.findByPk(Number(id));
        console.log(category)
        if (category) {
            await db.Category.update({ ...body, id_category }, { where: { id_category: Number(id) } });

            const categoryEdit = await db.Category.findByPk(id, { attributes: { exclude: ['id_category'] }})
            console.log(categoryEdit);
           
            res.status(200).json({ CategoriaEditada: categoryEdit });
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


module.exports = {
    listCategory,
    listCategoryID,
    createCategory,
    deleteCategoryById,
    editCategory
   
};
