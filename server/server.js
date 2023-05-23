const express=require('express');
const dotenv=require('dotenv').config();
const connectDB=require('./config/dbConnection');
const cors=require('cors');

connectDB();
const app=express();

//middlewares
app.use(express.json());
app.use(cors());
//routers
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));

const port=process.env.PORT || 8001;
app.listen(port, ()=>{
	console.log(`localhost:${port}`);
});