const asyncHandler=require('express-async-handler');
const Category=require('../models/Category');

const getCategory=asyncHandler(async(req,res)=>{
	const categories=await Category.find({user_id:req.user.id});
	res.status(200).json(categories);
});

const getSingleCategory=asyncHandler(async(req,res)=>{
	const category=await Category.findById(req.params.id);
	res.status(200).json(category);
});

const createCategory=asyncHandler(async(req,res)=>{
	const {name}=req.body;
	if(name==null){
		res.status(404);
		throw new Error("Not Found");
	}
	
	const category=await Category.create({
		name,
		user_id:req.user.id
	});
	
	res.status(200).json(category);
	
});


const updateCategory=asyncHandler(async(req,res)=>{
	const category=await Category.findById(req.params.id);
	if(!category){
		res.status(404);
		throw new Error("Not Found");
	}
	
	if(category.user_id.toString() !== req.user.id){
		res.status(403);
		throw new Error("not permissible");
	}
	
	const categoryUpdate=await Category.findByIdAndUpdate(
	  req.params.id,
	  req.body,
	  {new:true}
	);
	
	res.status(200).json(categoryUpdate);
});

const delCategory=asyncHandler(async(req,res)=>{
	const category=await Category.findById(req.params.id);
	if(!category){
		res.status(404);
		throw new Error("Not Found");
	}
	if(category.user_id.toString() !== req.user.id){
		res.status(403);
		throw new Error("not permissible");
	}
	
	await Category.deleteOne({_id:req.params.id});
	res.status(200).json(category);
});



module.exports={
	getCategory,
	getSingleCategory,
	createCategory,
	updateCategory,
	delCategory,	
}



