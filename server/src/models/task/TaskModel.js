import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
         required: [true, "Please provide a title"],
      unique: true,
    },
     description: {
      type: String,
      default: "No description",
    },
    dueDate:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
        enum:["active","inactive"],
        default:"active"
    },
    completed:{
        type: Boolean,
        default: false,
    },

    priority:{
        type: String,
        emun:["low", "medium","high"],
        default:"low"
    },

    user:{
        type:mongoose.Schema.ObjectId,
        ref: "User", //referencing the 'User' model
        required:true
    }
},{timestamps:true})

const TaskModel = mongoose.model("task", TaskSchema);
export default TaskModel;