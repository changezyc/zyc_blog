'use strict';

/** @type Egg.EggPlugin */
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};
// 需要配置这个
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
// 开启跨域插件
exports.cors = {
  enable: true,
  package: 'egg-cors',
};