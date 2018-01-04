## 第一章 引导程序

> http://www.angularjs.net.cn/tutorial/16.html
 
 ### 一、Angular script 标签
 
 1. 在HTML页面底部放置 script 标签。这样可以优化应用的加载时间。
 
 2. 把 ng-app 放在应用的根结点，自动启动 Angular。
 
 ```html
<html ng-app id="ng-app">
```

### 二、自动初始化

1. 条件：在 DOMContentLoaded 事件触发时，或者在 angular.js 脚本被执行的同时如果 document.readyState 被置为 'complete'。

2. Angular在初始化时找到 ng-app 指令，会做下面几件事：

+ 加载 ng-app 指令所指定的 模块。

+ 创建应用所需的 injector。

+ 以 ng-app 所在的节点为根节点，开始遍历并编译DOM树（ng-app 指出了应用的哪一部份开始时 Angular 去编译的）。

### 三、手动初始化

1. 目的：可能会是你想要在你的应用中使用脚本加载器，或者你可能想要在 Angular 编译页面之前执行一些别的操作。

### 四、延迟启动

1. 这个特色可以让像 Batarang 一样的测试工具横插一杠进入 Angular 的引导进程，并且溜进模块中的DI注册机制中，这样就可以替换或者增强DI提供的服务。

## 第二章 概念概述

> http://www.angularjs.net.cn/tutorial/18.html

### 一、概念

1. 模板(Template)：带有Angular扩展标记的HTML。

1. 指令(Directive)：用于通过自定义属性和元素扩展HTML的行为。

1. 模型(Model)：用于显示给用户并且与用户互动的数据。

1. 作用域(Scope)：用来存储模型(Model)的语境(context)。模型放在这个语境中才能被控制器、指令和表达式等访问到。

1. 表达式(Expression)：模板中可以通过它来访问作用域（Scope）中的变量和函数。

1. 编译器(Compiler)：用来编译模板(Template)，并且对其中包含的指令(Directive)和表达式(Expression)进行实例化。

1. 过滤器(Filter)：负责格式化表达式(Expression)的值，以便呈现给用户。

1. 视图(View)：用户看到的内容（即DOM）。

1. 数据绑定(Data Binding)：自动同步模型(Model)中的数据和视图(View)表现。

1. 控制器(Controller)：视图(View)背后的业务逻辑。

1. 依赖注入(Dependency Injection)：负责创建和自动装载对象或函数。

1. 注入器(Injector)：用来实现依赖注入(Injection)的容器。

1. 模块(Module)：用来配置注入器。

1. 服务(Service)：独立于视图(View)的、可复用的业务逻辑。

### 二、数据绑定

1. Angular启动应用时，通过“编译器(compiler)”来解析并处理模板中的新标记。（新标记包括指令和双大括号）。

2. 双向数据绑定——模型与视图的联动。

### 三、添加UI逻辑：控制器
```html
<!doctype html>
<html lang="en" ng-app="invoice1">
<head>
    <meta charset="UTF-8">
    <script src="angular.js"></script>
    <script src="script.js"></script>
</head>
<body>
<div ng-controller="InvoiceController as invoice">
    <b>订单:</b>
    <div>
        数量: <input type="number" ng-model="invoice.qty" required >
    </div>
    <div>
        单价: <input type="number" ng-model="invoice.cost" required >
        <select ng-model="invoice.inCurr">
            <option ng-repeat="c in invoice.currencies">{{c}}</option>
        </select>
        <button class="btn" ng-click="invoice.pay()">支付</button>
    </div>
    <div>
        <b>总价:</b>
        <span ng-repeat="(key, value) in invoice.usdToForeignRates">
            {{key}}: {{value.total}}
        </span>
    </div>
</div>
</body>
</html>
```
```javascript
angular.module('invoice1', [])
    .controller('InvoiceController', function() {
        this.qty = 1;
        this.cost = 2;
        this.inCurr = 'EUR';
        this.currencies = ['USD', 'EUR', 'CNY'];
        this.usdToForeignRates = {
            USD: {rate: 1, total: 1},
            EUR: {rate: 0.74, total: 1},
            CNY: {rate: 0.69, total: 1}
        };

        this.total = function total() {
            for(var item in this.usdToForeignRates) {
                this.usdToForeignRates[item].total = this.convertCurrency(this.qty * this.cost,item, this.inCurr).toFixed(3);
            }
        };
        this.convertCurrency = function convertCurrency(amount, inCurr, outCurr) {
            return amount * this.usdToForeignRates[outCurr].rate / this.usdToForeignRates[inCurr].rate;
        };
        this.pay = function pay() {
            this.total(this.inCurr);
        };
    });
```

1. 控制器函数所在的文件定义了一个构造函数，它用来在将来真正需要的时候创建这个控制器函数的实例。

2. 控制器的用途是导出一些变量和函数，供模板中的表达式(expression)和指令(directive)使用。

3. ng-controller指令告诉Angular，我们创建的控制器InvoiceController将会负责管理这个带有ng-controller指令的div及其各级子节点。

4. InvoiceController as invoice这个语法告诉Angular：创建这个InvoiceController的实例，并且把这个实例赋值给当前作用域(Scope)中的invoice变量。同时，页面中所有用于读写Scope变量的表达式，加上一个invoice.前缀。

### 四、与视图(View)无关的业务逻辑：服务(Service)

```js
// finance.js
angular.module('finance', [])
    .factory('currencyConverter', function() {
        return {
            convertCurrency: convertCurrency
        };
        function convertCurrency(amount, inCurrRate, outCurrRate) {
            return amount * outCurrRate / inCurrRate;
        }
    });
  ```
  ```js
// invoicve1.js
angular.module('invoice1', ['finance'])
    .controller('InvoiceController', function(currencyConverter) {
        this.qty = 1;
        this.cost = 2;
        this.inCurr = 'EUR';
        this.currencies = ['USD', 'EUR', 'CNY'];
        this.usdToForeignRates = {
            USD: {rate: 1, total: 1},
            EUR: {rate: 0.74, total: 1},
            CNY: {rate: 0.69, total: 1}
        };

        this.total = function total() {
            for(var item in this.usdToForeignRates) {
                this.usdToForeignRates[item].total = currencyConverter.convertCurrency(this.qty * this.cost,this.usdToForeignRates[item].rate, this.usdToForeignRates[this.inCurr].rate).toFixed(3);
            }
        };
        this.pay = function pay() {
            this.total();
        };
    });
  ```

1. 为了使应用程序的规模继续成长，最好的做法是：把控制器中与视图无关的逻辑都移到"服务(service)"中。 以便这个应用程序的其他部分也能复用这些逻辑。

2. angular将需要协同工作的对象和函数注册(Register)到模块(module)中，实现依赖注入。

3. 使用ng-app="invoice"来指定主模块invoice。

4. angular.module('invoice', ['finance'])会告诉angularinvoice模块依赖于finance模块。这样一来，Angular就能同时使用InvoiceController这个控制器和currencyConverter这个服务了。

5. 通过一个返回currencyConverter函数的函数作为创建currencyConverter服务的工厂。 （译注：js中的“工厂(factory)”是指一个以函数作为“返回值”的函数）






  
