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
    // Cart.associate = (models) => {
    //     Cart.hasMany(models.Product,{
    //         as: 'product_cart',
    //         foreignKey: 'fk_id_product',
    //         onUpdate: 'CASCADE',
    //         onDelete: 'RESTRICT'
    //     })
    //     Cart.hasOne(models.User,{
    //         as: 'user_cart',
    //         foreignKey: 'fk_id_user',
    //         onUpdate: 'CASCADE',
    //         onDelete: 'RESTRICT'
    //     })
    // }


    return Cart;
}