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
