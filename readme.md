## MEIDO -- Single / Multi file debugger


## install

```bash

$ npm install meido babel-cli  -g

```



## quick start

```js

$ meido


:example  // load example file

:hello

:add :random 1 2 3

:notify foo bar

:ter meido // open a new terminal with meido

help // get help 

:q // quit

```


## usage

```js

// load single file:

$ meido {{ your-dir }}/example.js

meido> :js.example.add 100 200 300 400

> 1000

// load all the files in the dir:

$ meido {{ your-dir }}

```

```js
// also can such:

$ meido

meido> :load {{ you-dir }}

```


## example

```js
// {{ your-dir }}/example.js

export default {
  name: "example",
  completions: [":hello"],
  help:`
    Command:

      :hello         
      :example.hello

  `,
  start() {
    this.hello = () => {
      return 'world'
    }
  },
  hello() {
    return 'world'
  }
}

```


## api

```js
help                             // print help

:q                             // quit
:load [...paths]              // load dir/file
:example                     // load example file
:ter [bin-name]             // open termial
:setPath [name] [path]     // set the path of the permanent
:getPaths                 // list the path of the all
:removePath [name]       // remove the path 

```


## demo
![meido](./demo.gif)
