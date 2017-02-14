import r from 'rethinkdb'
import {execSync} from 'child_process'

const config = {
  host: 'localhost',
  port: 28015
}

const connectDb = () => new Promise((res, rej) => {
  r.connect({host: config.host, port: config. port}, (err, conn) => {
    if(err) {
      rej(err)
    }

    res(conn)
  })
})

export default {
  name: "rethinkdb",

  start: async (meido) => {
    meido.Queue
      .run(async (queue, next) => {
        await next()

        let db = await connectDb()
        if(db) {
          meido.db = db
          meido.log('debug', 'db start>>>>>')
        }
      })
  }
}