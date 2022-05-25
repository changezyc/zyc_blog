'use strict';
const Controller = require('egg').Controller;
const Token = require('../middleware/token');
const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
class UserController extends Controller {
  async newUser() {
    const { ctx, app } = this;
    // reqData是收到的数据
    const reqData = ctx.request.body;
    const toNewUser = {
      name: reqData.name,
      password: reqData.password,
      nickname: reqData.nickname,
    };
    const signed = await app.mysql.get('user', { name: toNewUser.name });
    // 如果有这个名字了
    if (signed) {
      ctx.status = 401;
      ctx.body = '已被注册';
      return;
    }
    // 如果没有这个名字，加入这个用户
    const res = await ctx.service.user.newUser(toNewUser);
    // 401未授权：一般来说该错误消息表明你首先需要登录（输入有效的用户名和密码）。如果你不输入这些信息，就会有401错误，这意味着验证信息出错，服务器无法识别你的身份。
    if (res.affectedRows === 1) {
      ctx.body = {
        status: 200,
        data: reqData,
      };
    } else {
      ctx.status = 401;
      ctx.body = {
        msg: '注册失败',
      };
    }
  }
  async login() {
    const { ctx } = this;
    const { name, password } = ctx.request.body;
    const res = await ctx.service.user.getUserById(name);
    if (res === -1) {
      ctx.status = 403;
      ctx.body = {
        msg: '账号不存在',
      };
      return;
    }
    if (res.password === password) {
      const token = Token.encrypt({ id: res.name }, '15d');
      ctx.status = 200;
      ctx.body = {
        id: res.id,
        name: res.name,
        nickname: res.nickname,
        img: res.img,
        token,
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        msg: '账号或密码错误',
      };
      return;
    }
  }
  async getUserInfo() {
    const { ctx } = this;
    const res = await ctx.service.user.getUserById(ctx.params.name);
    if (res !== -1) {
      ctx.status = 200;
      ctx.body = {
        data: res,
      };
    } else {
      ctx.status = 401;
      ctx.body = {
        msg: '用户不存在',
      };
    }
  }
  async loadimg() {
    // const form = new multiparty.Form();
    const { ctx } = this;
    // egg getFileStream 方法自动创建文件可读流
    const stream = await ctx.getFileStream();
    // 创建文件写入路径
    const write = () => new Promise((resolve, reject) => {
      // stream.fieldname = iconvlite.decode(stream.fieldname, 'utf-8');
      // 获取文件名并加入随机字符串
      const filename = parseInt(Math.random() * 100) + '-' + new Date().getTime() + '-' + stream.filename;
      // 存储地址
      const target = path.join(`${__dirname}`, `../public/img/${filename}`);
      // 创建可写流
      const fileStrem = fs.createWriteStream(target);
      // 建立管道
      stream.pipe(fileStrem);
      // 监听错误
      let errFlag = false;
      fileStrem.on('error', err => {
        errFlag = true;
        sendToWormhole(stream);
        fileStrem.destroy();
        reject(ctx.body = err);
      });
      // 上传完成回写图片地址
      fileStrem.on('finish', () => {
        if (errFlag) return;
        resolve(ctx.body = { url: 'http://' + ctx.host + `/public/img/${filename}` });
      });
    });
    let result;
    try {
      result = await write();
    } catch (e) {
      console.log(e);
    }
    ctx.body = result;
  }
  async updataUser() {
    const { ctx } = this;
    ctx.status = 200;
    const dataUser = ctx.request.body;
    const res = ctx.service.user.updataUser(dataUser);
    if (!res) {
      ctx.status = 401;
      ctx.body = '修改失败';
      return;
    }
    ctx.status = 200;
    ctx.body = dataUser;
  }
}
module.exports = UserController;
