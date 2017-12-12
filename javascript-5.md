## 第6章 对象
1. 除了字符串、数字、true、false、null和undefined之外，JavaScript的值都是对象;
1. 对象的常见用法是创建、设置、查找、删除、检查和枚举它的属性。
1. 对象的属性特性：
+ 可写：表明是否可以设置该属性的值；
+ 可枚举：表明是否可以通过for/in循环返回该属性；
+ 可配置：表明是否可以删除或修改该属性。
2. 对象特性：
+ 对象的原型指向另一个对象，本对象的属性继承自它的原型对象；
+ 对象的类是一个表示对象类型的字符串；
+ 对象的扩展标记指明了是否可以向这个对象中添加新属性。
3. 区分三类JavaScript对象和两类属性
+ 内置对象是由ECMAScript规范定义的对象或类；
+ 宿主对象是由JavaScript解释器所嵌入的宿主环境定义的。客户端JavaScript中表示网页结构的HTMLElement对象均是宿主对象。宿主对象可以当成内置对象；
+ 自定义对象是由运行中的JavaScript代码创建的对象；
+ 自有属性是直接在对象中定义的属性；
+ 继承属性是在对象的原型对象中定义的属性。

### 一、创建对象
#### 1. 使用对象直接量创建对象
对象直接量是由若干名/值对组成的映射表。
```javascript
var empty = {};
var book = {
    "name":"javascript",
    "sub-title":"TDG",
    "author":{
        firstname:"David",
        lastname:"Flanagan"
    }
};
```
#### 2. 通过new创建对象
new运算符创建并初始化一个新对象，关键字new后面跟随一个函数调用，这里的函数称作构造函数。
```javascript  
var o = new Object();
var d = new Array();
```
### 3.
