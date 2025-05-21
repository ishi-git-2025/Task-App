"use client";
//pages/components can get or update user info using useUserContext()
import { useUserContext } from "@/context/userContext";
import { useState } from "react";

export default function Home() {

  const {logoutUser} = useUserContext();
  // const name ="Ishita";

  return (
  <main>
  </main>
  );
    
  }
