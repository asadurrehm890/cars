const express=require('express');

const {
	
	getCategory,
	getSingleCategory,
	createCategory,
	updateCategory,
	delCategory,
	
} = require('../controllers/categoryControllers');

const checkToken=require('../middlewares/validateToken');

const router=express.Router();

router.use(checkToken);
router.route('/').get(getCategory).post(createCategory);
router.route('/:id').get(getSingleCategory).put(updateCategory).delete(delCategory);


module.exports=router;