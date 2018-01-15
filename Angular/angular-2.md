## 第三章 AngularJS Html编译（HTML Compiler）

> http://www.angularjs.net.cn/tutorial/15.html

1. 所有的编译在web浏览器中进行，没有任何服务器端的预编译的介入。

### 一、编译器

1. 编译器是 Angular 提供的一项服务，用来遍历DOM节点，查找特定的属性。编译过程分为两个阶段：

+ 编译：遍历DOM节点，收集所有的指令，返回一个连接函数（link func）

+ 连接：将上一步收集到的每个指令与其所在的作用域（scope）连接生成一个实时视图。任何作用域中的模型改变都会实时在视图中反映出来，同时任何用户与视图的交互则会映射到作用域的模型中。这样，作用域中的数据模型就成了唯一的数据源。

2. 绝大多数模板引擎系统采用的是把字符串模板和数据拼接，然后输出一个新的字符串，在前端这个新的字符串作为元素的 innerHTML 属性的值。Angular 则不同。它的编译器直接使用DOM作为模板而不是用字符串模板。同时，我们不使用 innerHTML 属性，这样也就不会影响用户输入了。

3. 手动调用 $compile 时，用 angular.element 将字符串转化为DOM。如果你传给它一个字符串是要报错的.

4. 编译阶段：

+ $compile 遍历DOM节点，匹配指令。

+ 执行每个指令的 compile 函数。返回一个 link 函数。

+ $compile 调用第二步返回的连接函数，将模板和对应的作用域连接。

## 第四章 数据绑定

> http://www.angularjs.net.cn/tutorial/10.html

### 一、典型模板系统中的数据绑定

单向绑定：将模板和数据合并起来加入到视图中去。

### 二、Angular模板中的数据绑定

1. 模板（指未经编译的附加了标记和指令的HTML）是在浏览器中编译的。

2. 编译阶段生成了动态(live)视图。保持视图动态的原因是，任何视图中的改变都会立刻反映到数据模型中去，任何数据模型的改变都会传播到视图中去。

3. 将视图作为数据模型的一种映射，使得控制器完全与视图分离，而不必关心视图的展现。这使测试变得小菜一碟。

## 第五章 AngularJS 控制器(Controllers)和服务（Service）

> http://www.angularjs.net.cn/tutorial/2.html

1. 在Angular中，控制器就像 JavaScript 中的构造函数一般，用来增强 Angular作用域(scope)。

2. 当一个控制器通过 ng-controller 指令被添加到DOM中时，ng 会调用该控制器的构造函数来生成一个控制器对象。这样，就创建了一个新的子级 作用域(scope)。在这个构造函数中，作用域(scope)会作为$scope参数注入其中，并允许用户代码访问它。

3. 使用控制器做什么？

+ 初始化 $scope 对象。

+ 为 $scope 对象添加行为（方法）。

### 一、初始化 $scope 对象

1. 通过在 $scope 对象上添加属性为Angular的 $scope 对象设置初始状态。

2. 使用内联注入的方式声明 GreetingCtrl 依赖于Angular提供的 $scope 服务。如下：

```js
angular.module('myApp',[]).controller('GreetingCtrl', ['$scope', function($scope) {
        $scope.greeting = 'Hola!';
    }]);
```

### 三、为 $scope 对象添加行为

1. 被添加到 scope 的对象（或者原生类型的变量）将成为 scope 的属性，作为数据模型供模板/视图调用。

任何方法被添加到 scope 后，也能在模板/视图中通过Angular表达式或是Angular的事件处理器（如：ngClick）调用。

### 四、正确使用控制器

1. 控制器不应被赋予太多的责任和义务，它只需要负责一个单一视图所需的业务逻辑。将那些不属于控制器的逻辑都封装到服务（services）中，然后在控制器中通过依赖注入调用相关服务。

2. 不要使用控制器的场合：
 
+  任何形式的DOM操作：控制器只应该包含业务逻辑。DOM操作则属于应用程序的表现层逻辑操作。

+ 格式化输入：使用 angular表单控件 代替。

+ 过滤输出：使用 angular过滤器 代替。

+ 在控制器间复用有状态或无状态的代码：使用angular服务 代替。

+ 管理其它部件的生命周期（如手动创建 service 实例） 。

### 五、将控制器与scope对象相关联

1. 实现控制器和 scope 对象的关联

+ ngController指令 这个指令就会创建一个新的 scope。

+ $route路由服务。

2. 控制器继承

+ 在不同层级的DOM结构中添加控制器。由于 ng-controller 指令会创建新的子级 scope ，这样就会获得一个与DOM层级结构相对应的的基于继承关系的 scope 层级结构。（由于 Js 是基于原型的继承，所以底层（内层）控制器的 $scope 能够访问在高层控制器的 scope 中定义的属性和方法。

+ root scope，所有作用域的“根”。

### 六、控制器的单元测试

1. 注入 $rootScope 以及 $controller的方法：

```js

// 控制器定义

angular.module('myApp',[]).controller('MyController', function($scope) {
      $scope.spices = [{"name":"pasilla", "spiciness":"mild"},
                       {"name":"jalapeno", "spiceiness":"hot hot hot!"},
                       {"name":"habanero", "spiceness":"LAVA HOT!!"}];
      $scope.spice = "habanero";
    });
```

```js

// 控制器测试

describe('myController function', function() {
 
  describe('myController', function() {
    var $scope;
 
    beforeEach(module('myApp'));
 
    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller('MyController', {$scope: $scope});
    }));
 
    it('should create "spices" model with 3 spices', function() {
      expect($scope.spices.length).toBe(3);
    });
 
    it('should set the default value of spice', function() {
      expect($scope.spice).toBe('habanero');
    });
  });
});
```

2. 如果有需要测试嵌套关系的控制器，那么在测试代码中，得创建对应于 scope 层级结构的测试代码：

```js
describe('state', function() {
    var mainScope, childScope, grandChildScope;
 
    beforeEach(module('myApp'));
 
    beforeEach(inject(function($rootScope, $controller) {
        mainScope = $rootScope.$new();
        $controller('MainCtrl', {$scope: mainScope});
        childScope = mainScope.$new();
        $controller('ChildCtrl', {$scope: childScope});
        grandChildScope = childScope.$new();
        $controller('GrandChildCtrl', {$scope: grandChildScope});
    }));
 
    it('should have over and selected', function() {
        expect(mainScope.timeOfDay).toBe('morning');
        expect(mainScope.name).toBe('Nikki');
        expect(childScope.timeOfDay).toBe('morning');
        expect(childScope.name).toBe('Mattie');
        expect(grandChildScope.timeOfDay).toBe('evening');
        expect(grandChildScope.name).toBe('Gingerbreak Baby');
    });
});
```
### 七、服务

#### 1.使用factory()函数创建服务

```js
myModule.factory('$myService', funcion() {
   var myService = {
        foo.bar();
   };
   ·····
   return myService;
})
```
+ factory()函数需要在代码中构造一个对象并返回。 

#### 2.使用service()函数创建服务
```js
myModule.service('$myService', funcion() {
   this.foo = "bar";
})
```
+ service()函数基本等同于factory()函数，不一样的是service()函数不需要返回一个新的对象，只要将属性附加到this上就可以。
+ service()函数是一项残留的技术，在使用this的时候一定要小心
+ 所有使用factory()函数注册的服务都可以使用service()函数注册，不必做任何改动，反之不一定成立。这是因为JavaScript构造器返回一个值，该值可能是对象或者数组，那么new操作符产生的结果对象就是这个值。

#### 3.使用provider()函数创建服务。
```js
angular.module('myModule', []).config(['$provide', function($provide) {
  $provide.factory('serviceId', function() {
    var shinyNewServiceInstance;
    // factory function body that constructs shinyNewServiceInstance
    return shinyNewServiceInstance;
  });
}]);
```














