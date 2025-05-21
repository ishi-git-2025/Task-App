"use client";
//reusable SVG icon component
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconGrid from "@/public/icons/IconGrid";
import IconStopwatch from "@/public/icons/IconStopwatch";
import { title } from "process";
import React from "react";
import { usePathname } from "next/navigation";
import IconCheck from "@/public/icons/ICheck";
import Link from "next/link";
import IconDeleteAll from "@/public/icons/IconDeleteAll";

function MiniSidebar() {

      const pathname = usePathname();

    const getStrokeColor = (link: string) => { //if the path is home page show the color 1
    return pathname === link ? "#3aafae" : "#71717a";
  };

    const navItems = [
        {
            icon: <IconGrid strokeColor={getStrokeColor("/")}/>,
            title: 'All',
            link: '/',
        },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    }
    ]
    return ( 
    <div className="basis-[5rem] flex flex-col bg-[#f9f9f9]"> 
        <div className="flex items-center justify-center h-[5rem]">
            <img src="/logo.png" width={28} height={28} alt="logo" />
        </div>

        <div className="mt-8 flex-1 flex flex-col items-center justify-between">
            <ul className="flex flex-col gap-10">
                {navItems.map((items, index) => (
                    <li key={index} className="relative group">
                        <Link href={items.link}>{items.icon}</Link>
                        {/* Hover Tooltip */}
                        <span className="u-triangle absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {items.title}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mb-[1.5rem]">
              <button className="w-12 h-12 flex justify-center items-center border-2 border-[#EB4E31]  p-2 rounded-full">
                <IconDeleteAll strokeColor="#EB4E31"/>
              </button>
            </div>

        </div>
    </div> );
}

export default MiniSidebar