module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    
    let cols = {
        id_user: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        username: {
            type: dataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        firstname: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        lastname: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        role: {
            type: dataTypes.STRING(50),
            allowNull: true,
            defaultValue: 'guest'
        },
        profilepic: {
            type: dataTypes.STRING(50),
            allowNull: true
        }
    }

    let config = {
        tableName: 'users',
        timestamp: false,
        createdAt: false,
        updatedAt: false,
    }

    const User = sequelize.define(alias,cols,config);

    User.associate = (models) => {

        User.belongsToMany(models.Product,{
            as: 'carts',
            through: 'Cart',
            foreignKey: 'fk_id_user',
            otherkey: 'fk_id_product',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
    }

    return User;
}