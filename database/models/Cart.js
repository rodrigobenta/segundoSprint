
module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';

    let fields = {
        id_cart: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    }

    let config = {
        tableName: 'carts',
        timestamp: false,
        createdAt: false,
        updatedAt: false
    }

    const Cart = sequelize.define(alias, fields, config);

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {
            as: 'cart_user',
            foreignKey: 'fk_id_usuario',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
        Cart.belongsToMany(models.Product,{
            as: 'product_cart',
            through: 'Cart_Product',//aca va el alias..
            foreignKey: 'fk_id_cart',
            otherKey: 'fk_id_producto',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        })
    }

    return Cart;
}