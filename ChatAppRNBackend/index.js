/* eslint-disable global-require */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./src/models");
const user = require("./src/routes/user");
const { log } = require("console");

const app = express();
const http = require('http').Server(app);
// API POST requests
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// app.use(cors({ origin: true }));
app.use(cors());
app.use(function(err,req,res,next) {
  res.status(500).send("Something failed.");
})
app.use('/api/user',user);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to Chat Service API.",
  })
);

const port = process.env.PORT || 8000;

db.sequelize.sync();

http.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
// app.listen(port, () => {
//   console.log(`Server is running on PORT ${port}`);
// });

const socketIO = require('socket.io')(http, {
  cors: {
    origin: "*"
  }
})
 const chatRooms = [
        {
            id: "1",
            name: "Novu Hangouts",
            messages: [
                {
                    id: "1a",
                    text: "Hello guys, welcome!",
                    time: "07:50",
                    user: "Tomer",
                },
                {
                    id: "1b",
                    text: "Hi Tomer, thank you! 😇",
                    time: "08:50",
                    user: "David",
                },
            ],
        },
        {
            id: "2",
            name: "Hacksquad Team 1",
            messages: [
                {
                    id: "2a",
                    text: "Guys, who's awake? 🙏🏽",
                    time: "12:50",
                    user: "Team Leader",
                },
                {
                    id: "2b",
                    text: "What's up? 🧑🏻‍💻",
                    time: "03:50",
                    user: "Victoria",
                },
            ],
        },
    ];
const generateID = () => new Date().toISOString() + Math.random() * 1000;
socketIO.on('connection', socket => {
  console.log(`${socket.id} user just connected!`);

  socket.on("createRoom", (roomName) => {
    socket.join(roomName);
    //👇🏻 Adds the new group name to the chat rooms array
    chatRooms.unshift({ id: generateID(), roomName, messages: [] });
    //👇🏻 Returns the updated chat rooms via another event
    socket.emit("roomsList", chatRooms);
});
socket.on("findRoom", (id) => {
  //👇🏻 Filters the array by the ID
  let result = chatRooms.filter((room) => room.id == id);
  //👇🏻 Sends the messages to the app
  socket.emit("foundRoom", result[0].messages);
});
socket.on("newMessage", (data) => {
  //👇🏻 Destructures the property from the object
  const { room_id, message, user, timestamp } = data;

  //👇🏻 Finds the room where the message was sent
  let result = chatRooms.filter((room) => room.id == room_id);

  //👇🏻 Create the data structure for the message
  const newMessage = {
      id: generateID(),
      text: message,
      user,
      time: `${timestamp.hour}:${timestamp.mins}`,
  };
  //👇🏻 Updates the chatroom messages
  socket.to(result[0].name).emit("roomMessage", newMessage);
  result[0].messages.push(newMessage);

  //👇🏻 Trigger the events to reflect the new changes
  socket.emit("roomsList", chatRooms);
  socket.emit("foundRoom", result[0].messages);
});
  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('A user disconnected');
  })
}) 
module.exports = app;
