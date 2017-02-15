import Meido from './src/meido'

import plugins from './src/plugins'
// import db from './src/db'
// import test from './src/test'

const meido = new Meido({
  logLevel: 'debug',
  components: [plugins]
})

meido.Queue
  .set({
    concurrency: 4,
  })


export default meido