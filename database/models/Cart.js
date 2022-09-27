const User = require("./User");

module.exports = (sequelize, dataTypes) => {
    const alias = 'Cart';

    const fields = {
        fk_id_user:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        fk_id_product:{
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        quantity:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        tableName: 'carts',
        createdAt: false,
        updatedAt: true
    }

    const Cart = sequelize.define(alias,fields,config);
    
    return Cart;
}