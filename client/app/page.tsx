"use client";
//pages/components can get or update user info using useUserContext()
import { useUserContext } from "@/context/userContext";
import useRedirect from "@/hooks/useUserRedirect";
// import { useState } from "react";

export default function Home() {
  //  useRedirect("/login");

  const {logoutUser, user} = useUserContext();
  // const name ="Ishita";

  return (
  <main>
  </main>
    );
  }
