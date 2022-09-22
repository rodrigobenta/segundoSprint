const express = require('express');
const verifyJWT  = require('../middleware/verifyJWT');
const {listPictures, listPictureById, createPicture, editPicture, deletePicture} = require('../controllers/picturesController');
const { verifyCreateEditPictures, verifyRoleEditPicture } = require('../middleware/picturesMiddelware');
const router = express.Router();


router.get('/', /* verifyJWT, */ listPictures);
router.get('/:id' , /* verifyJWT, */listPictureById);
router.post('/',/* verifyJWT, */ verifyRoleEditPicture ,verifyCreateEditPictures ,createPicture);
router.put('/:id',/* verifyJWT,  */verifyRoleEditPicture ,verifyCreateEditPictures ,editPicture);
router.delete('/:id',/* verifyJWT, */ verifyRoleEditPicture ,deletePicture);



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