const fs = require("fs");
const direcionBaseUsuarios= process.env.RUTA_DB_USER;
const db = require('../../database/models');
const { param } = require("../routes/cartsRoutes");


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

const cartOfId = async(req, res) => {
    try {
        const userEdit = await db.User.findByPk(Number(req.params.id));
        if(userEdit){
            const cartOfUser = await db.Cart.findAll({where: {fk_id_user: (req.params.id)}})
            res.status(200).json(cartOfUser);
        }else res.status(404).json({ msg: 'No encuentra el usuario'});
    } catch (error) {
        res.status(500).json({Mensaje: "Server error"});
    };
};

const updateCart = async(req, res) => {
try {
    const id = req.params.id;
    const body = req.body;

    
    
    await db.Cart.upsert({
        fk_id_user: id,
        fk_id_product: body.id_product,
        quantity: body.quantity
    })



/* 
        --id   -- producto   --cantidad
        1              1        3
        1              2        4
        2              1        1
        3              3        2
 */
/// 1    1    4
//  1    5    1
//  1    2    0

/* 
        --id   -- producto   --cantidad
        1              1        4
        1              5        1
        2              1        1
        3              3        2
 */
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