import { getKeyValue, SETTING_PARAMS } from './storage.service.js';
import axios from 'axios';

const getWeather = async city => {
  const token = await getKeyValue(SETTING_PARAMS.TOKEN);
  if (!token) {
    throw new Error('API KEY not set, add API key from -t [API_KEY]');
  }

  if (process.env.CITY) {
    city = process.env.CITY;
  }

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      units: 'metric',
    },
  });

  return data;
};

export { getWeather };
