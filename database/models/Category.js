module.exports = (sequelize, dataTypes) => {
    const alias = "Category";

    const fields = {
        id_category:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type: dataTypes.STRING(50),
            unique: true,
            allowNull: false
        }
    }

    const config = {
        tableName: "categories",
        timpestamps: false,
        createdAt: false,
        updatedAt: false
        }

    const Category = sequelize.define(alias,fields,config);

        Category.associate = (models) => {
            Category.hasMany(models.Product,{
                as: 'product_category',
                foreignKey: 'fk_id_category',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            })
        }

    return Category;
}