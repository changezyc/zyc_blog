'use strict';
const Controller = require('egg').Controller;
class GetWorksController extends Controller {
  async getworks() {
    const { ctx } = this;
    const res = await ctx.service.getworks.getworks();
    res.forEach(item => {
      item.tags = item.tags.split(',');
      item.images = item.images.split(',');
    });
    ctx.body = {
      status: 200,
      data: res,
    };
  }
}
module.exports = GetWorksController;
