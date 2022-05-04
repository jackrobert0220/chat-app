const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");
const socket = require("socket.io");

const path = require("path");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join("build")));

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log("DB Connection Successfull!");
}).catch((err)=> {
    console.log(err.message);
});

const server = app.listen(process.env.PORT || 5000,() => {
    console.log(`Server started on Port ${process.env.PORT || 5000}`)
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Socket.io Connection
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});

// Stores Users
global.onlineUsers = new Map();

// Establishes socket connection to send messages
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
    // Checks if User is Online
    if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-receive", data.message);
        };
    });
});