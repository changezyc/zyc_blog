'use strict';
const Controller = require('egg').Controller;
class CommentController extends Controller {
  async getAll() {
    const { ctx } = this;
    const res = await ctx.service.comment.getAll();
    ctx.status = 200;
    ctx.body = res;
  }
  async create() {
    const { ctx } = this;
    const auth = await ctx.service.user.userVer();
    if (!auth) {
      ctx.status = 403;
      ctx.body = '未登录';
      return;
    }
    const data = ctx.request.body;
    const res = await ctx.service.comment.create(data);
    if (res) {
      ctx.status = 200;
      ctx.body = '插入成功';
    } else {
      ctx.status = 401;
      ctx.body = '插入失败';
    }
  }
  async like() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.service.comment.like(id);
    if (!res) {
      ctx.status = 401;
      ctx.body = '点赞失败';
    }
    ctx.body = res;
  }
}
module.exports = CommentController;
