const mongoose=require('mongoose');

const carSchema=mongoose.Schema({
	user_id:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
	name:{type:String, required:true},
	color:{type:String, required:true},
	model:{type:String, required:true},
	maker:{type:String, required:true},
	reg:{type:String, required:true},
	category:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"Category"},
	
},{timestamps:true});

const Car=mongoose.model('Car', carSchema);
module.exports=Car;