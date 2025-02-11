"use client";
import "./globals.css";
import React, { useEffect, useRef } from "react";
import Scene from "./Component/Scene";

export default function Page() {
  const mountRef = useRef(null); 
  const mixerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    return Scene(mountRef, mixerRef);  
  });

  return (
    <div
      ref={mountRef}
      className="absolute top-0 right-0 w-1/2 h-screen" 
    />
  );
}
