## 第十三章 组件

> https://docs.angularjs.org/guide/component

+ 组件的优点：
  + 比指令的配置更加简单
  + 优化架构
  + 编写组件指令更易于angular升级
+ 什么时候使用组件：
  + 对于需要在编译和预链接函数中执行操作的指令，因为它们不可用
  + 当你需要先进的指令定义选项，如优先级，终端，多元素
  + 当你想要一个由属性或CSS类触发的指令，而不是一个元素

### 一、创建组件
```html
<!-- index.html -->
<!doctype html>
<html ng-app="heroApp">
<head>
    <meta charset="UTF-8">
    <script src="angular.js"></script>
    <script src="index.js"></script>
    <script src="heroDetail.js"></script>
</head>
<body>
<div ng-controller="MainCtrl as ctrl">
    <b>Hero</b><br>
    <hero-detail hero="ctrl.hero2"></hero-detail>
</div>
</body>
</html>
```
```html
<!-- heroDetail.html -->
<span>Name: {{$ctrl.hero.name}}</span>
```
```js
//index.js
angular.module('heroApp', []).controller('MainCtrl', function MainCtrl() {
  this.hero = {
    name: 'Spawn'
  };
});
```
```
//heroDetail.js
angular.module('heroApp').component('heroDetail', {
  templateUrl: 'heroDetail.html',
  bindings: {
    hero: '='
  }
});
```


























