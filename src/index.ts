import express from 'express'
import http from 'http'
import _io from 'socket.io'
import dotenv from 'dotenv'
// local libs
import router from 'router'
import socket from 'socket'

dotenv.config()

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = _io(server)

// I decided to use the socket because you asked me
// about this on the interview
io.on('connection', socket)
app.use('/api', router)

server.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
