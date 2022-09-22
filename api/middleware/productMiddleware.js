const fs = require('fs');

const verifyCreateEdit = (req,res,next) => {
    try {
        let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
        let dataParsed = JSON.parse(data);
        const { title, price,category, mostwanted} = req.body;
        let proveTitle = dataParsed.find( dataParsed => dataParsed.title === title);
        if(proveTitle = dataParsed.find( dataParsed => dataParsed.title === title)) return res.status(400).json({msg: 'Producto ya ingresado'});
        else{
            if (!title || !price || !category || !mostwanted) {
                return res.status(400).json({
                    Mensaje: 'Faltan campos necesarios para crear producto'
                });
            }
        }
        next();
    } catch (error) {
        res.status(500).json({
            Mensaje: 'Server Error'
        })
    }
};

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
    verifyCreateEdit
};