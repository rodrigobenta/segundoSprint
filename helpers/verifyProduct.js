const db = require("../database/models");

const verifyTitle = async (title) => {
    const exist = await db.Product.findOne({
        where: {title: title}
    });
    if (exist) throw new Error(`el title ${title} ya se encuentra en uso`);
}

const verifyCategory = async (fk_id_category) => {
    const exist = await db.Category.findOne({ where: { id_category: fk_id_category} })
    if(!exist) throw new Error(`No existe ese id de category.`)
}

module.exports = { verifyTitle, verifyCategory };