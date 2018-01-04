## 第十二章 AngularJS 指令(Directives)

> https://docs.angularjs.org/guide/directive
> http://www.angularjs.net.cn/tutorial/5.html

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

#### 1. 例子1 使用template
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

### 2. 例子2 使用templateUrl
```html
<!-- index.html -->
<!doctype html>
<html ng-app="docsTemplateUrlDirective">
<head>
    <meta charset="UTF-8">
    <script src="angular.js"></script>
    <script src="script.js"></script>
</head>
<body>
<div ng-controller="Ctrl">
    <my-customer></my-customer>
</div>
</body>
</html>
```
```html
<!-- my-customer.html -->
Name: {{customer.name}} Address: {{customer.address}}
```
```js
// script.js
angular.module('docsTemplateUrlDirective', [])
    .controller('Ctrl', function($scope) {
        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
    })
    .directive('myCustomer', function() {
        return {
            restrict: 'E',
            templateUrl: 'my-customer.html'
        };
    });
```
+ 选项restrict可以设置成以下方式：
  + 'A'- 仅匹配属性名
  + 'E'- 仅匹配元素名
  + 'C' - 匹配类名
  + 'AE' - 名又匹配元素名

### 3. 给指令一个独立的作用域isolate scope

#### 方法一：需要定义两个controller，不推荐

```html
<!doctype html>
<html ng-app="docsScopeProblemExample">
<head>
    <meta charset="UTF-8">
    <script src="angular.js"></script>
    <script src="script.js"></script>
</head>
<body>
<div ng-controller="NaomiController">
    <my-customer></my-customer>
</div>
<hr>
<div ng-controller="IgorController">
    <my-customer></my-customer>
</div>
</body>
</html>
```
```html
<!-- my-customer.html -->
Name: {{customer.name}} Address: {{customer.address}}
```
```js
// script.js
angular.module('docsScopeProblemExample', [])
    .controller('NaomiController', ['$scope', function($scope) {
        $scope.customer = {
            name: 'Naomi',
            address: '1600 Amphitheatre'
        };
    }])
    .controller('IgorController', ['$scope', function($scope) {
        $scope.customer = {
            name: 'Igor',
            address: '123 Somewhere'
        };
    }])
    .directive('myCustomer', function() {
        return {
            restrict: 'E',
            templateUrl: 'my-customer.html'
        };
    });
```

#### 方法二：通过使用指令的scope，把指令的作用域与外部的作用域隔离开来，然后映射外部的作用域到指令内部的作用域。

```html
<!doctype html>
<html ng-app="docsIsolationExample">
<head>
    <meta charset="UTF-8">
    <script src="angular.js"></script>
    <script src="script.js"></script>
</head>
<body>
<div ng-controller="Controller">
    <my-customer info="naomi"></my-customer>
    </br>
    <my-customer info="vojta"></my-customer>
</div>
</body>
</html>
```
```html
<!-- my-customer.html -->
Name: {{customerInfo.name}} Address: {{customerInfo.address}}
```
```js
// script.js
angular.module('docsIsolationExample', [])
    .controller('Controller', ['$scope', function($scope) {
        $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
        $scope.vojta = { name: 'Vojta', address: '3456 Somewhere Else' };
    }])
    .directive('myCustomer', function() {
        return {
            restrict: 'E',
            scope: {
                customerInfo: '=info'
            },
            templateUrl: 'my-customer.html'
        };
    });
```

### 4.创建一个操作DOM的指令

+ 使用link

```html
<!doctype html>
<html ng-app="docsIsolationExample">
<head>
    <meta charset="UTF-8">
    <script src="angular.js"></script>
    <script src="script.js"></script>
</head>
<body>
<div ng-controller="Controller">
    Date format: <input ng-model="format"> <hr/>
    Current time is: <span my-current-time="format"></span>
</div>
</body>
</html>
```
```js
angular.module('docsIsolationExample', [])
    .controller('Controller', ['$scope', function($scope) {
        $scope.format = 'M/d/yy h:mm:ss a';
    }])
    .directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
        function link(scope, element, attrs) {
            var format,timeoutId;

            function updateDate() {
                element.text(dateFilter(new Date(), format));
            }

            timeoutId = $interval(function () {
                updateDate();
            },1000);

            scope.$watch(attrs.myCurrentTime, function (value) {
            //attrs是一个对象，它的键是myCurrentTime，值是format。
                console.log(attrs); 
                format = value;
                updateDate();
            });

            element.on('$destroy', function () {
                $interval.cancel(timeoutId);
            })
        }
        return {
            link: link
        };
    }]);
```
注意的地方：
+ 指令修改DOM通常是在link选项中，function link(scope,element,attrs) {...}
  + scope 是一个Angular的scope对象；
  + element 指令匹配的jqLite封装的元素(angular内部实现的类jquery的库) ；
  + * attrs 是一个带有规范化后属性名字和相应值的对象。
+ module.directive函数的参数也是通过依赖注入获得的， 因此可以在link函数内部使用$timeout 和dateFilter 服务。
+ 当一个被angular编译过的DOM元素被移除的时候， 它会触发一个$destroy 事件，同样的，当一个angular作用域被移除的时候， 它会向下广播$destroy 事件到所有下级作用域。注册在元素和作用域上的监听器在它们被移除的时候，会自动清理掉， 但是假如注册一个事件在服务或者没有被删除的DOM节点上，就必须手工清理，否则会有内存泄露的风险。
+ 指令应该自己管理自身分配的内存。当指令被移除时，可以使用element.on('$destroy', ...) 或 scope.$on('$destroy', ...)来执行一个清理的工作。

### 5. 创建包含其他元素的指令

#### (1)仅当要创建一个包裹任意内容的指令的时候使用transclude: true。

```html
<!doctype html>
<html ng-app="docsTransclusionDirective">
<head>
    <meta charset="UTF-8">
    <script src="angular.js"></script>
    <script src="script.js"></script>
</head>
<body>
<div ng-controller="Controller">
    <my-dialog>Check out the contents, {{name}}!</my-dialog>
</div>
</body>
</html>
```
```html
<!-- my-customer.html -->
<div class="alert" ng-transclude></div>
```
```js
//script.js
angular.module('docsTransclusionDirective', [])
    .controller('Controller', ['$scope', function($scope) {
        $scope.name = 'Tobias';
    }])
    .directive('myDialog', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            templateUrl: 'my-customer.html'
        };
    });
```
说明：

+ transclude 选项改变了指令相互嵌套的方式，他使指令的内容拥有任何指令外部的作用域， 而不是内部的作用域。因此带有transclude个选项的指令所包裹的内容能够访问指令外部的作用域
+ 指令不创建自己的scope（scope:false或者省略不写），就会影响外部的scope，所以如果在上面的js的倒数第四行插入
```js
link: function(scope) {
  scope.name = 'Jeff';
}
```
那么输出将会是Jeff，因为指令和外部共享同一个作用域。如果加上scope:{}，那么指令创建了自己的作用域，不会对外部产生影响，输出依然是Tobias。

#### (2)当指令想要开放一个API去绑定特定的行为，在scope选项中使用&prop。

```html
<!doctype html>
<html ng-app="docsIsoFnBindExample">
<head>
    <meta charset="UTF-8">
    <script src="angular.js"></script>
    <script src="script.js"></script>
</head>
<body>
<div ng-controller="Controller">
    {{message}}
    <my-dialog ng-hide="dialogIsHidden" on-close="hideDialog(message)">
        Check out the contents, {{name}}!
    </my-dialog>
</div>
</body>
</html>
```
```html
<!-- my-customer.html -->
<div class="alert">
    <a href class="close" ng-click="close({message: 'closing for now'})">&times;</a>
    <div ng-transclude></div>
</div>
```
```js
//script.js
angular.module('docsIsoFnBindExample', [])
    .controller('Controller', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.name = 'Tobias';
        $scope.message = '';
        $scope.hideDialog = function(message) {
            $scope.message = message;
            $scope.dialogIsHidden = true;
            $timeout(function() {
                $scope.message = '';
                $scope.dialogIsHidden = false;
            }, 2000);
        };
    }])
    .directive('myDialog', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                'close': '&onClose'
            },
            templateUrl: 'my-customer.html'
        };
    });
```
+ 我们想要通过在指令的作用域上调用我们传进去的函数hideDialog(message)，但是这个函数本该运行在定义时候的上下文。在上文的例子中， 我们使用了&prop ，& 绑定了一个函数到独立作用域， 允许独立作用域调用它，同时保留了原来函数的作用域(这里的作用域都是指$scope)。 所以当一个用户点击x时候，就会运行Ctrl控制器的close函数。
  
#### 6.创建一个带事件监听器的指令
```html
<!doctype html>
<html ng-app="dragModule">
<head>
    <meta charset="UTF-8">
    <script src="angular.js"></script>
    <script src="script.js"></script>
</head>
<body>
<span my-draggable>Drag Me</span>
</body>
</html>
```
```js
<!-- 实现一个可拖拽的span -->
angular.module('dragModule', [])
    .directive('myDraggable', ['$document', function($document) {
        return {
            link: function(scope, element, attr) {
                var startX = 0, startY = 0, x = 0, y = 0;

                element.css({
                    position: 'relative',
                    border: '1px solid red',
                    backgroundColor: 'lightgrey',
                    cursor: 'pointer'
                });

                element.on('mousedown', function(event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;
                    element.css({
                        top: y + 'px',
                        left:  x + 'px'
                    });
                }

                function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);
                }
            }
        };
    }]);
```
#### 7.创建可以通信的指令














































