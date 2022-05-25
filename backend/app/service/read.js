/* eslint-disable strict */
const Service = require('egg').Service;
class ReadService extends Service {
  async readAdd() {
    const { app } = this;
    try {
      const res = await app.mysql.select('read', {
        where: { name: 'index' },
      });
      const { readcount } = res[0];
      const add = readcount + 1;
      const readed = {
        readcount: add,
      };
      const options = {
        where: {
          name: 'index',
        },
      };
      await app.mysql.update('read', readed, options);
      return add;
    } catch (error) {
      console.log('错误信息：', error);
      return null;
    }
  }
}
module.exports = ReadService;
