const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt');
const User=require('../models/User');
const jwt=require("jsonwebtoken");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.urasaapi.com',
  port: 465,
  secure: true, // Set to true if using a secure connection (e.g., TLS)
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD
  }
});





const registerUser=asyncHandler(async(req,res)=>{
	
	const {username, email}=req.body;
	
	const user=await User.findOne({email});
	if(user){
		res.status(400);
		throw new Error("Email Already Registered");
	}
	
	if(username==null||email==null){
		res.status(400);
		throw new Error('Not Found');
	}
	const randomPassword = generateRandomPassword(12);
	
	
	
	
	const hashedPassword=await bcrypt.hash(randomPassword, 10);
	
	const createUser=await User.create({
		username, email, password:hashedPassword
	});
transporter.sendMail({
  from: process.env.MAIL,
  to: email,
  subject: 'Welcome',
  text: `Thanks for registration. Your account ${email} password is ${randomPassword}`
		
		
	}, (error, info) => {
  if (error) {
    console.log('Error occurred:');
    console.log(error.message);
  } else {
    console.log('Email sent successfully!');
    console.log('Message ID: ', info.messageId);
  }
});
	
	res.status(200).json({message:"user registered"});
	
});

const userlogin=asyncHandler(async(req,res)=>{
	const {email, password}=req.body;
	
	if(!email || !password){
		res.status(400);
		throw new Error("All Fields Are Manadatery");
	}
	
	const user=await User.findOne({email});
	if(user && bcrypt.compare(password, user.password)){
		const accessToken=jwt.sign({
			user:{
				username:user.username,
				email:user.email,
				id:user.id
			}
		},
		process.env.ACCESS_TOKEN,
		{expiresIn:"180m"}
		);
		
		res.status(200).json({accessToken});
		
	}else{
		res.status(401);
		throw new Error("Email or Password is not correct");
	}
	
});

const currentUser=asyncHandler(async(req,res)=>{
	res.status(200).json(req.user);
});


function generateRandomPassword(length = 10) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
  const charactersLength = characters.length;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    password += characters.charAt(randomIndex);
  }

  return password;
}

module.exports={
	registerUser,
	userlogin,
	currentUser
}