## MEIDO -- Single / Multi file debugger


## install

```bash

$ npm install meido babel-cli  -g

```

## usage

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
  hello: () => {
    return 'world'
  }
  add: (meido, ...args) => {
    return args.reduce((a,b) => parseInt(a) + parseInt(b))
  }
}


```

```bash
// load single file:
$ meido {{ your-dir }}/example.js

meido> :plugins.example.add 100 200 300 400
1000

// load all the files in the dir:
$ meido {{ your-dir }}


// also can such:
$ meido
meido> :load {{ you-dir }}

```


## api
```js
help // print help

:q  // quit
:load {{ ...args }}  //load dir/file

```


## demo
![meido](./demo.gif)
