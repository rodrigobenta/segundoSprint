module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id_usuario: {
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
            type: dataTypes.STRING(50),
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
        profilepic: {
            type: dataTypes.STRING(50),
            allowNull: false
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
        User.belongsTo(models.Cart, {
            as: 'cart_user',
            foreignKey: 'fk_id_cart',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    }


    return User;
}