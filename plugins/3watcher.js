import notifier from 'node-notifier'
import superagent from 'superagent'
import cheerio from 'cheerio'
import {exec} from 'child_process'

export default {
  name: "watcher",

  start: (meido) => {
    meido.log("debug", 'watcher start>>>>>')


    meido
      .observer('nofify', (data) => {
        if(typeof data == "object") {
        notifier
          .notify({
            title: data.title,
            message: data.message,
            wait: data.wait ? data.wait : true, 
          })
          .on('click', data.onClick)
      }
    })
  }
}