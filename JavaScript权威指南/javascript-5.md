## 第6章 对象
1. 除了字符串、数字、true、false、null和undefined之外，JavaScript的值都是对象;
1. 对象的常见用法是创建、设置、查找、删除、检查和枚举它的属性。
1. 对象的属性特性：
+ 可写：表明是否可以设置该属性的值。
+ 可枚举：表明是否可以通过for/in循环返回该属性。
+ 可配置：表明是否可以删除或修改该属性。
+ 可扩展：表明是否可以给对象添加属性。
2. 对象特性：
+ 对象的原型指向另一个对象，本对象的属性继承自它的原型对象；
+ 对象的类是一个表示对象类型的字符串；
+ 对象的扩展标记指明了是否可以向这个对象中添加新属性。
3. 区分三类JavaScript对象和两类属性
+ 内置对象是由ECMAScript规范定义的对象或类；
+ 宿主对象是由JavaScript解释器所嵌入的宿主环境定义的。客户端JavaScript中表示网页结构的HTMLElement对象均是宿主对象。宿主对象可以当做内置对象；
+ 自定义对象是由运行中的JavaScript代码创建的对象；
+ 自有属性是直接在对象中定义的属性；
+ 继承属性是在对象的原型对象中定义的属性。
4. 原型：JavaScript 常被描述为一种基于原型的语言 (prototype-based language)——每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。准确地说，这些属性和方法定义在Object的构造器函数(constructor functions)之上的prototype属性上，而非对象实例本身。
+ 注意：没有原型的对象为数不多，object.prototype就是其中之一，它不继承任何属性。
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
### 3.通过object.create()方法创建对象
Object.create() 方法会使用指定的原型对象及其属性去创建一个新的对象。

(1) 语法
```
Object.create(proto[, propertiesObject])
```
(2) 参数以及返回值
+ 第一个参数：新对象的原型。
+ 第二个参数：可选。如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。第二个参数用以对新对象的属性进行进一步描述。
+ 返回值：在指定原型对象上添加新属性后的对象。
+ 注意：如果proto参数不是 null 或一个对象，则抛出一个 TypeError 异常。
(3) 使用Object.create()创建对象
```javascript
var obj = Object.create({x:1,y:8});//obj继承了属性x和y。
```
如果原型对象为null，那么创建的新对象将不会继承任何东西。
(4)使用Object.create()创建一个空对象
```javascript
var obj1 = Object.create(Object.prototype)
```
(5)例子：通过原型继承创建一个新对象
```javascript
function inherit(p){
    if(p == null) throw TypeError();
    if(create.object()){
        return Object.create(p)
    }else{
        var t = typeof p;
        if(t !== "object" && t !== "function") throw TypeError();
        function f() {};//定义一个空的构造函数
        f.prorotype = p;
        return new f();
    }
}
```
+ inherit()函数的一个用途就是防止库函数无意间修改那些不受你控制的对象。不是将对象直接传入函数，而是将它的继承对象传入函数，如果给继承对象的属性赋值，则这些属性只会影响继承对象自身，而不是原始对象。
### 二、属性的查询和设置
获取属性值的两种方法：
```javascript
book.edition
book['main title']
```
#### 1. 作为关联数组的对象
(1) 使用[]和字符串进行属性值索引，这种数组就是关联数组，也称作散列、映射或字典。
(2) 在不知道对象属性名的情况下，可以通过for/in循环获得关联数组的值。
#### 2. 继承
##### 构造函数的继承
(1) 使用call或apply方法，将父对象的构造函数绑定在子对象上,可以让apply()中的对象调用当前对象所拥有的function。而不是在新对象中再写一次这个方法。
```javascript
//让猫继承动物
function Animal(){
    console.log(arguments);
　　this.species = "动物";
}
function Cat(name,color){
　　Animal.apply(this, arguments);//或者Animal.call(this, name,color);或者Animal.apply(this)
　　this.name = name;
　　this.color = color;
}
var cat1 = new Cat("大毛","黄色");
console.log(cat1.species); 
//输出：
//{ '0': '大毛', '1': '黄色' }
// 动物
```
(2) 使用prototype属性

让"猫"的prototype对象，指向一个Animal的实例，那么所有"猫"的实例，就能继承Animal了
```javascript
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
说明：
+ 第一行：将Cat的prototype对象指向一个Animal的实例。相当于完全删除了prototype 对象原先的值，然后赋予一个新值
+ 第二行：任何一个prototype对象都有一个constructor属性，指向它的构造函数。如果没有"Cat.prototype = new Animal();"这一行，Cat.prototype.constructor是指向Cat的；加了这一行以后，Cat.prototype.constructor指向Animal。更重要的是，每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。因此，在运行"Cat.prototype = new Animal();"这一行之后，cat1.constructor也指向Animal！因此我们必须手动纠正，将Cat.prototype对象的constructor值改为Cat。

(3)利用空对象作为中介，直接继承prototype
```javascript
var F = function(){};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;
```
注意：
+ 修改Cat的prototype对象，不会影响到Animal的prototype对象。
+ 这也是YUI库实现继承的方法
```javascript
function extend(Child, Parent) {
　　var F = function(){};
　　F.prototype = Parent.prototype;
　　Child.prototype = new F();
　　Child.prototype.constructor = Child;
　　Child.uber = Parent.prototype;
}
extend(Cat,Animal);
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```
(4) 拷贝继承

把父对象的所有属性和方法，拷贝进子对象
```javascript
function extend2(Child, Parent) {
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
}
extend2(Cat, Animal);
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物
```

##### 非构造函数的继承
(1) object()方法

```javascript
var Chinese = {
　　nation:'中国'
};
function object(o) {
　　function F() {}
　　F.prototype = o;
　　return new F();
}
var Doctor = object(Chinese);
Doctor.career = '医生';
alert(Doctor.nation); //中国
```
(2) 拷贝继承
```javascript
function deepCopy(p, c) {
　　var c = c || {};
　　for (var i in p) {
        if (typeof p[i] === 'object') {
　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
　　　　　　　　deepCopy(p[i], c[i]);
　　　　　} else {
　　　　　　　　c[i] = p[i];
　　　　　}
　　}
　　return c;
}
var Doctor = deepCopy(Chinese);
Chinese.birthPlaces = ['北京','上海','香港'];
Doctor.birthPlaces.push('厦门');
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港
```
##### 属性访问错误
+ 查询不存在的属性不会报错，将返回undefined
+ 对象不存在会报错
+ 避免出错的方法(假设不知道是否book和subtitle都是对象)
```javascript
var len = undefined;
if(book) {
    if(book.subtitle) {
        len = book.subtitle.length;
    }
}
```
或者
```javascript
var len = book && book.subtitle && book.subtitle.length;
```
+ 内置构造函数的原型是只读的，这些属性的失败操作不会报错。例如：
```javascript
Object.prototype = 0;//赋值失败，但是没报错，因为Object.prototype没有修改
```
+ 以下场景给对象o设置属性p会失败
    + o的属性p是只读的；
    + o的属性p是继承属性，并且它是只读的；
    + o中不存在自由属性p：o没有使用setter方法继承属性p，并且o的可扩展性是false。如果o中不存在p，而且没有setter方法可供调用，则p一定会添加到o中，但是如果o不是可扩展的，那么在o中不能定义新属性
+ javascript 对象中的可扩展性指的是：是否可以给对象添加新属性。所有的内置对象和自定义对象显示的都是可扩展的，对于宿主对象，则有javascript 引擎决定。下面有几个函数是设置对象的可扩展性：
    + Object.isExtensible(Object); 检查对象是否可以扩展。
    + Object.preventExtensions(Object) 设置对象不可扩展，也就是不能添加新的属性，但如果该对象的原型，添加了新的属性，那么该对象也将继承该属性。
    + Object.seal(Object);它除了可以设置对象的不可扩展，还可以设置对象的自有属性都设置为不可配置的，不能删除和配置。对于它已经有的可写属性依然可以设置。
    + Object.isSealed(Object); 检查对象是否封闭。
    + Object.freeze();更严格的锁定对象（冻结）。除了将对象设置为不可扩展，属性设置为不可配置，所有的自有属性设置为只读的，（如果对象存储器属性有setter方法，存储器属性不受影响，依然可以通过属性赋值给他们）。
    + Object.isFrozen() 来检测对象是否冻结。
#### 3. 删除属性
(1) 使用delete运算符删除对象的属性。
(2) delete只能删除自有属性，不能删除继承属性（要删除继承属性必须从定义这个属性的原型对象上删除它，而且这会影响到所有继承自这个原型的对象）。
```javascript 1.5
var o = {x:1};
delete o.x;//true
delete o.x//true什么也没做，返回ture
delete 1;//true什么也没做，返回ture
```
(3) delete不能删除可配置性为false的属性（比如Object.prototype、var x = 1、function(){}都是不可删除的）。这种情况下，返回false，报类型错误。
(4) delete不可删除函数和全局属性。
(5) 非严格模式下删除全局对象的可配置属性时，可以省略对全局对象的引用。
```javascript 1.5
this.x = 2;//没有使用var
delete x;//删除成功
```
#### 4. 检测属性
(1) in运算符：检查对象的自有属性或者继承属性中是否包含这个属性，是则返回true。
(2) hasOwnProperty()方法:用来检测给定的名字是否是对象自有的属性，对于继承属性将返回false.
```javascript 1.5
var o = {x:1};
o.hasOwnProperty("x");//true
o.hasOwnProperty("y");//false
```
(3) propertyIsEnumerable()方法：只有检测到自有属性并且这个属性可枚举才返回true.
```javascript 1.5
var o = inherit({y:1});
o.x = 1;
o.propertyIsEnumerable("x");//true
o.propertyIsEnumerable("y");//false继承属性
Object.prototype.propertyIsEnumerable("toString");//false不可枚举
```
(4) 使用"!=="判断一个属性是否存在，但是当某个属性的值为undefined的时候，这种方法失效。
#### 5. 枚举属性
(1) 通过for/in循环可以得到对象的所有可枚举属性属性，包括自有属性和继承属性。
(2) 避免枚举出某些属性
```javascript 1.5
for(var p in o){
    if(!o.hasOwnProperty(p)) continue;//跳过继承的属性
}
for(var p in o){
    if(typeof p === 'function') continue;//跳过方法
}
```
(3)一些枚举属性对象的工具函数
+ 把p中可枚举属性复制到o中，如果有同名属性，则覆盖o中的属性，返回o
```javascript 1.5
function extend(o, p){
    for(var prop in p){
        o[prop] = p[prop];
    }
    return o;
}
```
+ 将p中可枚举属性复制到o中，并返回o，如果有同名属性，o中的属性不受影响，返回o
```javascript 1.5
function  merge(o, p) {
    for(var prop in p){
        if(o.hasOwnProperty(prop)) continue;
        o[prop] = p[prop];
    }
    return o;
}
```
+ 如果o中的属性在p中没有同名属性，则从o中删除这个属性，返回o
```javascript 1.5
function restrice(o, p) {
  for(var prop in o){
      if(!(prop in o)) delete o[prop];
  }
  return o;
}
```
+ 如果o的属性在p中存在同名属性，则从o中删除这个属性返回o
```javascript 1.5
function subtract(o, p) {
  for(var prop in o){
      if(prop in o) delete o[prop];
  }
  return o;  
}
```
+ 返回一个新对象，这个对象拥有同时在o和p中出现的属性，出现同名，保留p的属性值。
```javascript 1.5
function union(o, p) {
  return extend(extend({},o),p); 
}
```
+ 返回一个数组，这个数组包含的是o中可枚举的自有属性的名字
```javascript 1.5
function keys(o) {
  if(typeof o !== 'object'){
      var result = [];
      for(var prop in o){
          if(o.hasOwnProperty(prop)){
              result.push(prop);
          }
      }
  }
  return result;
}
```
#### 6.属性的getter和setter
(1) 对象属性是由名字、值和一组特性构成的，在ES5中，属性值可以用一个或两个方法替代，这两个方法就是setter和getter。有getter和setter方法定义的属性称作“存取器属性”，它不同于“数据属性”，数据属性只有一个简单的值。
(2) 属性具有setter方法，具有可读性，属性具有getter方法，具有可写性。
(3) 定义存取器属性的方法
```javascript 1.5
var o = {
    //普通的数据属性
    data_value:value,
    //存取器属性都是成对定义的函数
    get accessor_prop(){
        //函数体
        return this.data_value;
    },
    set accessor_prop(value){
        //函数体
        this.data_value = value;
    }
}
```
(3) 存取器属性是可以继承的。
+ 数据属性包含四个特性：它的值、可写性、可枚举性、可配置性。
+ 存取器属性的四个特性：读取、写入、可枚举性、可配置性。
+ 属性描述符对象：
    + 其属性包括——value、writable、enumerable和configurable;
    + 通过调用Object.getOwnPropertyDescriptor()可以获得某个对象的自有属性描述符。
    + 调用Object.getOwnPropertyDescriptor()方法，对于继承属性和不存在的属性，返回undefined
    + 调用Object.defineProperty()方法，传入要修改的对象、要创建或修改的属性的名称以及属性描述符对象。对于新创建的属性来说，默认的特性值为false或者undefined。这个方法只能修改已有属性或者新建自有属性，但是不能修改继承属性。
    + 同时修改或者创建多个属性，需要使用Object.defineProperties()方法。第一个参数是需要修改的对象，第二个参数是一个映射表，包含要新建或者修改的属性名称，以及属性描述符。最后返回修改后的对象。
    + 任何对Object.defineProperty()和Object.defineProperties()违反规则的使用会抛出异常
        + 如果对象是不可扩展的，则可以编辑已有的自由属性，但不能添加新属性；
        + 如果属性是不可配置的，则不能修改它的可配置性和可枚举性；
        + 如果存取器属性是不可配置的，则不能修改其getter和setter方法，也不能将它转换为数据属性；
        + 如果数据属性是不可配置的，则不能将它转换为存取器属性；
        + 如果数据属性是不可配置的，则不能将他的可写性从false修改为true，反之可以；
        + 如果数据属性是不可配合且不可写，则不能修改它的值，然而可配置但是不可写属性的值是可以修改的（先标记为可写，然后修改它的值，之后再转换成不可写的）。
Object.getOwnPropertyDescriptor()
```javascript 1.5
//返回{value:1,writable: true,enumerable: true,configurable: true}
Object.getOwnPropertyDescriptor({x: 1},"x");
//查询上下定义的random对象的octet属性
//返回{get:/*func*/,set: undefined,enumerable: true,configurable: true}
Object.getOwnPropertyDescriptor(randow,'octet');
```
Object.defineProperty()
```javascript 1.5
var o = {};
//创建一个不可枚举的属性并赋值
Object.defineProperty(o,"x",{
    value:1,writable: true,enumerable: false,configurable: true
});
console.log(o.x);//1  属性存在但是不可枚举
Object.defineProperty(o,"x",{writable: false});
o.x = 2;//操作失败但是不报错。严格模式下抛出类型错误异常。
//将属性x从数据属性修改为存取器属性
Object.defineProperty(o,"x",{get: function() {return 0;}});
console.log(o.x);//0
```
Object.defineProperties()
```javascript 1.5
var p = Object.defineProperties({}, {
    x: {value:1,writable: true,enumerable: false,configurable: true},
    y: {value:1,writable: true,enumerable: false,configurable: true},
    r: {get: function(){return 3;},enumerable: false,configurable: true}
})
```   
复制属性的特性
```javascript 1.5
/*
 * 给Object.prototype添加一个不可枚举的extend()方法
 * 这个方法继承自调用它的对象，将作为参数传入对象的属性一一复制
 * 除了值之外，也复制属性的所有特性，除非目标对象中存在同名的属性
 * 参数对象的所有自由对象也会一一复制
 */
 Object.defineProperty(Object.prototype,
 "extend",{//定义Object.prototype.extend
     writable: true,
     enumerable: false,//定义为不可枚举的
     configurable: true,
     value: function(o) {//值就是这个函数
         //得到所有自有属性，包括不可枚举属性
         var names = Object.getOwnPropertyNames(o);
         //遍历所有自有属性
         for(var i = 0; i < names.length; i++){
             //如果属性已经存在，则跳过
             if(names[i] in this) continue;
             //获得o中的描述符
             var desc = Object.getOwnPropertyDescriptor(o,names[i]);
             //用它给this创建一个属性
             Object.defineProperty(this,names[i],desc);
         }
     }
 })
```
#### 8. 对象的三个属性
(1) 原型属性：用来继承属性的。
+ ES5中，将对象作为参数传入Object.getPrototypeOf()可以查询它的原型；
+ ES3中，没有与Object.getPrototypeOf()等价的函数，通常使用表达式o.constructor.prototype来检测一个对象的原型。
+ 使用o.isPrototypeOf(p)方法来检测对象o是否是另一个对象p的原型（或者处于原型链中）,isPrototypeOf()和运算符instanceof类似。
(2) 类属性 :
+ 对象的类属性是一个字符串，用以表示对象的类型信息。
+ 调用对象的toString()方法，然后提取已返回字符创的第8个到倒数第二个位置之间的字符。由于很多对象的toString()方法重写了，为了调用正确的toString()版本，必须间接地调用Function.call()方法
```javascript 1.5
//classof函数可以返回传递给它的任意对象的类
function classof(o){
    if(o === null) return "Null";
    if(o === undefined) return "Undefined";
    return Object.prototype.toString().call(o).slice(8,-1);
}
```
(3) 可扩展属性
+ 对象的可扩展属性用以表示是否可以给对象添加新属性。
+ 所有内置对象和自定义对象都是显示可扩展的。
+ 通过将对象传入Object.esExtensible()，来判断对象是否是可扩展的。
+ 通过将对象传入Object.preventExtensions()，来将对象设置为不可扩展的。返回传入的对象
+ Object.seal()可以将对象设置为不可扩展的，并且将对象的所有自有属性设置为不可配置的。也就是说，不能给这个对象添加新属性，也不能删除和配置已有的属性，不过它已有的可写属性依然可以设置，对于那些已经封闭起来的对象是不能够解封的。返回传入的对象
+ 可以使用Object.isSealed()来检测对象是否封闭。
+ Object.freeze()将对象设置为不可扩展和将其属性设置为不可配置，将对象自有属性设置为只读，存储器属性不受影响。返回传入的对象
+ Object.isFrozen()检测对象是否冻结。
#### 9. 序列化对象
(1) 对象的序列化是指将对象转换成字符串，也可以将字符串还原为对象。
(2) ES5提供了内置函数JSON.stringify()来序列化对象。
(3) ES5提供了内置函数JSON.parse()来还原JavaScript对象。
#### 10. 对象方法
(1) toString()方法:返回一个表示调用这个方法的对象值的字符串
(2) toJSON()方法：Object.prototype中没有定义这个方法，但是JSON.stringify()方法会调用这个方法。
(3) valueOf()方法：当JavaScript需要将对象转换为某种原始值而非字符串的时候才会调用它。
   
