const asyncHandler=require('express-async-handler');
const Car=require('../models/Car');

const getCars=asyncHandler(async(req,res)=>{
	const cars=await Car.find({user_id:req.user.id});
	res.status(200).json(cars);
});

const getSingleCar=asyncHandler(async(req,res)=>{
	const car=await Car.findById(req.params.id);
	res.status(200).json(car);
});

const createCar=asyncHandler(async(req,res)=>{
	const {name, color, model, maker, reg, category}=req.body;
	if(name==null || color==null || model==null || maker==null || reg==null || category==null){
		res.status(404);
		throw new Error("Not Found");
	}
	
	const car=await Car.create({
		user_id:req.user.id,
		name,
		color,
		model,
		maker,
		reg,
		category
	});
	
	res.status(200).json(car);
	
});


const updateCar=asyncHandler(async(req,res)=>{
	const car=await Car.findById(req.params.id);
	if(!car){
		res.status(404);
		throw new Error("Not Found");
	}
	
	if(car.user_id.toString() !== req.user.id){
		res.status(403);
		throw new Error("not permissible");
	}
	
	const carUpdate=await Car.findByIdAndUpdate(
	  req.params.id,
	  req.body,
	  {new:true}
	);
	
	res.status(200).json(carUpdate);
});

const delCar=asyncHandler(async(req,res)=>{
	const car=await Car.findById(req.params.id);
	if(!car){
		res.status(404);
		throw new Error("Not Found");
	}
	if(car.user_id.toString() !== req.user.id){
		res.status(403);
		throw new Error("not permissible");
	}
	
	await Car.deleteOne({_id:req.params.id});
	res.status(200).json(car);
});


const getDescSort=asyncHandler(async(req,res)=>{
	const cars=await Car.find().sort({createdAt:-1});
	res.status(200).json(cars);
});
const getAescSort=asyncHandler(async(req,res)=>{
	const cars=await Car.find().sort({createdAt:1});
	res.status(200).json(cars);
});


module.exports={
	getCars,
	getSingleCar,
	createCar,
	updateCar,
	delCar,
    getDescSort,
    getAescSort,	
}



