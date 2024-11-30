const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config(); 
const cors=require('cors');
const cookieParser=require('cookie-parser');
const userRoutes=require('./routes/user.routes');
const taskRoutes=require('./routes/task.routes');

//cron
const {healthCheckCron,dummyCron}=require('./cron');


const app=express();
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(cookieParser());

//routes
app.use('/user',userRoutes);
app.use('/task',taskRoutes);

const connectDb=async ()=>{
    try {
        const url=process.env.MONGO_URL || 'mongodb://localhost:27017/healthchecker';
        await mongoose.connect(url);
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database',error.message);
    }
}
const PORT=process.env.PORT || 3000;
app.listen(PORT,async()=>{
    await connectDb();
    healthCheckCron();
    //dummyCron();
    console.log('Server is running on port 3000');
});