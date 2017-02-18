
const str = typeOf('string')
const num = typeOf('number')
const func = typeOf('function')
const bool = typeOf('boolean')
const obj = objTypeOf('Object')
const arr = objTypeOf('Array')
const date = objTypeOf('Date')
const set = objTypeOf('Set')
const map = objTypeOf('Map')
const wset = objTypeOf('WeakSet')
const wmap = objTypeOf('WeakMap')


str("123")
num(123)
func(() => {})
bool(true)
obj({haha: 123})
arr([1,2,3])
date(new Date)
set(new Set)
map(new Map)
wset(new WeakSet)
wmap(new WeakMap)

export default {
  name: "typing",

  start: () => {

  },

  // plusplus ::  string -> num
  plusplus(argv){
    str(argv)
    const number = parseInt(argv)
    return num(number + 1)
  }
}

function typeOf(type){
  return x => {
    if(typeof x === type) {
      return x
    } else {
      throw new TypeError(`Error: ${type} expected, ${typeof x} given.`)
    }
  } 
}

function objTypeOf(name) {
  return x => {
    if(Object.prototype.toString.call(x) === `[object ${name}]`) {
      return x
    } else {
      throw new TypeError(`Error ${name} expected, something else given.`)
    }
  }
}

function bindFirst(a) {
  return (b) => {
    a(b)
  }
}

function binSecond(a) {
  return (b) => {
    b(a)
  }
}
