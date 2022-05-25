'use strict';
const Service = require('egg').Service;
class TimeService extends Service {
  async getAll() {
    const { app } = this;
    const res = app.mysql.select('timelocus', {
      //desc是降序
      orders: [['time', 'desc']],
    });
    return res;
  }
}
module.exports = TimeService;
