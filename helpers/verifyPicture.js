const db = require("../database/models")


const verifyUrl = async (url) => {
    const exist = await db.Picture.findOne({
        where: {url: url}
    });
    if (exist) throw new Error(`la url ${url} ya se encuentra en uso`)
}

module.exports = {
    verifyUrl
}