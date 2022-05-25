'use strict';
const Controller = require('egg').Controller;
class TimeController extends Controller {
  async getAll() {
    const { ctx } = this;
    const res = await ctx.service.timelocus.getAll();
    ctx.body = {
      status: 200,
      data: res,
    };
  }
}
module.exports = TimeController;
