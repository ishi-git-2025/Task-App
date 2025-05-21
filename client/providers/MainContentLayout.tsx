"use client";
import { useUserContext } from '@/context/userContext';
import React from 'react'

interface  MainContentLayoutProps{
    children: React.ReactNode;
}

function MainContentLayout({children}: MainContentLayoutProps){ //wrapper component
    const userId = useUserContext().user?._id; //getting logged in user's user id
    return (
      <main className={`${userId ? "pr-[20rem]" : ""} pb-[1.5rem] flex h-full`}>
         {children}
        </main>)
}
export default MainContentLayout;