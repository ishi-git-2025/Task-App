"use client";
import { useUserContext } from "@/context/userContext";
import Reacr from "react";
import Image from "next/image";
import next from "next";

function Profile(){
const {getUser, user} = useUserContext();
// const userId = user?._id ? user._id : '';

return <div className="m-6">
        {/* user name */}
        <div className="px-2 py-4 flex items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.8rem]
              hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer 
              border-2 border-transparent hover:border-2 hover:border-white">
            <div>
            <Image
            src={user?.photo}
            alt="avatar"
            width={70}
            height={70}
            className="rounded-full"
            ></Image>
            </div>
            <div>
                <h1 className="flex flex-col text-xl">
                    <span className="font-medium">Hello, </span>
                    <span className="font-bold">{user?.name} </span>
                </h1>
            </div>
        </div>
        {/* task numbers */}
        <div className="mt-6 flex flex-col gap-8"> 
            <div className="grid grid-cols-2 gap-4">
                <div className="text-gray-400">
                    <p>Total tasks:</p>
                    <p className="pl-4 relative flex gap-2">
                        <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
                        <span className="font-medium text-4xl text-[#333]"> 6
                            {/* {tasks.length} */}
                        </span>
                    </p>
                </div>
                 <div className="text-gray-400">
                    <p>In progress:</p>
                    <p className="pl-4 relative flex gap-2">
                        <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-pink-300 rounded-[5px]"></span>
                        <span className="font-medium text-4xl text-[#333]"> 1
                            {/* {tasks.length} */}
                        </span>
                    </p>
                </div>
                 <div className="text-gray-400">
                    <p>Open tasks:</p>
                    <p className="pl-4 relative flex gap-2">
                        <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-orange-400 rounded-[5px]"></span>
                        <span className="font-medium text-4xl text-[#333]"> 2
                            {/* {tasks.length} */}
                        </span>
                    </p>
                </div>
                 <div className="text-gray-400">
                    <p>Completed:</p>
                    <p className="pl-4 relative flex gap-2">
                        <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-green-400 rounded-[5px]"></span>
                        <span className="font-medium text-4xl text-[#333]"> 3
                            {/* {tasks.length} */}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <h3 className="mt-8 font-medium">Activity</h3>
    </div>
}

export default Profile;