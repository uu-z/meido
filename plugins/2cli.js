import readline from 'readline'
import {exec, execSync} from 'child_process'

export default {
  name: "cli",

  start: (meido) => {

    const rl = readline.createInterface(process.stdin, process.stdout)
    rl.setPrompt('meido> ', 5)

    meido.log('debug', 'cli start>>>>>')
    meido
      .on('cli:start', () => {      
        rl.on('line', line => {
          let newline = line.trim()
          
          switch(newline) {
            case 'good night': 
              meido.state.nofify = {
                title: 'good night 😊',
                message: 'computer going to sleep'
              }
              let tenSecondAfter = execSync('date -v+10S +%Y%m%d%H%M').toString().replace(/^20/, '')
              try {
                execSync(`sudo shutdown -s ${tenSecondAfter}`)              
              } catch (err) {
                meido.state.nofify = {
                  title: 'error',
                  message: err
                }
              }
            default :
              meido.state.newline = newline
          }
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