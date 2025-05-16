import asyncHandler from "express-async-handler";

export const createTask = asyncHandler(async (req,res) =>{
    res.status(200).json({message: "Create task"})
})