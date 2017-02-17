import notifier from 'node-notifier'
import {exec} from 'child_process'

export default {
  name: "watcher",
  
  start: (meido) => {
    meido.log("debug", 'watcher start>>>>>')


    meido
      .observer('notify', (val) => {
        if(typeof val == "object") {
          let data = {
            title: 'title',
            message: 'message',
            wait: true,
            onClick: () => {}
          }
          Object.assign(data, val)
        notifier
          .notify({
            title: data.title,
            message: data.message,
            wait: true, 
          })
          .on('click', data.onClick)
      }
    })
  }
}