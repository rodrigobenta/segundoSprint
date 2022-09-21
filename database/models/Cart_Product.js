module.exports = (sequelize, dataTypes) => {
    const alias = 'Cart_Product';

    const fields = {
        quantity:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        tableName: 'cart_products',
        createdAt: false,
        updatedAt: true
    }

    const Cart_Product = sequelize.define(alias,fields,config);

    return Cart_Product;
}