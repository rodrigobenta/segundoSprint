
module.exports = (sequelize, dataTypes) => {

    const alias = 'Picture';

    const fields = {
        id_picture:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        url:{
            type: dataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        description:{
            type: dataTypes.STRING(50)
        },
        fk_id_product:{
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: 'pictures',
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }

    const Picture = sequelize.define(alias, fields, config);    

    Picture.associate = (models) => {
        Picture.belongsTo(models.Product,{
            as: 'product_picture',
            foreignKey: 'fk_id_product'
        })
    }

    return Picture;
}