import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import { getFile, copyFile } from "./utils";

let homeDir = process.env.HOME || process.env.HOMEPATH;
const rootDir = path.join(homeDir, "./.meido/plugins");

if (!fs.existsSync(rootDir)) {
  mkdirp.sync(rootDir);
}

const rootDirFile = fs.readdirSync(rootDir);

if (!rootDirFile.includes(".meidolrc")) {
  copyFile(path.join(__dirname, "../.meidolrc"), `${rootDir}/.meidolrc`);
}

const config = JSON.parse(fs.readFileSync(`${rootDir}/.meidolrc`, "utf8"));

const pluginPaths = Object.assign(config.pluginPaths, {
  base: path.join(__dirname, config.pluginPaths.base),
  global: rootDir
});

export default {
  name: "plugins",
  start() {
    let meido = this;

    meido
      .on("queue:getFile", files => {
        const { plugins } = files;

        Object.assign(this, files);

        meido.state.isPluginMount = true;
      })
      .on("observer", (name, fn) => {
        meido.Message.on(name, fn);

        meido.state = new Proxy(meido._state, {
          get(target, key) {
            if (key === "all") {
              return target;
            } else if (key in target) {
              return target[key];
            } else {
              target[key] = null;
              return null;
            }
          },
          set(target, key, val) {
            target[key] = val;
            meido.Message.emit(key, val);
            return true;
          }
        });
      })
      .observer("pluginPaths", async pluginPaths => {
        let files = {};
        try {
          files = await getFile(pluginPaths);
        } catch (error) {
          console.log(error);
        }

        if (!meido._pluginPaths.includes(pluginPaths)) {
          meido._pluginPaths = [...meido._pluginPaths, ...pluginPaths];
        }

        meido.emit("queue:getFile", files);
      })
      .observer("isPluginMount", isPluginMount => {
        if (isPluginMount === true) {
          for (let pluginName of Object.keys(meido.plugins)) {
            const plugin = meido.plugins[pluginName];

            plugin.start && plugin.start.call(meido);

            Object.keys(plugin).forEach(key => {
              if (key !== "start" && key !== "name") {
                if (typeof plugin[key] === "function") {
                  meido.options.completions.push(`:${plugin.name}.${key}`);
                } else if (key === "completions") {
                  meido.options.completions = meido.options.completions.concat(
                    plugin[key]
                  );
                } else {
                  meido.options.completions.push(`${plugin.name}.${key}`);
                }
              }
            });
          }
        }
      });

    meido._rootDir = rootDir;
    meido._configPath = `${rootDir}/.meidolrc`;
    meido._pluginPaths = [];
    meido.state.pluginPaths = Object.values(pluginPaths);
  }
};
