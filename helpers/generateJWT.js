const jwt = require('jsonwebtoken');
//variable   = process.env.variableArchivoEnv
const passwd = process.env.JWT_PASS;

const generateJWT = (payload) => {
   return new Promise((resolve, reject) => {
      jwt.sign(payload, process.env.JWT_PASS, {
         expiresIn: '1h',
         algorithm: 'HS512'
      }, (err, token) => {
         if (err) {
            reject('No se pudo crear el token')
         }
         resolve(token);
      })
   })
}

module.exports = generateJWT;