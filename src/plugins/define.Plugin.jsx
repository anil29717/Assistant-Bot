import axios from "axios";

const definePlugin = {
  name: "define",
  match: (text) => text.startsWith("/define "),
  execute: async (text) => {
    const word = text.split(" ")[1];
    try {
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const def = res.data[0].meanings[0].definitions[0].definition;
      return {
        pluginName: "define",
        pluginData: { word, def },
      };
    } catch {
      return {
        pluginName: "define",
        pluginData: { word, def: "No definition found." },
      };
    }
  },
  render: (data) => (
    <div>
      <strong>Definition of {data.word}:</strong><br />
      {data.def}
    </div>
  ),
};

export default definePlugin;
