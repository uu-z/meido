import Meido from './src/meido'

import plugins from './src/plugins'

const meido = new Meido({
  logLevel: 'info',
  components: [plugins],
  completions: [':q', 'help']
})

meido.Queue
  .set({
    concurrency: 4,
  })


export default meido