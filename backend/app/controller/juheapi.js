/* eslint-disable strict */
const Controller = require('egg').Controller;
// 调接口之前一定要将下面的key改成自己在聚合api申请的 不然很容易到上限
const JUHE_WEATER_KEY = '2e1f9f0ee4b4795b0dc19ccb4ede38f2';
class JuheapiController extends Controller {
  async weather() {
    const { ctx } = this;
    const url = `http://apis.juhe.cn/simpleWeather/query?city=%E5%90%88%E8%82%A5&key=${JUHE_WEATER_KEY}`;
    const res = await this.ctx.curl(url, { dataType: 'json' });
    ctx.body = {
      status: 200,
      data: res.data,
    };
  }
}
module.exports = JuheapiController;
