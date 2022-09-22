
const listPictures = (req, res) => {
    try {
        if(req.params.id){
            const id = req.params.id;
            let findObject;
            if(findObject = dataParsedProducts.find(el => el.id == id)){
                let pictures = findObject.gallery;
                pictures ? res.status(200).json({pictures}) : res.status(404).json({msg: 'No existen fotos en galeria'});
            }
            else {
                res.status(404).json({msg: 'No existe el producto indicado'});
            }
        }
        else{
            const {product} = req.query;
            let findObject;
            if(findObject = dataParsedProducts.find(el => el.id == product)){
                let pictures = findObject.gallery;
                pictures ? res.status(200).json({pictures}) : res.status(404).json({msg: 'No existen fotos en galeria'});
            }
            else res.status(404).json({msg: 'No existe el producto indicado'});
        }
    } catch (error) {
        res.status(500).json({msg: 'Server error'})
    }
};

const listPictureById = (req, res) => {
    const { id } = req.params;
    try {
        let data = fs.readFileSync(process.env.RUTA_DB_PICTURES, 'utf-8');
        let dataParsed = JSON.parse(data);
        const dataToShow = dataParsed.find(elm => elm.picture_id === Number(id));
        if (!dataToShow) {
            return res.status(404).json({
                mensaje: 'Not found (el picturs no existe)'
            });
        }
        res.status(200).json(dataToShow);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'server error'
        });
    }
};

const createPicture = (req, res) => {
    let data = fs.readFileSync(process.env.RUTA_DB_PICTURES,'utf-8');
    let dataParsed = JSON.parse(data);
    let { picture_id, picture_url, description } = req.body;
    let id=0;
    if(dataParsed.length>0){
        for(let i = 0; i< dataParsed.length ; i++){
            if(id<dataParsed[i].picture_id) id = dataParsed[i].picture_id;
        }
    }
    else id = 0;
    id = id+1;
    picture_id = id;
    const nuevoPictures = {
        picture_id,
        picture_url,
        description
    }
    try {
        let data = fs.readFileSync(process.env.RUTA_DB_PICTURES, 'utf-8');
        let dataParsed = JSON.parse(data);
        dataParsed.push(nuevoPictures);
        fs.writeFileSync(process.env.RUTA_DB_PICTURES, JSON.stringify(dataParsed));
        res.status(201).json({ nuevoPictures });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Server error'
        });
    }
};

const editPicture = (req, res) => {
    const { picture_id, ...restoDeElementos } = req.body;
    const { id } = req.params;
    try {
        const dataToParse = fs.readFileSync(process.env.RUTA_DB_PICTURES, 'utf-8');
        const data = JSON.parse(dataToParse);
        let newEl;
        const dataUpdate = data.map(picture => {
            if (picture.picture_id == Number(id)) {
                newEl = { ...picture, ...restoDeElementos };
                return newEl;
            } 
            else {
                return picture;
            }
        });
        fs.writeFileSync(process.env.RUTA_DB_PICTURES, JSON.stringify(dataUpdate));
        res.status(200).json(newEl);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Server error'
        });
    }
};

const deletePicture = (req, res) => {
    const { id } = req.params;
    try {
        const dataToParse = fs.readFileSync(process.env.RUTA_DB_PICTURES, 'utf-8');
        const data = JSON.parse(dataToParse);
        const oldData = data.find(el => el.picture_id === Number(id));
        const newData = data.filter(el => el.picture_id !== Number(id));
        fs.writeFileSync(process.env.RUTA_DB_PICTURES, JSON.stringify(newData));
        res.status(200).json({
            ok: "Imagen eliminada con exito",
            mensaje:  oldData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Server error'
        });
    }
};

module.exports = {
    listPictures,
    listPictureById,
    createPicture,
    editPicture,
    deletePicture
}