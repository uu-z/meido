import Meido from './src/meido'

import plugins from './src/plugins'
import db from './src/db'

const meido = new Meido({
  components: [db, plugins]
})

meido.Queue
  .set({
    concurrency: 4,
    logLevel: 'debug'
  })


export default meido