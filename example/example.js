export default {
  name: "example",
  help:`
    Used to example

    Function:

      js.example.foo             example

      :js.example.hello          example
      :js.example.add [...args]  example   

    `,

  start() {

  },

  foo: "bar",
  hello() {
    return 'world'
  },
  add(...args) {
    return args.reduce((a,b) => parseInt(a) + parseInt(b))
  }
}