const dayjs = require('dayjs');
const csvtojson = require('csvtojson');

function getMsg() {
  return new Promise((resolve, reject) => {
    const tomorrow = dayjs().add(1, 'day');
    console.log('tomorrow: ', tomorrow.format('YYYY-MM-DD'));
    const filePath = `./files/${tomorrow.format('YYYYMM')}.csv`;
    const per = 25;

    csvtojson()
      .fromFile(filePath) // relative path
      .then(arr => {
        try {
          const tomorrowWorkTime =
            arr.filter(
              item => item.date === tomorrow.format('YYYY-MM-DD')
            )[0] || {};
          const { start = '', end = '', remind = '' } = tomorrowWorkTime;

          let msg = `Tomorrow: ${tomorrow.format('MMM')} ${tomorrow.format(
            'DD'
          )}\n`;

          if (remind) {
            msg += remind;
          } else {
            if (!start || !end) {
              msg += `Have a good rest 💤`;
            } else {
              const duration = +end - +start;
              msg += `Time to make money: ${getTimeText(
                +start
              )} - ${getTimeText(+end)}\nWill get $${per * duration}+++💰`;
            }
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
}

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
