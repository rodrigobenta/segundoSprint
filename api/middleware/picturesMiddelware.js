
const fs = require('fs');
const verifyCreateEditPictures = (req,res,next) => {
    try {
        const {picture_id,picture_url, description} = req.body;
        let data = fs.readFileSync(process.env.RUTA_DB_PICTURES, 'utf-8');
        let dataParsed = JSON.parse(data);
        let provePicURL;
        if(provePicURL = dataParsed.find(dataParsed => dataParsed.picture_url == picture_url)) return res.status(400).json({msg: 'La imagen ya existe'})
        else{
            if (req.method!= 'PUT' && !picture_url) {
                return res.status(400).json({
                    mensaje: 'Faltan campos necesarios para crear la picture'
                });
            }
        }
    next();
    } catch (error) {
        res.status(500).json({
            msg: 'Server Error'
        })
    }
};

const verifyRoleEditPicture = (req,res,next) => {
    try {
        let role = req.role;
        if(role == 'guest') res.status(401).json({msg: 'No tiene permisos sobre las fotos'});
        else next();
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}

module.exports = {
    verifyCreateEditPictures,
    verifyRoleEditPicture
};