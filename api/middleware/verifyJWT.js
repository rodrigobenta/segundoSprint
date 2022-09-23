const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    try {
        let bearer = req.headers.authorization;
        let index = bearer.indexOf(' ');
        if(index == -1) res.status(500).json({msg: 'Usuario o contraseña incorrectos'})
        else bearer = bearer.substring(index+1,bearer.length);
        const token = bearer;
        const payload = jwt.verify(token, process.env.JWT_PASS);
        req.role = payload.role; //asignamos role al request para pasarlo a la proxima funcion
        req.id = payload.id_user; //asignamos id al request para pasarlo a la proxima funcion. id_user se extrae del token.
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token invalido"
        })
    }
}

module.exports = verifyJWT;