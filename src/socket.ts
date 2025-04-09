import { io } from "socket.io-client";
import { API_URL } from "./constants/config";

const socket = io(API_URL, {
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

export default socket;
