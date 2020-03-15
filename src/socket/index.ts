import { Socket } from 'socket.io'
import random from 'lodash/random'
import readJSON from 'helpres/readJSON'

export default (socket: Socket) => {
  socket.on('getCurrentData', async () => {
    try {
      const data = await readJSON('data.json')
      socket.emit('newData', data)
    } catch (err) {
      socket.emit('errorWhileReceivingData', {
        message: 'Error While Receiving Data',
      })
    }
  })

  socket.on('getNewRate', () => {
    const rate = random(20, 80, true)
    socket.emit('newRate', {
      rate,
    })
  })
}
