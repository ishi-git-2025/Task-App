import asyncHandler from "express-async-handler";
import TaskModel from "../../models/task/TaskModel.js";

//create task func
export const createTask = asyncHandler(async (req,res) =>{

 try {
    const { title, description, dueDate, priority, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required!" });
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({ message: "Description is required!" });
    }

    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id, //after we get the data from auth middleware, we are sending logged in user id to db
    });

    await task.save();

    return res.status(201).json(task);
  }
   catch (error) {
    console.log("Error in createTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

//get all tasks
export const getTasks = asyncHandler(async (req,res) =>{
  try {
    const userId = req.user._id;
    
    if(!userId){
      return res.status(400).json({message:"user not found!"})
    }
    //returing the data or tasks for that user
    const tasks = await TaskModel.find({ user: userId}) //where user matches the current logged in user _id
    return res.status(200).json({
      length:tasks.length,
       tasks})

  } catch (error) {
     console.log("Error in getTasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

//to get one specific task and edit it
export const getTask = asyncHandler(async (req,res) =>{
  try {
    const userId = req.user._id;
    const {id} = req.params;  //uses object destructuring to extract the id from task/:id

    if(!id){
      return res.status(400).json({message:"Please provide a task id"}) //If no id was provided in the route
    }

    const task = await TaskModel.findById(id);
    
    if (!task){
     return res.status(404).json({message:"Task not found for the given id!"})
    }

    if(!task.user.equals(userId)){ //if not the currently logged-in user
      return res.status(401).json({message:"Not authorized to view this task"})
    }

    res.status(200).json(task);
  } catch (error) {
         console.log("Error in getTask: ", error.message);
   return  res.status(500).json({ message: error.message });
  }
});

//to update task
export const updateTask = asyncHandler(async (req,res) => {
  try {
    const userId = req.user._id;

    const {id} = req.params;
    const {title, description, dueDate, priority, status, completed }= req.body;

    if(!id){
      return res.status(400).json({message : "please provide a task id"})
    }

    const task = await TaskModel.findById(id);

     if (!task){
     return res.status(404).json({message:"Task not found for the given id!"})
    }

    if(!task.user.equals(userId)){ //if not the currently logged-in user
      return res.status(401).json({message:"Not authorized to update this task"})
    }

    //update the task with the new data if provided || keep the old data
    task.title = title || task.title; 
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed || task.completed;

    await task.save()
    return res.status(200).json(task);
  } catch (error) {
    console.log("Error in updateTask: ", error.message);
    return  res.status(500).json({ message: error.message });
  }
});

//delete the task
export const deleteTask = asyncHandler(async (req,res) => {
  try {
      const userId = req.user._id;
      const {id} = req.params; //to access route parameters
      
    const task = await TaskModel.findById(id); //same as TaskModel.findOne({ _id: id })

    if (!task){
     return res.status(404).json({message:"Task not found for the given id!"})
    }
    
    if(!task.user.equals(userId)){ //if not the currently logged-in user
      return res.status(401).json({message:"Not authorized to delete this task"})
    }

    await TaskModel.findByIdAndDelete(id); //deleting the task from db

    return res.status(200).json({message:"Task deleted successfully!"});

  } catch (error) {
    console.log("Error in deleteTask: ", error.message);
    return  res.status(500).json({ message: error.message });
  }
  
});