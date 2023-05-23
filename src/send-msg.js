const axios = require('axios');
const schedule = require('node-schedule');
const { getMsg } = require('./get-msg');

schedule.scheduleJob('0 0 18 * * *', sendMsg);

function sendMsg() {
  getMsg
    .then(res => {
      axios
        .post(
          `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${process.env.BOT_WEBHOOK}`,
          {
            msgtype: 'text',
            text: {
              content: res.msg,
            },
          }
        )
        .then(() => {
          console.log('send msg: ', res.msg);
        })
        .catch(error => {
          console.error('failed to send: ', error);
        });
    })
    .catch(err => {
      console.error('get msg error: ', err);
    });
}
