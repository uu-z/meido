import io from 'socket.io-client'

const url = 'http://localhost:2333'
const options = {
	transports: ['websocket'],
	'force new connection': true
}

export default {
  name: "client",
  star() {
    this.log("debug", 'socker-client start>>>>>')

    const client = io.connect(url, options)

    client.on('status:connect', () => {

      client.emit('observer',["test1","test2","test3"])

      client.on("observer:test1", test1 => {
        console.log(test1)
      })
      client.on("observer:test2", test2 => {
        console.log(test2)
      })
      client.on("observer:test3", test3 => {
        console.log(test3)
      })
    })
  }
}