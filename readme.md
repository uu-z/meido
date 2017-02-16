# Examples of meidos

[meidos](https://github.com/aitseH/meidos)

# usage

```js

export default {
  name: "test",
  help:`
    Used to test

    Function:

      plugins.test.hello()  Test      

    `,

  start: (meido) => {
    meido.emit('cli:start')
  },
  hello: () => {
    return 'world'
  },
  add: (meido, ...args) => {
    return args.reduce((a,b) => parseInt(a) + parseInt(b)) 
  }
}

```

![meido](./meido.gif)
