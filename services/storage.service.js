import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const SETTING_PARAMS = {
  TOKEN: 'token',
  CITY: 'city',
};

const isExist = async path => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

const filePath = join(homedir(), 'weather-data.json');

const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    const configFile = await promises.readFile(filePath);
    data = JSON.parse(configFile.toString());
  }

  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async key => {
  if (await isExist(filePath)) {
    const configFile = await promises.readFile(filePath);
    const data = JSON.parse(configFile.toString());
    return data[key];
  }
  return undefined;
};

export { saveKeyValue, getKeyValue, SETTING_PARAMS };
