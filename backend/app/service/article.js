'use strict';
const Service = require('egg').Service;
class DemoService extends Service {
  async getAll(nowpage = 1) {
    const { app } = this;
    const res = await app.mysql.select('article', {
      limit: 4,
      offset: (nowpage - 1) * 4,
    });
    return res;
  }
  async getById(getid) {
    const { app } = this;
    const res = await app.mysql.get('article', {
      id: getid,
    });
    const options = {
      where: {
        id: getid,
      },
    };
    const row = {
      visited: res.visited + 1,
    };
    await app.mysql.update('article', row, options);
    return res;
  }
  async like(id) {
    const { app } = this;
    const articleInfo = await app.mysql.get('article', { id });
    if (!articleInfo) {
      return false;
    }
    const row = {
      likeCount: articleInfo.likeCount + 1,
    };
    const options = {
      where: {
        id,
      },
    };
    const res = await app.mysql.update('article', row, options);
    return res.affectedRows === 1;
  }
}
module.exports = DemoService;
