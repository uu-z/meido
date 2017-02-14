export default {
  name: "plugin1",
  version: "0.0.1",

  start: async (meido) => {
    console.log(`start plugin1`)

    meido
      .on('plugin1', val => {
        console.log(`on: plugin1, ${val} `)
      })
      .observer('plugin1', val => {
        console.log(`observe: plugin1, ${val}`)
      })

    meido.Queue
      .run(async() => {
        meido.state.plugin1 = 111
        meido.emit('plugin1', 222)
      })

    setTimeout(() => {
      meido.plugins["plugin2"] && meido.plugins["plugin2"].call(meido)
    }, 1e3)

    setTimeout(() => {
      meido.plugins["plugin2"] && meido.plugins["plugin3"].call(meido)      
    }, 1e3)
  },
}