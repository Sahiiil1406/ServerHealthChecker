const {Task}=require('../models/task');

const createTask=async (req,res)=>{
    try {
        const {task,url}=req.body;
        console.log(req.body);
        const newTask=await Task.create({task,url,user:req.user._id});
        return res.status(201).json({task:newTask});
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}
const deleteTask=async (req,res)=>{
    try {
        const {id}=req.params;
        await Task.findByIdAndDelete(id);
        return res.status(200).json({message:'Task deleted successfully'});
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}
const checkHealth=async (req,res)=>{
    try {
        const {id}=req.params;
        const task=await Task.findById(id);
        if(!task){
            return res.status(404).json({error:'Task not found'});
        }
        try {
            const response=await fetch(task.url);
            if(response.status===200){
                task.status='alive';
                await task.save();
                return res.status(200).json({message:'Server is running'});
            }
        } catch (error) {
            task.status='dead';
            await task.save();
            return res.status(200).json({message:'Server is down'});
            
        }
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}
const getMyTask=async(req,res)=>{
    try {
        const tasks=await Task.find({user:req.user._id});
        return res.status(200).json({tasks});
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}


module.exports={
    createTask,
    deleteTask,
    checkHealth,
    getMyTask
}