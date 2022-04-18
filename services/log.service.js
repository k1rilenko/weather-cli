import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = error => {
  console.log(chalk.bgRed(' Error ') + ' ' + error);
};

const printSuccess = message => {
  console.log(chalk.bgGreen(' Success ') + ' ' + message);
};

const printHelp = () => {
  console.log(
    dedent(`
    ${chalk.bgCyan(' HELP')}
    Without parameters - show weather
    ${chalk.bold('-c [CITY]')} - for select city
    ${chalk.bold('-h')} - for show help
    ${chalk.bold('-t [API_KEY]')} - for save token
    `),
  );
};

const printWeather = weatherData => {
  const w = weatherData;
  console.log(
    dedent(`
      ${chalk.bgYellow('                                                                    ')}
      Weather in ${chalk.bold.bgMagenta(w.name)}${chalk.bold.bgMagenta('(' + w.sys.country + ')')} on ${new Date(
      w.dt * 1000,
    ).toLocaleTimeString()}
      Current temperature - ${w.main.temp} \u2103
      Wind speed - ${w.wind.speed} meter/sec
      Sunrise 🌅 - ${new Date(w.sys.sunrise * 1000).toLocaleTimeString()}
      Sunset 🌇 - ${new Date(w.sys.sunset * 1000).toLocaleTimeString()}
      ${chalk.bgYellow('                                                                    ')}
    `),
  );
};

export { printError, printSuccess, printHelp, printWeather };
