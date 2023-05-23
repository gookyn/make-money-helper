const dayjs = require('dayjs');
const csvtojson = require('csvtojson');
const tomorrow = dayjs().add(1, 'day');
const filePath = `./files/${tomorrow.format('YYYYMM')}.csv`;
const per = 24;

const getMsg = new Promise((resolve, reject) => {
  csvtojson()
    .fromFile(filePath) // relative path
    .then(arr => {
      try {
        const tomorrowWorkTime =
          arr.filter(item => item.date === tomorrow.format('YYYY-MM-DD'))[0] ||
          {};
        const { start = '', end = '' } = tomorrowWorkTime;

        let msg = `Tomorrow is ${tomorrow.format('MMM')} ${tomorrow.format(
          'DD'
        )}.\n`;

        if (!start || !end) {
          msg += `Have a good rest 💤`;
        } else {
          const duration = +end - +start;
          msg += `Time to make money: ${getTimeText(+start)} - ${getTimeText(
            +end
          )}\nWill get $${per * duration}+++💰`;
        }
        resolve({
          msg,
        });
      } catch (err) {
        console.log('error msg: ', err);
        reject(err);
      }
    });
});

function getTimeText(time) {
  if (time < 12) {
    return `${time} AM`;
  } else if (time > 12) {
    return `${time - 12} PM`;
  } else {
    return `${time} PM`;
  }
}

module.exports = {
  getMsg,
};
