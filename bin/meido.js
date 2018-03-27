#!/usr/bin/env babel-node

import Meido from "../src/Meido";
import path from "path";

let args = process.argv.slice(2);

const meido = new Meido();

meido.on("start", () => {
  if (args.length > 0) {
    args = args.map(_path => path.resolve(_path));
    meido.state._pluginPaths = args;
  }
});
