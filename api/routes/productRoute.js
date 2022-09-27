const express = require('express');
const {listProduct,listProductByID, listMostWantedProduct, listProductByKeyword, createProduct, editProduct, deleteProduct} = require('../controllers/productController');
const verifyJWT = require('../middleware/verifyJWT');
const {verifyCreate, verifyRoleCreateDelete,verifyRoleEdit, verifyEdit, existProductListVerify, existProductListKeywordVerify, existProductListMostwantedVerify, existProductListByIdVerify, existProductEditVerify, existProductDeleteVerify} = require('../middleware/productMiddleware');
const { listPictures } = require('../controllers/picturesController');
const router = express.Router();


router.get('/', verifyJWT,existProductListVerify, listProduct);
router.get('/search/', verifyJWT,existProductListKeywordVerify, listProductByKeyword);
router.get('/mostwanted', verifyJWT,existProductListMostwantedVerify, listMostWantedProduct);
router.get('/:id/pictures', verifyJWT, listPictures);
router.get('/:id', verifyJWT, existProductListByIdVerify, listProductByID);
router.post('/', verifyJWT, verifyRoleCreateDelete,verifyCreate, createProduct);
router.put('/:idProduct', verifyJWT, verifyRoleEdit,verifyEdit, existProductEditVerify, editProduct);
router.delete('/:id', verifyJWT, verifyRoleCreateDelete,existProductDeleteVerify, deleteProduct);


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