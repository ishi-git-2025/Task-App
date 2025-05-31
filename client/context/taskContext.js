import React, { Children, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "./userContext";

const TasksContext = createContext();

const serverUrl = "http://localhost:8000/api/v1";

export const TasksProvider = ({children}) => {

    const {getUser, user} = useUserContext();
    const userId = user?._id ? user._id : '';

    const [tasks, setTasks] = React.useState([]); // array to store all tasks
    const [loading, setLoading] = React.useState(false); // boolean to track if something is loading
    const [task, setTask] = React.useState({}); //single task object
    
    const [priority, setPriority] = React.useState("All");

    //get tasks
    const getTasks = async() => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/tasks`,{withCredentials: true});
            
            setTasks(response.data);
        } catch (error) {
          console.log("error getting tasks",error);
        }
        setLoading(false);
    };

    //get task (individual)
    const getTask = async (taskId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/task/${taskId}`,{withCredentials: true});
            setTask(response.data);

        } catch (error) {
            console.log("error getting one task",error);
        }
        setLoading(false)
    };

    const createTask = async (task) => {
        setLoading(true);
        try {
            const res = await axios.post(`${serverUrl}/task/create`, task, {withCredentials: true});
            setTasks([...tasks, res.data]);//getting the prev data and then adding new data

        } catch (error) {
            console.log("error creating task",error);
        }
        setLoading(false)
    };

    //update the tasks
    const updateTask = async (task) => {
        setLoading(true);
          try {
            const res = await axios.patch(`${serverUrl}/task/${task._id}`, task, {withCredentials: true});
            
            //update the task in the tasks array
            const newTasks = tasks.map((tsk) =>{
                return tsk._id === res.data._id ? res.data : tsk ; //if matched the id then new data otherwise old task
            });
            
            setTasks(newTasks);
        } catch (error) {
            console.log("error updating task",error);
        }
        setLoading(false)
    };

    //delete tasks
    const deleteTask = async(taskId) =>{
        try {
            await axios.delete(`${serverUrl}/task/${taskId}`,{withCredentials: true});

            //remove task from the tasks array by keeping only the tasks whose _id is not equal to the deleted one
            const newTasks = tasks.filter((tsk) => tsk._id !== taskId);
            setTasks(newTasks);

        } catch (error) {
            console.log("error deleting task",error);
        }
    };

    useEffect(() => {
        getTasks();
        getTask("6828d4069b67ba367e4435b5");
    }, [userId]);

    //The Provider wraps its children and shares the value with any component that wants to use them
    return(
        <TasksContext.Provider value={{
            tasks,
            setTasks,
            loading,
            task,
            getTask,
            createTask,
            updateTask,
            deleteTask,
            priority,
            setPriority
        }}>
            {children}
        </TasksContext.Provider>
    )
};

export const useTasks = () => { //custom hook so instead of writing useContext(TasksContext) every time, we use useTasks()
    return React.useContext(TasksContext);
}