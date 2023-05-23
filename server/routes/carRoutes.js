const express=require('express');

const {
	
	getCars,
	getSingleCar,
	createCar,
	updateCar,
	delCar,
	getDescSort,
    getAescSort,
	
} = require('../controllers/carsController');

const checkToken=require('../middlewares/validateToken');

const router=express.Router();

router.use(checkToken);
router.route('/').get(getCars).post(createCar);
router.route('/desc').get(getDescSort);
router.route('/aese').get(getAescSort);

router.route('/:id').get(getSingleCar).put(updateCar).delete(delCar);



module.exports=router;