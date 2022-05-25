'use strict';
const Controller = require('egg').Controller;
class ArticleController extends Controller {
  async getarticle() {
    const { ctx } = this;
    const nowpage = ctx.query.page;
    const res = await ctx.service.article.getAll(nowpage);
    ctx.body = {
      status: 200,
      data: res,
    };
  }
  async getById() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.service.article.getById(id);
    ctx.body = {
      id: 200,
      data: res,
    };
  }
  async like() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.service.article.like(id);
    if (!res) {
      ctx.status = 401;
      ctx.body = '点赞失败';
      return;
    }
    ctx.status = 200;
    ctx.body = true;
  }
}
module.exports = ArticleController;
