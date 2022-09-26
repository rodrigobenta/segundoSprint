const fs = require("fs");
const direcionBaseUsuarios= process.env.RUTA_DB_USER;
const db = require('../../database/models');
//const { param } = require("../routes/cartsRoutes");


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
};//SELECT fk_id_product, title, quantity  FROM `carts` 
//INNER JOIN products ON carts.fk_id_product = products.id_product 
//WHERE carts.fk_id_user = 5

const cartOfId = async(req, res) => {
    try {
        const userEdit = await db.User.findByPk(Number(req.params.id));
        if(userEdit){
            console.log("paseesaporqueria");
            
            const cartOfUser = await db.User.findByPk(Number(req.params.id),
                                { attributes:['username'],
                                    include:{association: 'product_user',attributes: ['title'], 
                                    through: {attributes:['quantity']}}
                                    });
                res.status(200).json(cartOfUser);
        }else res.status(404).json({ msg: 'No encuentra el usuario'});
    } catch (error) {
        console.log(error);
        res.status(500).json({Mensaje: "Server error"});
    };
};

const updateCart = async(req, res) => {


    try {
        const userEdit = await db.User.findByPk(Number(req.params.id));
        if(userEdit){

            const cartOfUser = await db.Cart.findAll({where: {fk_id_user: (Number(req.params.id))}},{raw: true});
            //console.log("atrasfor");
            
            //res.json(cartOfUser.length);
            
            console.log("atrasfor");

            for (let i = 0; i < cartOfUser.length; i++) {
                let element = cartOfUser[i];
                console.log("adentrodelfor");
                let elementFkProduct =element.fk_id_product;
                let product = await db.Product.findByPk(elementFkProduct);
                let sum= product.stock + element.quantity;
                db.Product.update({stock: sum}, {where : {id_product : elementFkProduct}});
                
            }//SEPUEDEAHORRAR
            
            
            const cartOfUserDestroyed = await db.Cart.destroy({where: {fk_id_user: (Number(req.params.id))}})
            
            
            
            
            const previewCart = req.body;
            const finalCart= [];
            const noStock= [];
            const outStock=[];
            for (let i = 0; i < previewCart.length; i++) {
                
                let producto;
                
                if (producto= await db.Product.findByPk(previewCart[i].fk_id_product,{raw:true})){
                    if (producto.stock>= previewCart[i].quantity) {
                        
                        let cantida = producto.stock - previewCart[i].quantity;
                        
                        db.Product.update({stock: cantida},{where :{id_product: previewCart[i].fk_id_product} });
                        previewCart[i]["fk_id_user"]=Number(req.params.id);
                        finalCart.push(previewCart[i]);

                    }//if stock
                    else{//distinto de 0 FALATA AGREGAR

                        if (producto.stock!=0) {
                            
                        let fixedQuanti =  previewCart[i];
                        db.Product.update({stock: 0},{where :{id_product: previewCart[i].fk_id_product} });


                        fixedQuanti["quantity"]=(producto.stock);
                        //finalCart.push(fixedQuanti);
                        fixedQuanti["fk_id_user"]=Number(req.params.id);
                        
                        noStock.push(fixedQuanti);

                    } else {
                        outStock.push(previewCart[i])       
                    }
                    }

            }//if existe producot
        }//for
        const completeCart = finalCart.concat(noStock);
        

        



        db.Cart.bulkCreate(completeCart);
            
            res.status(200).json({msg: 'Productos en Stock',
                                    productos: finalCart,
                                    msg2: 'Productos con stock limitado',
                                    productos2: noStock,
                                    msg3: 'Productos SIN stock',
                                    productos3: outStock});

        }else res.status(404).json({ msg: 'No encuentra el usuario'});
    } catch (error) {
        res.status(500).json({Mensaje: "Server error (UpdateCart)"});
    };

/*
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

        carrito = cartNuevo;
        dataUsers[indiceU].cart = carrito;
        fs.writeFileSync(direcionBaseUsuarios, JSON.stringify(dataUsers));
        res.status(200).json({ CarritoNuevo: carrito});
    
    //else{
      //  res.status(500).json({Mensaje: "Server error o id fuera de rango"});
    ///};
    } catch (error) {
       // res.status(500).json("server error");
    };
}*/}

module.exports = {
    cartOfId,
    updateCart
};