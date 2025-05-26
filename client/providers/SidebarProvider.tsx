"use client";
import Sidebar from '@/app/Components/Sidebar/Sidebar';
import { useUserContext } from '@/context/userContext';
import React from 'react';

function SidebarProvider(){
    const {getUser, user} = useUserContext();
    const userId = user?._id ? user._id : '';
    // const userId= useUserContext().user._id;
    return <>
    {userId && <Sidebar />}
    </>
}

export default SidebarProvider