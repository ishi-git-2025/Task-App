"use client";
import { useTasks } from "@/context/taskContext";
//pages/components can get or update user info using useUserContext()
import { useUserContext } from "@/context/userContext";
import useRedirect from "@/hooks/useUserRedirect";
import { Task } from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import Filters from "../Components/Filters/Filters";
import TaskItem from "../Components/TaskItem/TaskItem";

export default function Home() {
  useRedirect("/login");

  const {tasks, openModalForAdd, priority, activeTasks} = useTasks();

  const filtered = filteredTasks(activeTasks, priority);

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Pending Tasks</h1> 
        <Filters />
      </div>

      <div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
      { 
      // iterating over our array of tasks and for each we render <TaskItem /> component
        filtered.map((task: Task, i:number) => (
          <TaskItem key={i} task={task}/>
        ))
      }

      <button className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}>
        Add new task
      </button>
      </div>
    </main>
  );
  }
