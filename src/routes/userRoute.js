const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', userController.list);
// router.post('/', userController.create);
// router.put('/:id', userController.update);
// //router.put('/delete/:id', userController.logicDestroy);
// router.delete('/:id', userController.destroy);

module.exports = router;