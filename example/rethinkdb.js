import r from 'rethinkdb'
import {exec,execSync} from 'child_process'

const config = {
  host: 'localhost',
  port: 28015
}

const connectDB = () => new Promise((res, rej) => {
  r.connect({host: config.host, port: config. port}, async (err, conn) => {
    res(conn)
  })
})

export default {
  name: "rethinkdb",
  help:`
    Used to test

    Function:

    `,

  start: (meido) => {
    let db
    let retry = 5

    let interval = setInterval(async() => {
      db = await connectDB()
      if(db) {
        meido.rethinkdb = db
        meido.log('debug', 'db start>>>>>')
        clearInterval(interval)
      } else {
        if(retry-- == 0) {
          meido.log('debug', 'db start faild: try $rethinkdb start db')
        }
      }
    }, 1e4)
  }
}