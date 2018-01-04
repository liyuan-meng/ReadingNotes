## 关于指令的一些总结

### 一、什么是指令？

指令可以简单理解成特定的DOM元素上运行的函数；也可以理解成将自定义的HTML标签解析成原始的标签，然后为其加入一些扩展的功能（函数）。

### 二、指令是如何工作的？

1. 首先是编译阶段，angularJs会遍历整个的文档并根据JavaScript中指令定义来处理页面上的指令。在遍历的过程中，有可能一层套着一层，一直延深处遍历。一但遍历和编译完毕就会返回一个叫做模板函数的函数。在这个函数没被返回（return）之前我们可以对编译后的DOM树进行修改。

2. 然后是链接阶段，通过调用上一步所说的链接函数来将模板与作用域链接起来。这会轮流调用每一个指令的链接函数，让每一个指令都能对DOM注册监听事件，和建立对作用域的的监听。这样最后就形成了作用域和DOM的动态绑定。

### 三、指令中的compile和link的区别

1. complie 函数的作用是对指令的模板进行转换。

2. link的作用是在模型和试图之间建立关联，包括在元素上注册事件监听。

3. scope在链接阶段才会绑定到元素上，因此complie阶段操作scope会出错。

4. 对于同一个指令的多个实例，complie只会执行一次；而link对于指令的每个实例都会执行一次。

5. 一般情况下我们只要编写link就够了。

6. 如果编写自定义的complie函数，自定义的link函数无效，因为complie函数应该返回一个link函数供后续处理。

### 四、独立作用域

scope属性值设置为true，作用是让自定义的每一个指令拥有独立的作用域，而不是共享一个作用域。

### 五、隔离作用域与数据绑定

1. 隔离作用域：创建可复用的组件时，需要具有不依赖于父级作用域的指令，这是我们通常将自定义指令中的scope属性值写成{}即可。

2. 数据绑定：虽然隔离了作用域，但是仍然希望使用父级作用域的属性，angular中可以通过绑定的方式为子作用域传入父作用域的属性。

#### （1）“@” 单向文本绑定
```js
app.directive('helloWorld', function() {
  return {
    scope: {
      color: '@colorAttr'
    },
    ....
    // the rest of the configurations
  };
});
```
```html
<body ng-controller="MainCtrl">
  <input type="text" ng-model="color" placeholder="Enter a color"/>
  <hello-world color-attr="{{color}}"/>
</body>
```
+ 在上面的例子中，我们指定了隔离scope中的属性color（存在于子作用域中）到HTML元素上的参数colorAttr。

+ 这是一种单向绑定，因为当父作用域的color属性变化时，隔离作用域中的属性color也跟着变化，我们也可以在指令内部监控属性color的变化，但是反过来，指令中的属性color变化并不会影响父作用域中的color属性。

 #### （2）"=" 双向绑定
 ```js
app.directive('helloWorld', function() {
  return {
    scope: {
      color: '='
    },
    ....
    // the rest of the configurations
  };
});
```
```html
<body ng-controller="MainCtrl">
  <input type="text" ng-model="color" placeholder="Enter a color"/>
  <hello-world color="color"/>
</body>
```
+ 与@不同，这种方式可以给隔离作用域中的color属性指定一个真实的数据模型，而不是简单的字符串。

+ 支持双向绑定，当父scope属性变化时，相对应的隔离scope中的属性也跟着改变，反之亦然。同样可以在指令中监视scope中属性的变化。

#### （3）"&" 访问父作用域中的函数

有时候从隔离scope中调用父scope中定义的函数是非常有必要的。为了能够访问外部scope中定义的函数，我们使用 &。

```js
var myapp=angular.module('myapp',[])
  .controller('myctrl',['$scope', function ($scope) {
   $scope.color='red';
   $scope.sayhello= function () {
    alert('hello');
   };
  }])
  .directive('hello', function () {
   return{
    restrict:'AECM',
    replace:true,
    template:'<button ng-click="sayhello()" style="background-color: {{color}}">click me</button>',
    scope:{
     color:'=',
     sayhello:'&'
    },
    link: function (scope,elements,attrs) {
     elements.bind('click', function () {
      elements.css('background-color','blue');
      scope.$apply(function () {
       scope.color='pink';
      })
     })
    }
   }
  })
<hello color="color" sayhello="sayhello()"></hello>
<input type="text" ng-model="color"/>
```
+ 们不仅需要在模板中使用ng-click指令，绑定上要调用的父scope中的方法，而且要在给当前元素添加一个属性，并且这个属性指向要调用的父scope的方法。

+ 指令scope的属性sayhello、当前元素的属性sayhello、模板绑定的事件方法名sayhello这三者要一致。那么这样我们就可以点击按钮，弹出一个对话框了。

### 3. 父scope，子scope以及隔离scope区别

默认情况下，指令不会创建一个新的scope，而是沿用父scope。但是在很多情况下，这并不是我们想要的。如果你的指令重度地使用父scope的属性、甚至创建新的属性，会污染父scope。让所有的指令都使用同一个父scope不会是一个好主意，因为任何人都可能修改这个scope中的属性。因此，下面的这个原则也许可以帮助你为你的指令选择正确的scope。

1.父scope(scope: false) – 这是默认情况。如果你的指令不操作父scoe的属性，你就不需要一个新的scope。这种情况下是可以使用父scope的。

2.子scope(scope: true) – 这会为指令创建一个新的scope，并且原型继承自父scope。如果你的指令scope中的属性和方法与其他的指令以及父scope都没有关系的时候，你应该创建一个新scope。在这种方式下，你同样拥有父scope中所定义的属性和方法。

3.隔离scope(scope:{}) – 这就像一个沙箱！当你创建的指令是自包含的并且可重用的，你就需要使用这种scope。你在指令中会创建很多scope属性和方法，它们仅在指令内部使用，永远不会被外部的世界所知晓。如果是这样的话，隔离的scope是更好的选择。隔离的scope不会继承父scope。















