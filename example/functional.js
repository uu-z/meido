// class Maybe {
//   constructor(type, value) {
//     Object.assign(this, {type, value})
//   }
//   static just(val) {
//     return new Maybe('just', val)
//   }
//   static nothing() {
//     return new Maybe('nothing', null)
//   }
//   chain(fn) {
//     if(this.type === 'nothing') {
//       return Maybe.nothing()
//     } else if(typeof this.value !== 'string' || this.value.length === 0) {
//       return Maybe.nothing()
//     } else {
//       return fn(this.value)
//     }
//   }  
// }

export default {
  name: "functional",
  start() {
  },
  random() {
    return Math.random()
  },
  add(...args){
    return args.reduceRight((a,b) => {
      if(typeof a == 'function') {
        if(typeof b === 'function') {
          return a() + b()
        }
        return a() + parseInt(b)
      } else if(typeof b === 'function'){
        if(typeof a === 'function') {
          return a() + b()
        }
        return b() + parseInt(a)
      }else {
        return parseInt(a) + parseInt(b)
      }
    })
  }
  // maybe(x, ...args){
  //   let ma = Maybe.just(x)

  //   return ma
  // }
}

// function bindFirst(a) {
//   return (b) => {
//     a(b)
//   }
// }

// function binSecond(a) {
//   return (b) => {
//     b(a)
//   }
// }