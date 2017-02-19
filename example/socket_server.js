import http from 'http'
import socketio from 'socket.io'

const server = http.createServer()
const io = socketio(server)

export default {
  name: "server",
  start() {
    this.log("debug", 'socker-server start>>>>>')

    io.on('connect', socket => {
      console.log('connect')
      socket.emit('status:connect')

      socket.on("observer", arr => {
        arr.forEach(argv => {

          this.observer(argv, data => {

            socket.emit(`observer:${argv}`, data)
          })

          socket.emit(`observer:${argv}`, this.state[argv])
        })
      })
    })
    server.listen(2333)
  }
}