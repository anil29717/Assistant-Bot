const calcPlugin = {
  name: "calc",
  match: (text) => text.startsWith("/calculation "),
  execute: async (text) => {
    const expression = text.replace("/calculation ", "");
    try {
      const result = Function('"use strict";return (' + expression + ")")();
      return {
        pluginName: "calc",
        pluginData: { expression, result },
      };
    } catch {
      return {
        pluginName: "calc",
        pluginData: { expression, result: "Error in expression." },
      };
    }
  },
  render: (data) => (
    <div>
      <strong>Calculation:</strong><br />
      {data.expression} = <b>{data.result}</b>
    </div>
  ),
};

export default calcPlugin;
