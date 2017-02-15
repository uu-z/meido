import readline from 'readline'


export default {
  name: "cli",

  start: (meido) => {

    const rl = readline.createInterface(process.stdin, process.stdout, completer, true)
    rl.setPrompt('meido> ', 5)

    meido.log('debug', 'cli start>>>>>')
    meido
      .on('cli:start', () => {      
        rl.on('line', line => {
          meido.state.newline = line
        rl.prompt()
        }).on('close', () => {
          meido.emit('cli:close')
        })
        rl.prompt()
      })
  }
}

function completer(line) {
  var completions = '.help .error .exit .quit .q'.split(' ')
  var hits = completions.filter((c) => {
    if(c.indexOf(line) === 0) {
      return c
    }
  })
  return [hits.length ? hits : completions, line]
}