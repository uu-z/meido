import http from 'http'
import socketio from 'socket.io'

const server = http.createServer()
const io = socketio(server)

export default {
  name: "server",
  completions: [":socket_server"],
  start() {
    this.log("debug", 'socker-server start>>>>>')

    this["socket_server"] = () => {
      io.on('connect', socket => {
        this.log('duebug', 'connect')
        socket.emit('connect')

        socket.on("observer", obj => {
          const fields = obj.fields

          if(fields) {
            fields.forEach(field => {
              this.observer(field, data => {
                socket.emit(`observer:${field}`, data)
              })
              socket.emit(`observer:${field}`, this.observed[field])
            })
          }
        })

        socket.on("call", data => {
          this.observed.newline = data.command
        })

        socket.on('listen', obj => {
          const fields = obj.fields
          const freq = obj.freq > 1000 ? Object.freq : 1000
          let time = Date.now()

          setInterval(() => {
            let data = {}

            fields.forEach(field => {
              data[field] = this.state[field]
            })

            socket.emit(`listen`, data)
          }, freq)
        })
      })
      
      server.listen(2333)
    }
  }
}