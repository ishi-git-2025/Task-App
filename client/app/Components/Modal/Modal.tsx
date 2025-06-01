"use client";
import { useTasks } from "@/context/taskContext";
import useDetectOutside from "@/hooks/useDetectOutside";
import React, { useEffect } from "react";

function Modal(){

    const {task, handleInput, createTask, isEditing, setIsEditing, closeModal, modalMode,
        activeTask, updateTask
    } = useTasks();
    const ref = React.useRef(null); //creates a reference object

    //use the hook to detect clicks outside the modal
    useDetectOutside({
        ref, 
        callback: () => {
        if (isEditing) {
            closeModal();
        }
    }});

    //for editing a task
    useEffect(() => {
        if(modalMode === 'edit' && activeTask){
            handleInput("setTask")(activeTask)
        }
    }, [modalMode, activeTask]);

    //e is the event object and is specifically a FormEvent that comes from a <form> element.
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(modalMode === "edit"){
            updateTask(task);
        } else if (modalMode === "add"){
            createTask(task)
            //task will contain the updated task state
        }

        closeModal();
    };

    return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
        <form 
        action=""
        className="py-6 px-6 max-w-[520px] w-full flex flex-col gap-4 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
        onSubmit={handleSubmit}
        ref={ref} //ref will point to this div after render
        >

            <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="absolute top-2 p-2 right-2 text-gray-500 hover:text-black"
            >✕</button>

            <div className="flex flex-col gap-1">
                <label htmlFor="title">Title</label>
                <input
                className="bg-[#f9f9f9] p-2 rounded-md border border-[#dfe1e6]"
                type="text"
                id="title"
                placeholder="Task title"
                name="title"
                value={task.title || ""}
                onChange={(e) => handleInput("title")(e)}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="description">Description</label>
                <textarea
                className="bg-[#f9f9f9] p-2 rounded-md border border-[#dfe1e6] resize-none"
                name="description"
                placeholder="Task description"
                rows={4}
                value={task.description || ""}
                onChange={(e) => handleInput("description")(e)}
                />
            </div>

            <div className="flex flex-col gap-1">
            <label htmlFor="priority">Select Priority</label>
            <select
                className="bg-[#F9F9F9] p-2 rounded-md border border-[#dfe1e6] cursor-pointer"
                name="priority"
                value={task.priority}
                onChange={(e) => handleInput("priority")(e)}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            </div>

            <div className="flex flex-col gap-1">
            <label htmlFor="dueDate">Due Date</label>
            <input
                className="bg-[#F9F9F9] p-2 rounded-md border border-[#dfe1e6] hover:bg-gray-100"
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={(e) => handleInput("dueDate")(e)}
            />
            </div>
            
            <div className="flex flex-col gap-1">
            <label htmlFor="completed">Task Completed</label>
            <div className="flex items-center justify-between bg-[#F9F9F9] p-2 rounded-md border border-[#dfe1e6]">
                <label htmlFor="completed">Completed</label>
                    <div>
                    <select
                        className="bg-[#F9F9F9] p-2 rounded-md border border-[#dfe1e6] cursor-pointer"
                        name="completed"
                        value={task.completed ? "true" : "false"}
                        onChange={(e) => handleInput("completed")(e)}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <button 
                type="submit"
                className={`text-white py-2 rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out
                    ${modalMode === 'edit'? "bg-blue-400" : "bg-green-400"}`}
                >
                {modalMode === 'edit' ? "Update Task": "Create Task"}
                </button>
            </div>

        </form>
    </div>
    );
}

export default Modal;