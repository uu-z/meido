import {EventEmitter} from 'events'

import { Queue, Message, Observer } from 'meidos'

class Meido {
  constructor(options) {
    this.Event = new EventEmitter()
    this.Observer = new Observer(this.Event)
    this.Queue = new Queue(this.Event)
    this.Message = new Message(this.Event)

    this.options = options
    this.state = {}
    this.init()    
  }

  init() {
    // inject plugins
    if(this.options.components) {
      this.options.components.forEach(component => {
        this.Queue
          .run(async (queue, next) => {
            component.start && await component.start(this)
            
            this[component.name]["help"] = component.help
            this[component.name]["name"] = component.name
             
            Object.keys(component).forEach(key => {
              if(key !== "start" && key !== "name") {
                if(typeof component[key] === 'function') {
                  this.options.completions.push(`${component.name}.${key}()`)                
                }else {
                  this.options.completions.push(`${component.name}.${key}`)
                }
              }
            })

          next()
        })
      })
    }
  }

  set(obj) {
    Object.assign(this.options, obj)
  }
  
  on(name, fn) {
    this.Event.on(name, fn)
    return this
  }

  emit(name, ...args) {
    this.Event.emit(name, ...args)
    return this
  }

  observer(name, fn) {
    this.Message.observer(name, fn)
    return this
  }
}


export default Meido
