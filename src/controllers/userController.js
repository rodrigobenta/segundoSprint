const db = require('../../database/models')
const dbUser = db.User;
const funciones = {
    list: async (req,res) => {
        try {
            const users = await dbUser.findAll({
                include: [
                    {association: 'user_cart', required: true}
                    //required: true //esto hace un inner join, sino es un left join nomas.
                ],
                attributes: {exclude: ['password']} //excluir atributos
                /*include: [
                {association: "vendedor_venta", required: true},
                {association: "auto_venta", attributes: {exclude: ['vendido','cantidad_puertas']}, required: true}
                ]*/
            })
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send({msg: 'Server error'})
        }
    },

    create: async(req,res) => {

    },

    update: async(req,res) => {

    },

    logicDestroy: async(req,res) => {

    },

    destroy: async(req,res) => {
        
    }
}

module.exports = funciones;