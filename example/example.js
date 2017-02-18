export default {
  name: "example",
  help:`
    Command:

      :js.example.hello          example

  `,
  start() {
    
  },
  hello() {
    return 'world'
  }
}