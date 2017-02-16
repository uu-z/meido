# MEIDO -- Single file debugger


# install

```bash

$ npm install meido babel-cli  -g

```

# usage

```js
// {{ your-dir }}/example.js

export default {
  name: "example",
  help:`
    Used to example

    Function:

      plugins.example.hello()  example      

    `,

  start: (meido) => {
  },
  add: (meido, ...args) => {
    return args.reduce((a,b) => parseInt(a) + parseInt(b))
  }
}


```

```bash
$ meido {{ your-dir }}/example.js

meido> :plugins.example.add 100 200 300 400
1000
```


## demo
![meido](./demo.gif)
