
const fs = require('fs');
const db= require('../../database/models');


//lista todos los productos, o lista por categoria.
const listProduct = async (req, res) => {
   
console.log("hola")


    try {
        const products = await db.Product.findAll({
            include: [
                {association: 'user_cart', required: true}
                //required: true //esto hace un inner join, sino es un left join nomas.
            ]
           
        }).then((data)=>{
            console.log(data);
        })
      
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({msg: 'Server error'})
    }



/*
        //let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
       // let dataParsed = JSON.parse(data);
        //const {category} = req.query;
       // if(!category) res.status(200).json(dataParsed);
       //else{
        //const dataToShow = dataParsed.filter(elm => elm.category.toLowerCase() == category.toLowerCase());
           // if (!dataToShow) {
              //  return res.status(404).json({
                    //mensaje: 'el producto no existe'
               // });
            //}
            //else res.status(200).json({dataToShow});
        //}
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Server error'
        });
    }*/
}

const listProductByID = (req, res) => {
    try {
        const { id } = req.params;
        let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
        let dataParsed = JSON.parse(data);
        const dataToShow = dataParsed.find(elm => elm.id === Number(id));
        if (!dataToShow) {
            return res.status(404).json({
                mensaje: 'Not found (el producto no existe)'
            });
        }
        res.status(200).json(dataToShow);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'server error'
        });
    }
}

const listProductByKeyword = (req, res) => {
    try {
        let key = req.query.q;
        let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
        let dataParsed = JSON.parse(data);
        let newList =[];
        dataParsed.forEach(element => {
            if(element.title.toLowerCase() === key.toLowerCase() || element.description.toLowerCase() === key.toLowerCase()|| element.category.toLowerCase() === key.toLowerCase() ){
                newList.push(element)
            }
        });
        res.status(200).json(newList);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'server error'
        });
    }
}

const listMostWantedProduct = (req, res) => {
    try {
        let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
        let dataParsed = JSON.parse(data);
        const dataToShow = dataParsed.filter(elm => elm.mostwanted == "true");
        if (!dataToShow) {
            return res.status(404).json({
                mensaje: 'Not found (el producto no existe)'
            });
        }
        res.status(200).json(dataToShow);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Server error'
        });
    }
}

const createProduct = (req, res) => {
    let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
    let dataParsed = JSON.parse(data);
    let dataPictures = fs.readFileSync(process.env.RUTA_DB_PICTURES, 'utf-8');
    let dataParsedPictures = JSON.parse(dataPictures);
    try {
        let id=0;
        if(dataParsed.length>0){
            for(let i = 0; i< dataParsed.length ; i++){
                if(id<dataParsed[i].id) id = dataParsed[i].id;
            }
        }
        else id = 0;
        id = id+1;
        let { title, price, description, image, gallery, category, mostwanted, stock} = req.body;
        if(!stock) stock = 0;
        let arrayDePicture = [];
        for(let i=0; i<gallery.length; i++){
            let findObject;
            findObject = dataParsedPictures.find(dataP => dataP.picture_id == gallery[i]);
            if(findObject) arrayDePicture.push(findObject);
        }
        gallery = [...arrayDePicture];
        let nuevoProducto = {
            id,
            title,
            price,
            description,
            image,
            gallery, 
            category,
            mostwanted,
            stock
        }
        dataParsed.push(nuevoProducto);
        fs.writeFileSync(process.env.RUTA_DB_PRODUCT, JSON.stringify(dataParsed));
        res.status(201).json({ nuevoProducto });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Server error'
        });
    }
}

const editProduct = (req, res) => {
    try {
        const { id, ...restoDeElementos } = req.body;
        const { idProduct } = req.params;
        const dataToParse = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
        const data = JSON.parse(dataToParse);
        let dataPictures = fs.readFileSync(process.env.RUTA_DB_PICTURES, 'utf-8');
        let dataParsedPictures = JSON.parse(dataPictures);
        let newEl;
        if(data.find(data => data.id == idProduct)){
            const dataUpdate = data.map(product => {
                if (product.id == Number(idProduct)) {
                    if(restoDeElementos.gallery){
                        let arrayDePicture = [];
                        let findObject;
                        for(let i=0; i<restoDeElementos.gallery.length; i++){
                            if(findObject = dataParsedPictures.find(dataP => dataP.picture_id == restoDeElementos.gallery[i])){
                                arrayDePicture.push(findObject);
                            }
                        }
                        restoDeElementos.gallery = [...arrayDePicture];
                        newEl = { ...product, ...restoDeElementos };
                    }
                    else newEl = { ...product, ...restoDeElementos };
                    return newEl;
                } else {
                    return product;
                }
            });
            fs.writeFileSync(process.env.RUTA_DB_PRODUCT, JSON.stringify(dataUpdate));
            res.status(200).json(newEl);
        }
        else res.status(200).json({msg: 'No existe no el producto'})
    } catch (error) {
        res.status(500).json({
            mensaje: 'Server error'
        });
    }
}

const deleteProduct = (req, res) => {
    try {
        const { id } = req.params;
        let dataToParse = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
        let data = JSON.parse(dataToParse);
        let oldData = data.filter(el => el.id === Number(id));
        if(!oldData){
            res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }
        const newData = data.filter(el => el.id !== Number(id));
        fs.writeFileSync(process.env.RUTA_DB_PRODUCT, JSON.stringify(newData));
        res.status(200).json({
            mensaje: 'Producto eliminado con exito',
            oldData 

        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Server error'
        });
    }
}

module.exports = { listProduct,
    listProductByID,
    listProductByKeyword,
    listMostWantedProduct,
    createProduct,
    editProduct,
    deleteProduct
};