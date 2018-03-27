export default {
  name: "example",
  completions: [":hello"],
  help: `
    Command:

      :hello         
      :example.hello

  `,
  start() {
    this.hello = () => {
      return "world";
    };
  },
  hello() {
    return "world";
  }
};
