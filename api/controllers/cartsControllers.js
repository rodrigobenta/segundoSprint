const fs = require("fs");
const direcionBaseUsuarios= process.env.RUTA_DB_USER;

function getDataU(direccion){
    try {
        let data = fs.readFileSync(direccion, 'utf-8');
        data = JSON.parse(data);
        return data;
    } catch (error) {
        return error;
    }
}

function getCart(usuarioID){
    try {
        let totalUsuarios = getDataU(direcionBaseUsuarios);
        let usuario= totalUsuarios.find((u)=> u.id === usuarioID);
        let carrito = usuario.cart;
    return carrito;
    } catch (error) {
        res.status(500).json({msg: 'Server Error'});
    }
}

const cartOfId = (req, res) => {
    try {
        let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
        let dataParsed = JSON.parse(data);
        let id = Number(req.params.id);
        let usuarios = getDataU(direcionBaseUsuarios);
        let existe= false;
        let carrito;
        if(usuarios.find(usuarios => usuarios.id === id)){
        usuarios.forEach(element => {
            if(element.id == id){
                existe = true;
                carrito = getCart(id);
                let cartObjects = [];
                let prodCarro;
                    carrito.forEach(el => {
                        let obj= {};
                        prodCarro = dataParsed.find(dataParsed => dataParsed.id == el.product);
                        obj['product'] = prodCarro; 
                        obj['quantity'] = el.quantity;
                        cartObjects.push(obj);
                    })
                res.status(200).json({
                    Carrito: cartObjects
                });
            }
        });
    }
    else return res.status(404).json({msg: 'Usuario no encontrado'});                            
    } catch (error) {
        res.status(500).json({Mensaje: "Server error"});
    }
};

const updateCart = (req, res) => {
try {
    let id = Number(req.params.id);
    dataUsers = getDataU(direcionBaseUsuarios);
    let indiceU = dataUsers.findIndex((el)=> el.id === id )
    if (indiceU !== -1) {
        let carrito = getCart(id);
        let cartNuevo = req.body;
        carrito = cartNuevo;
        dataUsers[indiceU].cart = carrito;
        fs.writeFileSync(direcionBaseUsuarios, JSON.stringify(dataUsers));
        res.status(200).json({ CarritoNuevo: carrito});
    }
    else{
        res.status(500).json({Mensaje: "Server error o id fuera de rango"});
    };
    } catch (error) {
        res.status(500).json("server error");
    };
}

module.exports = {
    cartOfId,
    updateCart
};