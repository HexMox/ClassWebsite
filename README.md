#网站文档

##前端
###相关技术：
* CSS框架： Foundation
* 标准意义上的DOM：JQuery + gsap.js
* Less + CoffeeScript

##后端
###相关技术：
* NodeJS + Express + MongoDB
* MVC架构

###模块设计：
注：请先初始化数据库：
```javascript
node initDb.js
```
* db
 - `getDb` 数据库（单）连接
 - `closeDb` 断开数据库

* user
 - `User` 构造函数
 - `User.prototype.save`
 - `User.getByName`
 - `User.getById`
 - `User.getAll`
 - `User.prototype.change`
 - `User.deleteById`
 - `User.deleteByName`
 - `User.deleteAll`

* quesionnaire & quesionnaireResult

###路由器设计：
* index 基本控制及错误处理

* questionnaire 问卷页面

* topic 贴吧页面

##测试与工作流：
* grunt
* git
