#!/usr/bin/env babel-node

import Meido from '../src/meido'

let argv = process.argv.slice(2)

const meido = new Meido()

meido.on('start', () => {
  if(argv) {
    meido.state.pluginPaths = argv
  }
})
