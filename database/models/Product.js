
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
        price:{
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        description:{
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
            as: 'pictures',
            foreignKey: 'fk_id_product'
        })
        Product.belongsToMany(models.User,{
            as: 'user_product',
            through: 'Cart',
            foreignKey: 'fk_id_product',
            otherKEY: 'fk_id_user',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        })
        Product.belongsTo(models.Category,{
            as: "category",
            foreignKey: 'fk_id_category',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        })
    }
    return Product;
}