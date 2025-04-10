"use client";

import { io } from "socket.io-client";
import { API_URL } from "./constants/config";

let socket: ReturnType<typeof io> | null = null;

// Initialize socket only on client side
if (typeof window !== "undefined") {
  socket = io(API_URL, {
    autoConnect: true,
    withCredentials: true,
    auth: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server");
  });
}

// Export a function that throws if socket is accessed on server side
export function getSocket() {
  if (!socket) {
    throw new Error("Socket is not available on server side");
  }
  return socket;
}

export default socket;
