export default {
  name: "helper",

  start: (meido) => {
    meido.log('debug', 'web start>>>>')

    meido.help = `
      Meido

      command:


      help:                      'help'
      plugins.help:              'plugins help'


      Run 'meido.[Command].help' for more information on a command.
    `
    meido.q = () => {
      process.exit(0)
    }

    meido
      .observer('newline', val => {
        
      })
  }
}