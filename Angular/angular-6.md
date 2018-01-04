## 第十二章 AngularJS 指令(Directives)

### 一、指令定义

+ 指令就是一些附加在HTML元素上的自定义标记（例如：属性，元素，或css类），它告诉AngularJS的HTML编译器 ($compile) 在元素上附加某些指定的行为，甚至操作DOM、改变DOM元素，以及它的各级子节点。当Angular 启动器引导应用程序时， HTML编译器就会遍历整个DOM，以匹配DOM元素里的指令。

### 二、指令的匹配

1. 指令的写法：建议使用破折号分隔符的方式(比如ng-bind for ngBind)

```html
<!-- 下面几种写法等价 -->
Hello <input ng-model='name'> <hr/>
<span ng-bind="name"></span> <br/>
<span ng:bind="name"></span> <br/>
<span ng_bind="name"></span> <br/>
<span data-ng-bind="name"></span> <br/>
<span x-ng-bind="name"></span> <br/>
```
  
2. 指令形式：元素名、属性、类名和注释，最好通过标签名和属性来使用指令而不要通过注释和类名。

```html
<my-dir></my-dir>
<span my-dir="exp"></span>
<!-- directive: my-dir exp -->
<span class="my-dir: exp;"></span>
```
### 三、文本和属性的绑定

1. 使用"ng-"
```html
<a ng-href="img/{{username}}.jpg">Hello {{username}}!</a>
```

2. 使用"ng-attr-"，在绑定的时候就会被应用到相应的未前缀化的属性上。
```html
<!-- 错误 -->
<svg>
  <circle cx="{{cx}}"></circle>
</svg>
```
```html
<!-- 正确 -->
<svg>
  <circle ng-attr-cx="{{cx}}"></circle>
</svg>
```

### 四、创建指令

+ 可以使用module.directive API来注册一个指令，指令注册在模块上。

+ module.directive接受规范化normalized 的指令名字和工厂方法。此工厂方法应该返回一个带有不同选项的对象来告诉 编译器$compile此指令被匹配上该做些什么。

+ 工厂函数仅在 编译器 第一次匹配到指令的时候调用一次. 可以在这里进行初始化的工作。 该函数使用$injector.invoke调用，所以它可以像控制器一样进行依赖注入。

+ 注意：尽量返回一个对象，而不要只返回一个函数。

+ 注意：最好前缀化自定义的指令名字，以避免同名冲突。

#### 1. 例子1
```html
<!doctype html>
<html ng-app="docsSimpleDirective">
<head>
    <meta charset="UTF-8">
    <script src="angular.js"></script>
    <script src="script.js"></script>
</head>
<body>
<div ng-controller="Ctrl">
    <div my-customer></div>
</div>
</body>
</html>
```
```js
angular.module('docsSimpleDirective', [])
    .controller('Ctrl', function ($scope) {
        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
    })
    .directive("myCustomer", function () {
        return {
            template: "<p>姓名：{{this.customer.name}} 地址：{{this.customer.address}}</p>"
        }
    });
```



















































