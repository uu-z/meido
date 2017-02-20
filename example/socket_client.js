import io from 'socket.io-client'

const url = 'http://localhost:2333'
const options = {
	transports: ['websocket'],
	'force new connection': true
}

export default {
  name: "client",
  completions: [":socket_client"],
  start() {
    this.log("debug", 'socker-client start>>>>>')

    this["socket_client"] = () => {
      let client = io.connect(url, options)
      client.on('connect', () => {

      })

      // observer
      client.emit('observer',{
        fields:["test1"]
      })
      client.on("observer:test1", state => {
        console.log(state)
      })

      //listen
      client.emit("listen",{
        fields:["test1"],
        freq: 5000
      })

      client.on("listen", state => {
        console.log(state)
      })

      //call
      client.emit('call', {
        command: "observed.test1 = 200"
      })
    }
  }
}