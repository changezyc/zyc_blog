'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/me', controller.home.download);//下载我的简历
  router.get('/read', controller.read.addIndex);//每次请求该接口，访问量加1
  router.get('/juheapi/weather', controller.juheapi.weather);//调用天气接口
  router.get('/getworks', controller.getworks.getworks);//得到个人作品展示
  router.get('/article', controller.article.getarticle);//根据页数得到相应的4个博客
  router.get('/article/:id', controller.article.getById);//根据id访问相应的文章，把文章阅读量加1
  router.put('/article/:id', controller.article.like);//根据id把相应文章的点赞数加1
  router.get('/timelocus', controller.timelocus.getAll);//得到时间戳对应的学习日志
  router.post('/user/new', controller.user.newUser);//发送注册用户的表单
  router.post('/login', controller.user.login);//登录
  router.get('/user/:name', controller.user.getUserInfo);//通过name得到user的信息
  router.post('/upload', controller.user.loadimg);//上传头像
  router.put('/user/update', controller.user.updataUser);//更新个人信息
  router.get('/comment', controller.comment.getAll);//得到所有评论
  router.post('/comment', controller.comment.create);//创建一个新的评论
  router.put('/comment/:id', controller.comment.like);//把相应id的like字段加1。
};
