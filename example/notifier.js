import notifier from 'node-notifier'

export default {
  name: "notifier",
  completions: [":notify"],
  
  start() {
    this.log("debug", 'notifier start>>>>>')


    this
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
              wait: data.wait, 
            })
            .on('click', data.onClick)
      }
    })

    this.notify = (...args) =>  {
      this.state.notify = {
        title: args[0],
        message: args[1]
      }
    }
  }
}