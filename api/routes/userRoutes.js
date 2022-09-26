const express = require('express');
const router = express.Router();
const {login,listUsers, listUserById, createUser, editUserById, deleteUserById,} = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');
const { createUserVerify, verifyRoleList, verifyRoleEdit, editUserVerify, userExists} = require('../middleware/userMiddleware');
const { cartOfId, updateCart } = require('../controllers/cartsControllers');



router.get('/', verifyJWT, verifyRoleList, listUsers); 
router.get('/:id', verifyJWT, verifyRoleList, userExists, listUserById);
router.post('/', createUserVerify, createUser);
router.put('/:id', verifyJWT, verifyRoleEdit, userExists, editUserVerify, editUserById);
router.delete('/:id', verifyJWT, verifyRoleEdit, userExists, deleteUserById);
router.post('/login', login);


//Alias de carts
router.get('/:id/cart', verifyJWT, verifyRoleList , cartOfId);
router.put('/:id/cart', verifyJWT, verifyRoleEdit, updateCart);



router.get('/*', (req,res)=>{
    res.status(400).json({ Mensaje: 'Bad Request.'})
})

router.put('/*', (req,res)=>{
    res.status(400).json({ Mensaje: 'Bad Request.'})
})

router.post('/*', (req,res)=>{
    res.status(400).json({ Mensaje: 'Bad Request.'})
})
router.delete('/*', (req,res)=>{
    res.status(400).json({ Mensaje: 'Bad Request.'})
})

module.exports = router;