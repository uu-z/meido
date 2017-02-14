import Meido from './src/meido'

import plugins from './src/plugins'

const meido = new Meido({
  components: [plugins]
})

meido.Queue
  .set({concurrency: 4})

export default meido