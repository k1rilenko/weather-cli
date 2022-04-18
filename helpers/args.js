// https://www.npmjs.com/package/yargs library for parse arguments;

const formatArgument = name => {
  return name.substring(1);
};

export const getArgs = args => {
  const res = {};
  const [, , ...rest] = args;

  rest.forEach((value, index, array) => {
    if (value.charAt(0) === '-') {
      if (index === array.length - 1) {
        res[formatArgument(value)] = true;
      } else if (array[index + 1].charAt(0) !== '-') {
        res[formatArgument(value)] = array[index + 1];
      } else {
        res[formatArgument(value)] = 1;
      }
    }
  });

  return res;
};
