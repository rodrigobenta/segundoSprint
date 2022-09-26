const express = require('express');
const { listCategory, listCategoryID, createCategory, deleteCategoryById, editCategory } = require('../controllers/categoryController');
const { verifyRoleEditPicture } = require("../middleware/picturesMiddelware")
const verifyJWT  = require('../middleware/verifyJWT');
const router = express.Router();




router.get('/', verifyJWT, listCategory);
router.get('/:id' , verifyJWT,listCategoryID);
router.post('/',verifyJWT, verifyRoleEditPicture ,  createCategory);
router.delete('/:id',verifyJWT, verifyRoleEditPicture ,  deleteCategoryById);
router.put('/:id',verifyJWT, verifyRoleEditPicture ,  editCategory);








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