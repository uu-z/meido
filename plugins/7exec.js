export default {
  name: "exec",
  start() {
    let meido = this

    meido.observer("newline", line => {
      const newline = line.length > 0 ? line.split(' ') : []

      let [command, ...args] = newline
      let commandType = 'object'

      if(command && command.match(/:\w+/)) {
        commandType = 'function'
        command = command.replace(':', '')
        line = command
      } else {
        commandType = 'object'
        line = line.replace(':', '')
      }

      const functions = []
      let i = -1
      args.length > 0 && args.forEach(a => {
        if(a.match(/:\w+/)){
          functions.push(a.replace(':', ''))
        }
      })

      try {
        newline.length > 0 && new Function('meido', 'commandType', 'args', `
        if(commandType == "function") {
          
          if(args.length > 0) {
            args = args.map((raw, i) => {
              if(raw.match(${/:\w+/})) {  
                let fn = meido.${functions[++i]}
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
            console.log(${line})
          } catch (err) {
            try {
              console.log(meido.${line})
            } catch (error) {
              console.log(meido.plugins.${line})
            }
          }
        } 
        `)(meido, commandType, args)
      } catch(err) {
        console.error(err)
      }

      meido.cli.prompt()
    })
  }
}
