const express=require('express')
const cors=require('cors')

const app=express()
const http=require('http')

const {Server} = require('socket.io')

app.use(cors)

const server=http.createServer(app)

const io=new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection", (socket) => {

  socket.on("send_message", (data) => {
    socket.broadcast.emit("coming_message", data)
  })
});

server.listen(5000,() => {
    console.log('server is running on 5000')
})