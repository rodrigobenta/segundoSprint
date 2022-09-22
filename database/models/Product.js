
module.exports = (sequelize, dataTypes) => {
    const alias = 'Product';

    const fields = {
        id_product:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type: dataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        description:{
            type: dataTypes.STRING(50)
        },
        category:{
            type: dataTypes.STRING(50)
        },
        mostwanted:{
            type: dataTypes.TINYINT(1)
        }
    }

    let config = {
        tableName: 'products',
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }

    const Product = sequelize.define(alias, fields, config);

    Product.associate = (models) => {
        Product.hasMany(models.Picture,{
            as: 'product_picture',
            foreignKey: 'fk_id_product'
        })
        Product.belongsToMany(models.Cart,{
            as: 'cart_product',
            through: 'Cart_Product',
            foreignKey: 'fk_id_product',
            otherKey: 'fk_id_cart',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        })
    }


    return Product;
}