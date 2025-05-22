import axios from "axios";

const weatherPlugin = {
  name: "weather",
  match: (text) => text.startsWith("/weather "),
  execute: async (text) => {
    const city = text.split(" ")[1];
    const res = await axios.get(`https://wttr.in/${city}?format=j1`);
    const weather = res.data.current_condition[0];
    return {
      pluginName: "weather",
      pluginData: {
        city,
        temp: weather.temp_C,
        desc: weather.weatherDesc[0].value,
      },
    };
  },
  render: (data) => (
    <div>
      <strong>Weather in {data.city}:</strong><br />
      Temp: {data.temp}°C<br />
      Condition: {data.desc}
    </div>
  ),
};

export default weatherPlugin;
