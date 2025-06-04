import { useTasks } from '@/context/taskContext';
import { edit, star, trash } from '@/utils/Icons';
import { Task } from '@/utils/types';
import { formatTime } from '@/utils/utilities';
import moment from 'moment-timezone';
import React from 'react';

interface TaskItemProp{
    task: Task;
}

function TaskItem({task}: TaskItemProp){

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "low":
                return "text-green-500";
            case "medium":
                return "text-yellow-500";
            case "high":
                return "text-red-500";       
            default:
                return "text-red-500";;
        }
    };

    const {getTask, openModalForEdit, deleteTask, modalMode} = useTasks();

    return (
    <div className='h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white'>
                <div>
                    <h4 className='font-bold text-2xl'>{task.title}</h4>
                    <p>{task.description}</p>
                </div>
                <div className='mt-auto flex justify-between item.center'>
                    <p className='text-sm text-gray-400'>
                        {formatTime(task.createdAt)}
                         {/* <br />Due Date:{moment(task.dueDate).tz("Asia/Kolkata").format("DD/MM/YYYY hh:mm A")} */}
                    </p>                
                    <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                    </p>
                        <div className='flex items-center gap-3 text-gray-400 text-[1.2rem]'>

                            <button className={`${task.completed ? "text-yellow-400" : "text-gray-400"}`}>
                                {star}
                            </button>

                            <button className='text-[#00a1f1]'
                            onClick={() => {
                                getTask(task._id);
                                openModalForEdit(task);
                            }}
                            >
                                {edit}
                            </button>

                            {/* delete button */}
                            <button className='text-[#f65314]'
                            onClick={() => {
                                const confirmed = window.confirm("Are you sure you want to delete this task?");
                                if (confirmed) {
                                deleteTask(task._id);
                                }
                            }}
                            >{trash}
                            </button>

                        </div>
                </div>
        </div>
    )
}

export default TaskItem;