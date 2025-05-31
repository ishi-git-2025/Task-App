import React from "react";
import { useTasks } from "@/context/taskContext";

function Filters(){
    const {priority, setPriority} = useTasks();

    const [activeIndex, setActiveIndex] = React.useState(0);

    const priorities = ["All", "Low", "Medium", "High"];

    return (
    <div className="relative h-10 py-2 px-2 grid grid-cols-4 items-center gap-3 bg-[#F9F9F9] border-2 border-white rounded-md">        

        <span
        className="absolute left-[5px] bg-[#EDEDED] rounded-md transition-all duration-300"
        style={{
        //Sets the width to 1/4th of the parent, - 10px total gap (5+5)
          width: "calc(100% / 4 - 10px)",
          // 5px at top 5px at bottom
          height: "calc(100% - 10px)",
          // Vertically centers the span relative to its container
          top: "50%",
          //eg 2*100 so moves 200% away on x, -50% keeps it vertically centered
          transform: `translate(calc(${activeIndex * 100}% + ${activeIndex * 10}px), -50%)`,
           //using a custom easing curve
          transition: "transform 300ms cubic-bezier(.95,.03,1,1)",
        }}></span>

        {/* logic for prioroties here */}
        {priorities.map((priority, index) => (
            <button 
            key={index}
            className={`relative px-1 z-10 font-medium text-sm 
                ${activeIndex === index ? "text-[#3aafae]" : "text-gray-500"}`}
            onClick={() => {setActiveIndex(index);
                setPriority(priority.toLowerCase());
            }}>
                {priority}
            </button>
        ))}
    </div>
    )
}

export default Filters;