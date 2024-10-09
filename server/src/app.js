import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";

const port = 4000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is working!");
});

io.on("connection", (socket) => {
  socket.on("message", ({name1, message }) => {
    io.emit("receive-message", {message, name:name1}); 
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
