'use strict';
const Controller = require('egg').Controller;
class ReadController extends Controller {
  async addIndex() {
    const { ctx } = this;
    const result = await ctx.service.read.readAdd();
    if (result) {
      ctx.body = {
        status: 200,
        data: result,
      };
    } else {
      ctx.body = {
        status: 500,
        msg: '请求出错',
      };
    }
  }
}
module.exports = ReadController;
