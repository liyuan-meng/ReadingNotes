## 第七章 AngularJS 依赖注入(Dependency Injection)

> http://www.angularjs.net.cn/tutorial/17.html

### 一、DI简介

1. 对象或函数可以通过三种方式获得所依赖的对象（简称依赖）：

+ 创建依赖，通常是通过 new 操作符

+ 查找依赖，在一个全局的注册表中查阅它

+ 传入依赖，需要此依赖的地方等待被依赖对象注入进来（最理想）

2. 为了分离“创建依赖”的职责，每个 Angular 应用都有一个 injector对象。这个 injector 是一个服务定位器，负责创建和查找依赖。（译注：当你的app的某处声明需要用到某个依赖时，Angular 会调用这个依赖注入器去查找或是创建你所需要的依赖，然后返回来给你用）。

### 二、依赖注释（依赖声明的方法）

1. 推断依赖：让函数的参数名直接使用依赖名。（它对于压缩的 JavaScript 代码来说是不起作用的，因为压缩过后的 JavaScript 代码重命名了函数的参数名。这就让这种注释方式只对 pretotyping 和 demo级应用有用。）。

```js
  function MyController($scope, greeter) {
    ...
  }
```

2. $inject 注释：通过 $inject 属性进行标注，可以让重命名了参数名的压缩版的 JavaScript 代码能够正确地注入相关的依赖服务。$inject 注释和真实的函数声明中的参数保持同步。

```js
  var MyController = function(renamed$scope, renamedGreeter) {
    ...
  }
  MyController['$inject'] = ['$scope', 'greeter'];
  // 等价于MyController.$inject = ['$scope', 'greeter'];
```

3. 行内注释

使用$inject注释需要一个临时的变量，这会导致代码膨胀
```js
  var greeterFactory = function(renamed$window) {
    ...
  };
  
  greeterFactory.$inject = ['$window'];
  
  someModule.factory('greeter', greeterFactory);
```
所以有了行内注释
```js
  someModule.factory('greeter', ['$window', function(renamed$window) {
    ...
  }]);
```

### 三、使用DI的场景

#### 1. 在控制器中使用DI

控制器是负责应用操作逻辑的 JavaScript 类，推荐使用数组标记风格：

```js
  someModule.controller('MyController', ['$scope', 'dep1', 'dep2', function($scope, dep1, dep2) {
    ...
    $scope.aMethod = function() {
      ...
    }
    ...
  }]);
```

2. 在工厂方法中使用DI

工厂方法负责创建 Angular 中的绝大多数对象。例如指令，服务，和过滤器等。工厂方法是注册在模块之下的，推荐的声明方式如下：

```js
  angular.module('myModule', []).
    config(['depProvider', function(depProvider){
      ...
    }]).
    factory('serviceId', ['depService', function(depService) {
      ...
    }]).
    directive('directiveName', ['depService', function(depService) {
      ...
    }]).
    filter('filterName', ['depService', function(depService) {
      ...
    }]).
    run(['depService', function(depService) {
      ...
    }]);
```

## 第八章 AngularJS 模板（Templates）

1. 在一个简单的单页程序中，模板包含HTML，CSS和Angular指令，通常只是一个HTML文件(如 index.html)， 在一个更复杂的程序中，你可以在一个主要的页面用"零件(partials)"展示多个视图，这些 "零件(partials)"都是独立的HTML文件，在主页面可以包含(include) 这些"零件(partials)"页面，通过路由 $route 和 ngView指令结合。

2. Angular的模板是一个声明式的视图，它指定信息从模型、控制器变成用户在浏览器上可以看见的视图。在Angular中有以下元素属性可以直接在模板中使用:指令、表达式（{{}}）、过滤器、表单控件（ 验证用户输入）。

## 第九章 Angular 使用的CSS类

1. ng-scope：angular把这个类附加到所有创建了新作用域(Scope)的HTML元素上。

2. ng-binding：angular把这个类附加到所有通过 ng-bind 或 绑定了任何数据的元素上。

3. ng-invalid, ng-valid：angular把这个类附加到进行了验证操作的所有input组件元素上。

4. ng-pristine, ng-dirty：angular的input指令给所有新的、还没有与用户交互的input元素附加上ng-pristine类，当用户有任何输入时，则附加上 ng-dirty.

## 第九章 AngularJS 过滤器（Filters）

### 一、在模板中使用过滤器

```
{{ 表达式 | 过滤器名 }}
```

### 二、在控制器和服务中使用过滤器

1. 在控制器或者服务中添加以“<过滤器名>Filter”为名的依赖。例如，使用"numberFilter"为依赖时，会相应的注入number过滤器。

2. 例子：

```html
<!doctype html>
<html ng-app="FilterInControllerModule">
  <head>
    <script src="http://code.angularjs.org/1.2.25/angular.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div ng-controller="FilterController as ctrl">
      <div>
        All entries:
        <span ng-repeat="entry in ctrl.array">{{entry.name}} </span>
      </div>
      <div>
        Entries that contain an "a":
        <span ng-repeat="entry in ctrl.filteredArray">{{entry.name}} </span>
      </div>
    </div>
  </body>
</html>
```

```js
angular.module('FilterInControllerModule', []).
  controller('FilterController', ['filterFilter', function(filterFilter) {
    this.array = [
      {name: 'asnowwolf'},
      {name: 'why520crazy'},
      {name: 'joe'},
      {name: 'ckken'},
      {name: 'lightma'},
      {name: 'FrankyYang'}
    ];
    this.filteredArray = filterFilter(this.array, 'a');
  }]);
```

(1) 在模板中使用{{ctrl.array | filter:'a'}}`这种形式，这会以'a'作为查询字符串来进行过滤。但是，在视图模板中使用过滤器会在每次的更新中重新调用过滤器，当数组很大的时候，开销会很大。

(2) 上面的例子在控制器中直接调用了这个过滤器。 使用这种方式，控制器可以在需要的时候手动调用。

### 三、创建自定义过滤器

1. 仅仅需要在模块中注册一个新的过滤器工厂方法。其中使用了filterProvider。

+ 这个工厂方法应该返回一个以输入值为第一个参数的新过滤方法；过滤器中的参数都会作为附加参数传递给它。

2. 例子：

```html
<!doctype html>
<html ng-app="MyReverseModule">
  <head>
    <script src="http://code.angularjs.org/1.2.25/angular.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div ng-controller="Ctrl">
      <input ng-model="greeting" type="text"><br>
      未添加过滤器: {{greeting}}<br>
      逆置: {{greeting|reverse}}<br>
      逆置 + 大写: {{greeting|reverse:true}}<br>
    </div>
  </body>
</html>
```

```js
angular.module('myReverseFilterApp', [])
.filter('reverse', function() {
  return function(input, uppercase) {
    input = input || '';
    var out = '';
    for (var i = 0; i < input.length; i++) {
      out = input.charAt(i) + out;
    }
    // conditional based on optional argument
    if (uppercase) {
      out = out.toUpperCase();
    }
    return out;
  };
})
.controller('MyController', ['$scope', 'reverseFilter', function($scope, reverseFilter) {
  $scope.greeting = 'hello';
  $scope.filteredGreeting = reverseFilter($scope.greeting);
}]);
```




