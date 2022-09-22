const verifyRoleCartList = (req , res, next) => {
    let idDb = Number(req.id);
    let id = Number(req.params.id);
    let role = req.role;
    role = role.toLowerCase();
    if(role === 'guest' && (id !== idDb)) return res.status(401).json({ Mensaje: 'No tienes permisos para ver.' });
    next();
}

module.exports = verifyRoleCartList;