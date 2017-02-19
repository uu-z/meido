import readline from 'readline'
export default {
  name: "cli",

  start() {
    let meido = this
    let rl

    meido.log('debug', 'cli start>>>>>')
    meido
      .on('cli:start', () => {
        rl = readline.createInterface({
          input: process.stdin, 
          output: process.stdout,
          prompt: 'meido> ',
          completer: (line) => {
            var completions = meido.options.completions
            var hits = completions.filter((c) => { return c.indexOf(line) === 0 })
            return [hits.length ? hits : completions, line]
          }
        })
        rl.prompt()

        rl.on('line', line => {
          const newline = line.length > 0 ? line.split(' ') : []
          let [command, ...args] = newline
          let commandType = 'object'

          if(command && command.match(/:\w+/)) {
            commandType = 'function'
            command = command.replace(':', '')
          } else {
            commandType = 'object'
          }

          const test = []
          let i = -1
          args.length > 0 && args.forEach(a => {
            if(a.match(/:\w+/)){
              test.push(a.replace(':', ''))
            }
          })

          try {
            newline.length > 0 && new Function('meido', 'commandType', 'args', `
            if(commandType == "function") {
              
              if(args.length > 0) {
                args = args.map((raw, i) => {
                  if(raw.match(${/:\w+/})) {  
                    let fn = meido.${test[++i]}
                    if(fn) {
                      return fn
                    } else {
                      return raw
                    }
                  } else {
                    return raw
                  }
                })
              }

              try {
                console.log(${command}.call( meido, ...args))
              } catch (err) {
                try {
                  console.log(meido.${command}.call(meido, ...args))
                } catch (error) {
                  console.log(meido.plugins.${command}.call(meido, ...args))
                }
              }
            } else if(commandType == "object") {
              try {
                console.log(${command})
              } catch (err) {
                try {
                  console.log(meido.${command})
                } catch (error) {
                  console.log(meido.plugins.${command})
                }
              }
            } 
            `)(meido, commandType, args)
          } catch(err) {
            console.error(err.toString())
          }
          rl.prompt()
          meido.state.newline = line
          meido.cli = rl

        }).on('close', () => {
          meido.emit('cli:close')
        })
      }).observer('log', () => {
        if(rl) {
          rl.prompt()
        }
      })
  }
}