"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";
import Link from "next/link";
import { breathe, music, profile, quotes, timer } from "@/utils/Icons";

function Header() {
    const {getUser, user} = useUserContext();
    const {name} = user || {};
    const userId = user?._id ? user._id : '';
    
    return (
    <header className= "px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]">
        <div>
            <h1 className="text-lg font-medium">
                <span role="img" aria-label="wave">

                </span>
                {userId? `Welcome, ${name}` : 'Welcome to Taskfyer' }
            </h1>
            <p className="text-sm">
                {userId ? (
                    <>You have <span className="font-bold text-[#3aafae]">5</span> active tasks
                    </>
                ):(
                    "please login or register to view your tasks"
                )
                }
            </p>
        </div>
        <div className="h-[50px] flex items-center gap-[10.4rem]">
            <button className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
                hover:bg-[#06858C] hover:text-white transition-all duration-200 ease-in-out">
                Create a new task
            </button>
            <div className="flex gap-4 items-center">
                <Link href="https://pomofocus.io/" //to pomodoro timer
                    passHref //Tells Next.js to pass the href to the child 
                    target="_blank" //Opens the link in a new browser tab
                    //prevents new tab from accessing the original window
                    rel="noopener noreferrer"
                    className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg"
                    // border-2 border-[#E6E6E6]
                    > 
                    {timer}
                </Link>

                <Link href="https://www.pexels.com/search/motivational%20quotes/"
                    passHref //Tells Next.js to pass the href to the child 
                    target="_blank" //Opens the link in a new browser tab
                    //prevents new tab from accessing the original window
                    rel="noopener noreferrer"
                    className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg"
                    // border-2 border-[#E6E6E6]
                    > 
                    {quotes}
                </Link>

                <Link href="https://www.youtube.com/playlist?list=PLQkQfzsIUwRaXZ_fgh5CI0t1dnK3u1swz"
                    passHref //Tells Next.js to pass the href to the child 
                    target="_blank" //Opens the link in a new browser tab
                    //prevents new tab from accessing the original window
                    rel="noopener noreferrer"
                    className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg"
                    // border-2 border-[#E6E6E6]
                    > 
                    {music}
                </Link>

                 <Link href=""
                //  https://youtube.com/shorts/_fqr8XNubEI?si=gFJ5jO9eiMKE1L3I"
                    passHref //Tells Next.js to pass the href to the child 
                    target="_blank" //Opens the link in a new browser tab
                    //prevents new tab from accessing the original window
                    rel="noopener noreferrer"
                    className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg"
                    // border-2 border-[#E6E6E6]
                    > 
                    {profile}
                </Link>
            </div>
        </div>
    </header>
    )
}

export default Header