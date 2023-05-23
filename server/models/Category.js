const mongoose=require('mongoose');

const categorySchema=mongoose.Schema({
	user_id:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
	name:{type:String, required:true},
},{timestamps:true});

const Category=mongoose.model('Category', categorySchema);
module.exports=Category;	
