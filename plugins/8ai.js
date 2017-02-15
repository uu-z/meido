export default {
  name: "ai",

  start: (meido) => {
    meido.log('debug', 'web start>>>>')
    
    meido
      .observer('newline', val => {
        
      })
  }
}