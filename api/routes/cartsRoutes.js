const express = require('express');
const router = express.Router();
const {cartOfId, updateCart} = require('../controllers/cartsControllers');
const verifyRoleCartList = require('../middleware/cartListMiddleware');
const { verifyRoleEdit } = require('../middleware/userMiddleware');
const verifyJWT = require('../middleware/verifyJWT');


router.get('/:id', verifyJWT, verifyRoleCartList, cartOfId);
router.put('/:id', verifyJWT, verifyRoleEdit , updateCart);




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