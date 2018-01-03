## 第六章 AngularJS 作用域(Scope)

> http://www.angularjs.net.cn/tutorial/12.html

+ 是一个存储应用数据模型的对象

+ 为 表达式 提供了一个执行上下文

+ 作用域的层级结构对应于 DOM 树结构

+ 作用域可以监听 表达式 的变化并传播事件

### 一、作用域有什么

1. 作用域提供了 ($watch) 方法监听数据模型的变化

2. 作用域提供了 ($apply) 方法把不是由Angular触发的数据模型的改变引入Angular的控制范围内（如控制器，服务，及Angular事件处理器等）

3. 作用域提供了基于原型链继承其父作用域属性的机制，就算是嵌套于独立的应用组件中的作用域也可以访问共享的数据模型（这个涉及到指令间嵌套时作用域的几种模式）

4. 作用域提供了 表达式 的执行环境。

### 二、作用域作为数据模型使用

1. 作用域是Web应用的控制器和视图之间的粘结剂：在自定义指令中，处在模版的 链接(linking) 阶段时， 指令(directive)会设置一个 $watch 函数监听着作用域中各表达式（注：这个过程是隐式的）。这个 $watch 允许指令在作用域中的属性变化时收到通知， 进而让指令能够根据这个改变来对DOM进行重新渲染，以便更新已改变的属性值。

2. 控制器中也有指向作用域的引用，但是控制器与指令是相互分离的，而且它们与视图之间也是分离的，使耦合度降低。

```
控制器 --> 作用域 --> 视图（DOM）

指令 --> 作用域 --> 视图（DOM）
```
3. 例子：

```html
<!doctype html>
<html ng-app>
  <head>
    <script src="http://code.angularjs.org/1.2.25/angular.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div ng-controller="MyController">
      Your name:
        <input type="text" ng-model="username">
        <button ng-click='sayHello()'>greet</button>
      <hr>
      
    </div>
  </body>
</html>
```
```js
function MyController($scope) {
  $scope.username = 'World';
 
  $scope.sayHello = function() {
    $scope.greeting = 'Hello ' + $scope.username + '!';
  };
}
```
(1) 从视图的角度看:

+ 控制器往作用域中写属性

+ 控制器往作用域中写方法

(2) 从视图的角度看

+ input 中的渲染逻辑：通过 ng-model 进行的作用域和 视图中某表单元素的双向绑定.。

+ button 中的逻辑。

+ {{greeting}} 的渲染逻辑

(3) 作用域(scope)对象以及其属性是视图渲染的唯一数据来源。

### 三、作用域分层结构

Angular需要经历取值和计算两个阶段才能最终在视图渲染结果。取值的阶段就是根据作用域的这个层级结构（或树状结构）来进行的。

+ 首先，Angular在该表达式当前所在的DOM节点所对应的作用域中去找有没有 name 这个属性

+ 如果有，Angular返回取值，计算渲染；如果在当前作用域中没有找到，那么Angular继续往上一层的父级作用域中去找 name 属性，直到找到为止，最后实在没有，那就到达 $rootScope 了。

### 四、从DOM中抓取作用域

1. 作用域对象是与指令或控制器等Angular元素所在的DOM节点相关联所以DOM节点上可以抓取到作用域这个对象。

2. $rootScope在 ng-app 指令所在的那个DOM节点之中

### 五、基于作用域的事件传播

1. 作用域可以像DOM节点一样，进行事件的传播。主要是有两个方法：

+ broadcasted ：从父级作用域广播至子级 scope

+ emitted ：从子级作用域往上发射到父级作用域

2. 例子

```html
<!doctype html>
<html ng-app>
  <head>
    <script src="http://code.angularjs.org/1.2.25/angular.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div ng-controller="EventController">
      Root作用域<tt>MyEvent</tt> count: 
      <ul>
        <li ng-repeat="i in [1]" ng-controller="EventController">
          <button ng-click="$emit('MyEvent')">$emit('MyEvent')</button>
          <button ng-click="$broadcast('MyEvent')">$broadcast('MyEvent')</button>
          <br>
          Middle作用域<tt>MyEvent</tt> count: 
          <ul>
            <li ng-repeat="item in [1, 2]" ng-controller="EventController">
              Leaf作用域<tt>MyEvent</tt> count: 
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </body>
</html>
```
```js
function EventController($scope) {
  $scope.count = 0;
  $scope.$on('MyEvent', function() {
    $scope.count++;
  });
}
```

+ $scope 中有$emit 和 $broadcast方法，因此可以写在 html 模版中。

+ 同一个控制器 EventController 被用在了三个不同的DOM节点中（这是为了省事，通常不这样写的）

+ 上面的事件无非就是点击两个按钮，分别出发广播/冒泡（发射）事件，然后在各节点设置监听，这里只要用 $scope.$on() 方法（注：如果在指令中，可能就是 scope.$on()），就可以进行监听了

### 六、作用域的生命周期

#### 1. 作用域的执行上下文

+ 通过使用 $apply 方法让上下文执行环境重新进入到Angular的上下文中（注：用法 $scope.$apply()），从而保证Angular可以知晓数据模型的任何改变。

+ 脏值检查(dirty checking)：在Angular的 $digest 阶段，scope 检查所有通过 $watch() 监测的表达式（或别的数据）并将其与它们自己之前的值进行比较。

+ $digest 阶段可以认为是一个必要的缓冲阶段，因为有这个延迟，我们可以等待几个或多个数据模型的改变/更新攒到一块， 合并起来放到一个 $watch() 中去监测，大大提高了效率。

#### 2. scope的生命周期

（1）创建期：root scope 是在应用程序启动时由 $injector 创建的。另外，在指令的模版链接阶段（template linking），指令会创建一些新的子级 scope。

（2）注册$watch：在模版链接阶段（template linking），指令会往作用域中注册 监听器(watch)，而且不止一个。这些 $watch 用来监测数据模型的更新并将更新值传给DOM。

（3）数据模型变化：要想让数据模型的变化能够很好的被Angular监测，需要让它们在 scope.$apply() 里发生。 当然，对于Angular本身的API来讲，Angular已经隐式的将数据模型变化的操作放到 $apply() 中。

（4）数据模型变化监测：脏值检查(dirty checking)。

（5）销毁作用域：当子级作用域不再需要的时候，这时候创建它们的就会通过scope.$destroy() 这个方法把它们回收或是销毁（注：比如在指令中，创建是隐式的，销毁可以不但可以是隐式的，也可以是显式的，如 scope.$destroy()）。销毁之后，$digest() 方法就不会继续往子级作用域传播，并且通过垃圾回收释放内存。

#### 5. 作用域和指令

（1）监测型 指令 ：像双大括号表达式 {{expression}}。通过在 $watch() 方法中注册监听处理器来监听控制器或是别的操作引起的表达式值改变，进而来更新视图。

（2）监听型 指令：像 ng-click，当DOM监听到 ng-click 被触发时，这个指令就会通过 $apply() 方法执行相关的表达式操作或是别的操作进而更新视图。


#### 6. 可以创建作用域的指令

通常境况下， 指令和作用域相互作用，但并不创建作用域的新实例，但是也有例外，比如： ng-controller 和 ng-repeat 等，则会创建新的下级作用域，并且把这个新创建的作用域和相应的DOM元素相关联；DOM元素通过调用 angular.element(aDomElement).scope()抓取作用域。

#### 7. 作用域与控制器

作用域和控制器的交互：

+ 控制器通过作用域对模版暴露一些方法供其调用

+ 控制器中定义的一些行为或操作逻辑可以改变作用域下的数据模型。

+ 控制器可以设置 监听器 来监听作用域中的数据模型(model)。这些监听器在控制器的相关方法被调用时立即执行。

#### 8. 作用域$watch 性能

用 $watch 进行脏值检查时，一定不要做任何的DOM操作，因为DOM操作会极大的拖慢整体性能。

### 七、与浏览器事件轮循整合

1. 调用 scope.$apply(stimulusFn)进入Angular执行上下文；

2. 进入 $apply() 之后，Angular执行 stimulusFn()；

3. Angular进入 $digest 轮循，直到异步操作队列 evalAsync 为空以及 $watch 不再监测到任何数据模型变化为止；

4. $evalAsync 队列用来安排那些待进入Angular$digest 的异步操作；

5. $watch 列表存放了一组可能会改变的Angular的表达式集合。如果数据模型变化被监测到，那么 $watch 函数被调用进而用新值更新DOM；

6. 一旦Angular的 $digest 轮循完成，那么应用程序的执行就会离开Angular及 JavaScript的上下文。然后浏览器重新渲染DOM来反映发生的变化。

