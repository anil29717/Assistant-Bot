import { detectPlugin } from "../plugins/plugin.Manager";

export const parseMessage = async (text) => {
  const plugin = detectPlugin(text);
  if (plugin) {
    return await plugin.execute(text);
  }
  return {
    pluginName: null,
    pluginData: null,
    content: "Sorry, I didn't understand that command.",
  };
};
