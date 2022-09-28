const express = require('express');
const { listCategory, listCategoryID, createCategory, deleteCategoryById, editCategory } = require('../controllers/categoryController');
const {verifyCreateCategory, existListCategory, existEditCategory, existDeleteCategory} = require("../middleware/categoryMiddelware");
const {verifyRoleEditPicture} = require("../middleware/picturesMiddelware")
const verifyJWT  = require('../middleware/verifyJWT');
const router = express.Router();



router.get('/', verifyJWT, existListCategory, listCategory);
router.get('/:id' , verifyJWT, existListCategory ,listCategoryID);
router.post('/',verifyJWT, verifyRoleEditPicture, verifyCreateCategory ,createCategory);
router.delete('/:id',verifyJWT, verifyRoleEditPicture, existDeleteCategory ,deleteCategoryById);
router.put('/:id',verifyJWT, verifyRoleEditPicture, existEditCategory ,editCategory);


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