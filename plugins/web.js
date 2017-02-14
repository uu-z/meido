export default {
  name: "web",

  start: async (meido) => {
    meido.Queue
      .run(async(queue, next) => {
        await next()
        meido.log('debug', 'web start>>>>')
      })
  }
}