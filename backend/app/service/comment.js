'use strict';
const Service = require('egg').Service;
class CommentService extends Service {
  async getAll() {
    const { app } = this;
    const res = await app.mysql.select('comment');
    return res;
  }
  async create(data) {
    const { app } = this;
    const res = await app.mysql.insert('comment', data);
    return res.affectedRows === 1;
  }
  async like(id) {
    const { app } = this;
    const commentInfo = await app.mysql.get('comment', { id });
    if (!commentInfo) {
      return false;
    }
    const row = {
      likes: commentInfo.likes + 1,
    };
    const options = {
      where: {
        id,
      },
    };
    const res = await app.mysql.update('comment', row, options);
    return res.affectedRows === 1;
  }
}
module.exports = CommentService;
