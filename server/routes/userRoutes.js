const express=require('express');

const {registerUser, userlogin, currentUser}=require('../controllers/usersController');

const checkToken=require('../middlewares/validateToken');

const router=express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(userlogin);


router.get('/current', checkToken, currentUser);


module.exports=router;
