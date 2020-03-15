import express from 'express'
import http from 'http'
import _io from 'socket.io'
import dotenv from 'dotenv'
import cors from 'cors'
// local libs
import router from 'router'
import socket from 'socket'

dotenv.config()

const PORT = process.env.PORT || 8080
const ORIGIN = process.env.ORIGIN as string
const app = express()
const server = http.createServer(app)
const io = _io(server)

if (process.env.NODE_ENV === 'development') {
  io.origins(ORIGIN)
  app.use(
    cors({
      origin: ORIGIN,
    })
  )
}

// I decided to use the socket because you asked me
// about this on the interview
io.on('connection', socket)
app.use('/api', router)

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
