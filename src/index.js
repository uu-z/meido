import Meido from './meido'

import plugins from './plugins'

const meido = new Meido({
  components: [plugins]
})

meido.Queue
  .set({concurrency: 4})

export default meido