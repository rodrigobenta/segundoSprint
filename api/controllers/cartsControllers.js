const db = require('../../database/models');


const cartOfId = async(req, res) => {
    try {
        const userEdit = await db.User.findByPk(Number(req.params.id));
        let totalSold = 0;
        if(userEdit){
            const cartOfUser = await db.User.findByPk(Number(req.params.id),
                                { attributes:['username'],
                                    include: {association: 'carts',attributes: ['title','price'], 
                                    through: {attributes:['quantity']}}
                                    },{raw: true ,nest: true});                                    
                                    cartOfUser.carts.forEach((el) => {                                        
                                        totalSold += el.dataValues.price * el.dataValues.Cart.dataValues.quantity;
                                    });
                let totalSoldUsd = parseFloat((totalSold/42)).toFixed(2);
                res.status(200).json({
                    msg: `Total $ ${totalSold}`,
                    msg1: `Total USD ${totalSoldUsd}`,
                    cartOfUser});
        }
        else res.status(404).json({ msg: 'No encuentra el usuario'});
    } catch (error) {
        res.status(500).json({Mensaje: "Server error"});
    };
};

const updateCart = async(req, res) => {
    try {
        const userEdit = await db.User.findByPk(Number(req.params.id));
        if(userEdit){
            const cartOfUser = await db.Cart.findAll({where: {fk_id_user: (Number(req.params.id))}},{raw: true})
            for (let i = 0; i < cartOfUser.length; i++) {
                let element = cartOfUser[i];
                let elementFkProduct =element.fk_id_product;
                let product = await db.Product.findByPk(elementFkProduct);
                let sum= product.stock + element.quantity;
                db.Product.update({stock: sum}, {where : {id_product : elementFkProduct}});
            }
            await db.Cart.destroy({where: {fk_id_user: (Number(req.params.id))}})
            const previewCart = req.body;
            const finalCart= [];
            const finalCartShow = [];
            const noStock= [];
            const noStockCartShow = [];
            const outStock=[];
            let totalSold = 0;
            for (let i = 0; i < previewCart.length; i++){ 
                let producto;
                let obj;
                if (producto= await db.Product.findByPk(previewCart[i].fk_id_product,{raw:true})){
                    if (producto.stock>= previewCart[i].quantity){ 
                        let cantida = producto.stock - previewCart[i].quantity;
                        db.Product.update({stock: cantida},{where :{id_product: previewCart[i].fk_id_product} });
                        previewCart[i]["fk_id_user"]=Number(req.params.id);
                        finalCart.push(previewCart[i]);
                        totalSold += producto.price * previewCart[i].quantity;
                        obj = {title: producto.title, quantity: previewCart[i].quantity};
                        finalCartShow.push(obj);
                    }
                    else{
                            if (producto.stock!=0) {   
                                let fixedQuanti =  previewCart[i];
                                db.Product.update({stock: 0},{where :{id_product: previewCart[i].fk_id_product} });
                                fixedQuanti["quantity"]=(producto.stock);
                                fixedQuanti["fk_id_user"]=Number(req.params.id);                                
                                noStock.push(fixedQuanti);
                                totalSold += producto.price * producto.stock;                                
                                obj = {title: producto.title, quantity: producto.stock};
                                noStockCartShow.push(obj);
                            }
                            else{
                                obj = {title: producto.title, quantity: 0};
                                outStock.push(obj)
                            }       
                        }
                    }
                }
            let totalSoldUsd = parseFloat((totalSold/42)).toFixed(2);
            const completeCart = finalCart.concat(noStock);
            db.Cart.bulkCreate(completeCart);        
            res.status(200).json({
                msg: `Total $ ${totalSold}`,
                msg1: `Total USD ${totalSoldUsd}`,
                msg2: 'Productos en Stock',
                productos: finalCartShow,
                msg3: 'Productos con stock limitado',
                productos2: noStock,
                msg4: 'Productos SIN stock',
                productos3: outStock
            });
        }
        else res.status(404).json({ msg: 'No encuentra el usuario'});
    } catch (error) {
        res.status(500).json({Mensaje: "Server error (UpdateCart)"});
    }
}

module.exports = {
    cartOfId,
    updateCart
};