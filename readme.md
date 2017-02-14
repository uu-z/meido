# Examples of medios 

# script

```js
//...

//plugin1
export default{
  name: 'plugin1',
  
  start(meido) => {
    console.log(`start plugin1`)

    meido
      .on('plugin1', val => {
        console.log(`on: plugin1, ${val} `)
      })
      .observer('plugin1', val => {
        console.log(`observe: plugin1, ${val}`)
      })
    
    meido.Queue
      .run(async() => {
        meido.state.plugin1 = 111
        meido.emit('plugin1', 222)
      })
      .run(async() => {
        setTimeout(() => {
          meido.plugins["plugin2"] && meido.plugins["plugin2"].call(meido)
        }, 1e3)

        setTimeout(() => {
          meido.plugins["plugin2"] && meido.plugins["plugin3"].call(meido)      
        }, 1e3)
      })
  }
}


// plugin2
export default {
  name: "plugin2",
  version: "0.0.1",

  call: async (meido) => {
    console.log('start plugin2')
  }
}

// plugin3
export default {
  name: "plugin2",
  version: "0.0.1",

  call: async (meido) => {
    console.log('start plugin2')
  }
}
```

```bash
$ yarn run dev
>>> start plugin1
>>> observe: plugin1, 111
>>> on: plugin1, 222
>>> start plugin2
>>> start plugin3
```
