"use client";
import { useTasks } from "@/context/taskContext";
//pages/components can get or update user info using useUserContext()
import { useUserContext } from "@/context/userContext";
import useRedirect from "@/hooks/useUserRedirect";
import Filters from "./Components/Filters/Filters";
import TaskItem from "./TaskItem/TaskItem";
import { Task } from "@/utils/types";

export default function Home() {
  useRedirect("/login");

  const {tasks} = useTasks().tasks;

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1> 
        <Filters />
      </div>

      <div className="pb-[2rem] mt-6 grid-cols-[repeat(auto-fill, mimax(300px,1fr))] gap-[1.5rem]">
      { 
      // iterating over our array of tasks and for each we render <TaskItem /> component
        tasks?.map((task: Task, i:number) => (
          <TaskItem key={i} task={task}/>
        ))
      }
      </div>
    </main>
  );
  }
