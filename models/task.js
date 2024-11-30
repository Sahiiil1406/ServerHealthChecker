const mongoose=require('mongoose');
const User=require('./user');

const TaskSchema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enums:['dead','alive'],
        default:'alive'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    url:{
        type:String
    }
},{timestamps:true})

const Task=mongoose.model('Task',TaskSchema);

module.exports={
    Task
}
