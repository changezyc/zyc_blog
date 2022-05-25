'use strict';
const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 在controller的接口使用service, 下面这段代码没有意义，就是测试一下接口
    const res = await ctx.service.product.index();
    await ctx.render('index.html', {
      res,
    });
  }
  async download() {
    const { ctx } = this;
    // path.resolve() 方法将路径或路径片段的序列解析为绝对路径。
    const filePath = path.resolve(this.app.config.static.dir, '前端开发工程师_左艺聪.pdf');
    //下载附件，传的参代表客户端显示的文件名
    ctx.attachment('前端开发工程师_左艺聪.pdf');
    ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = fs.createReadStream(filePath);
  }
}
module.exports = HomeController;
