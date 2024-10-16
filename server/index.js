const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
const {pub, sub} = require("./redisclient.js")
const app = express();
const httpServer = http.createServer(app);
const ConnectToMongo = require("./db.js")
const Message = require("./Models/Message.js")
const {kafka} = require("./KafkaJs/kafkaJsClient.js")
const {Redis}   = require("ioredis")

const producer = kafka.producer()


const client = new Redis()
const rooms  = []

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

io.on('connection', async(socket) => {


  await producer.connect()
  const handleCreateRoom = async (data) => {
    const uniq = 'id' + (new Date()).getTime();
    const roomData = { id: uniq, admin: data.name, socketId: socket.id };
  
    sub.subscribe(uniq);
    await client.set(socket.id, uniq);
    await client.expire(socket.id, 60*60*24);
  
    socket.emit("createdRoomSuccessfully", roomData);
  };
  
  const handleJoinRoom = async (data) => {
    sub.subscribe(data.id);
    await client.set(socket.id, data.id);
  
    await pub.publish(data.id, JSON.stringify({ message: "JoinedSuccessfully"  , user : data.name }));
    socket.emit("joinRoomSuccessfully", { name: data.name, id: data.id, socketId: socket.id });
  };
  
  socket.on("createRoom", handleCreateRoom);
  socket.on("joinRoom", handleJoinRoom);
  
  // Handle socket disconnection and reconnection

  
  socket.on("reconnect", async () => {

    const roomId = await client.get(socket.id);
    if (roomId) {
      sub.subscribe(roomId);
    }
  });

  socket.on("sendmessage"  ,async (data)=>{
    sub.subscribe(data.id)
    await pub.publish(data.id  , JSON.stringify(data)); 
 

    try {
      await producer.send({
        topic: "messages",
        messages: [
          {
            partition: 0,
            key: "newMessage",
            value: JSON.stringify(data),
          },
        ],
      });
    

     
    } catch (error) {
      console.error("Error sending message:", error);
    } 
   
 
  })


  sub.on("message", async(channel, message) => {
    try {
      const id = await  client.get(socket.id)
        if (channel === id) {
  
          const data = JSON.parse(message)
          const usertrue = data.sid == socket.id? true : false  
       
          socket.emit("messagereceived"  , {message : data.message , user  : data.user  , admin : usertrue})
          
        }
    
    } catch (error) {
        console.error("Error processing message:", error);
    }
});


  

  socket.on('disconnect', async() => {


  });

});


const PORT = 8000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
