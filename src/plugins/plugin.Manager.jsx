import weatherPlugin from "./weather.Plugin.jsx";
import calcPlugin from "./calculation.Plugin.jsx";
import definePlugin from "./define.Plugin.jsx";

const plugins = [weatherPlugin, calcPlugin, definePlugin];

export const detectPlugin = (text) => plugins.find(plugin => plugin.match(text));
export const getPluginByName = (name) => plugins.find(p => p.name === name);
