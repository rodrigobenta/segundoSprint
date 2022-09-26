const db = require('../database/models')

const verifyEmail = async (email) => {
   const exist = await db.User.findOne({
      where: { email: email }
   });
   if (exist) {
      throw new Error(`El email ${email} ya se encuentra registrado`);
   }
}
const verifyUsername = async (username) => {
   const exist = await db.User.findOne({
      where: { username: username }
   });
   if (exist) {
      throw new Error(`El username ${username} ya se encuentra registrado`);
   }
}

module.exports = {verifyEmail,verifyUsername};