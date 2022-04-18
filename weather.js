#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, SETTING_PARAMS } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

const saveToken = async token => {
  if (!token.length) {
    printError('Token not set');
    return;
  }
  try {
    await saveKeyValue(SETTING_PARAMS.TOKEN, token);
    printSuccess('Token saved');
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async city => {
  if (!city.length) {
    printError('City not set');
    return;
  }
  try {
    await saveKeyValue(SETTING_PARAMS.CITY, city);
    printSuccess('City saved');
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  const city = await getKeyValue(SETTING_PARAMS.CITY);
  try {
    const weather = await getWeather(city);
    printWeather(weather);
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('city is incorrect');
    } else if (e?.response?.status === 401) {
      printError('token is incorrect');
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.c) {
    return saveCity(args.c);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  return getForecast();
};

initCLI();
