const express = require('express');
const {listProduct,listProductByID, listMostWantedProduct, listProductByKeyword, createProduct, editProduct, deleteProduct} = require('../controllers/productController');
const verifyJWT = require('../middleware/verifyJWT');
const {verifyCreateEdit, verifyRoleCreateDelete,verifyRoleEdit} = require('../middleware/productMiddleware');
const { listPictures } = require('../controllers/picturesController');
const router = express.Router();


router.get('/', /* verifyJWT, */ listProduct);
router.get('/search/', /* verifyJWT, */ listProductByKeyword);
router.get('/mostwanted', /* verifyJWT, */ listMostWantedProduct);
router.get('/:id/pictures', /* verifyJWT, */ listPictures);
router.get('/:id', /* verifyJWT, */ listProductByID);
router.post('/', /* verifyJWT, */ verifyRoleCreateDelete, verifyCreateEdit, createProduct);
router.put('/:idProduct', /* verifyJWT, */ verifyRoleEdit, editProduct);
router.delete('/:id', /* verifyJWT, */ verifyRoleCreateDelete, deleteProduct);



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