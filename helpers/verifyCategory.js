const db = require("../database/models");

const verifyCategoryName = async (titulo) => {
    const exist = await db.Category.findOne({ where: { title: titulo} });
    if(exist) throw new Error(`Ya existe una categoria con ese titulo: ${titulo}`);
}

module.exports = { verifyCategoryName };