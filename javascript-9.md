## 第九章 类和模块
### 1. 类和原型
+ 在JavaScript中，类的所有实例对象都从同一个原型对象上继承属性。因此原型对象是类的核心。
### 2. 类和构造函数
+ 调用构造函数的一个重要特征是：构造函数的prototype属性都被用作新对象的原型，这意味着通过同一个构造函数创建的所有对象都继承自一个相同的对象，因此他们是同一个类的成员。
（1）构造函数和类的标识
+ 原型对象是类的唯一标识，当且晋档两个对象继承自同一个原型对象时，它们才属于同一个类的实例。
（2）constructor属性
+ 任何JavaScript函数都可以用作构造函数，并且调用构造函数是需要用到一个prototype属性的，因此每个JavaScript函数都拥有一个prototype属性，这个属性是一个对象，这个对象包含唯一一个不可枚举的属性constructor。constructor的值是一个函数对象。
+ 使用构造函数创建一个Animal类：
```javascript
function Animal(name) {
    this.name = name;
}
Animal.prototype = {
    sayName: function() {
        console.log(this.name);
    }
}
var animal = new Animal("cat");
animal.sayName();//cat
console.log(Animal.prototype.constructor === Animal);//false
```
输出false。这是因为Animal类使用它自身的一个新对象重写预定义的Animal.prototype对象，这个新定义的原型对象不含有constructor属性。我们可以通过不就措施类弥补这个问题：
```javascript
function Animal(name) {
    this.name = name;
}
Animal.prototype = {
    constructor: Animal,//显示设置构造函数反向引用
    sayName: function() {
        console.log(this.name);
    }
}
var animal = new Animal("cat");
animal.sayName();//cat
console.log(Animal.prototype.constructor === Animal);//true
```
另一种方法是使用预定义的原型对象，预定义的原型对象包含constructor属性，然后一次给该原型对象添加方法：
```javascript
function Animal(name) {
    this.name = name;
}
Animal.prototype.sayName = function() {
    console.log(this.name);
}
var animal = new Animal("cat");
animal.sayName();//cat
console.log(Animal.prototype.constructor === Animal);//true
console.log(animal.constructor === Animal);//true
```
#### 3. javascript中的Java式的继承
（1）在JavaScript中定义类的步骤：
+ 先定义一个构造函数并设置初始化新对象的实例属性。
+ 给构造函数的prototype对象定义实例的方法。
+ 给构造函数定义类字段和类属性。
（2）java中有很多重要特性在JavaScript类中时无法模拟的。
#### 4. 类的扩充
+ JavaScript中基于原型的继承机制是动态的：对象从其原型继承属性，如果创建对象之后原型的属性发生改变，也会影响到继承这个原型链的所有实例对象。这意味着我们可以通过给原型添加新方法来扩充JavaScript类。
+ 可以给Object.prototype添加方法，从而使所有对象都可以直接调用这些方法，但是并不推荐，因为在ES5之前，Object.prototype添加的属性是可以被for/in循环遍历到的。
#### 5. 类和类型
（1）instanceof运算符
+ 尽管instanceof运算符右操作数是构造函数，但计算过程实际上是检测了对象的继承关系，而不是检测创建对象的构造函数。
+ instanceof和isPrototypeOf()方法的缺点是：
    + 无法通过对象来获得类名，只能检测对象是否属于指定的类名。
    + 在客户端多窗口多框架子页面的web应用中兼容性不佳，每个窗口和框架子页面都具有单独的执行上下文，每个上下文都包含独有的全局变量和一组构造函数。在两个不同框架页面中创建的两个数组继承自两个相同但互相独立的原型对象，其中一个框架页面中的数组不是另一个框架页面的Array()构造函数的实例，instanceof运算结果是false。
（2）constructor属性：
+ 可以识别对象是否属于某个类。
+ 缺点是：在客户端多窗口多框架子页面的web应用中兼容性不佳，一个框架页面中的数组不是另一个框架页面的Array()构造函数的实例，instanceof运算结果是false。
（3）构造函数的名称
+ 鉴于instanceof运算符和constructor属性的缺点，可以使用构造函数的名字而不是构造函数本身作为类标识符。但是也存在不足：并不是所有对象都有constructor属性，并不是多有函数都由名字。
（4）鸭式辩型
+ 不要关注“对象的类是什么”，而是管制“对象能做什么”。
    + “像鸭子一样走路、游泳并且嘎嘎叫的鸟就是鸭子！”
+ 利用鸭式辩型实现的函数，quacks()函数用以检查一个对象（第一个实参）是否实现了剩下的参数所表示的方法。对于除了第一个参数外的每个参数，如果字符串的话则直接检查是否存在以他命名的方法，如果是对象的话则检查第一个对象中的方法是否在这个对象中也具有同名的方法，如果参数是函数，则嘉定他是构造函数，函数检查顶一个对象实现的方法是否在构造函数的原型对象中也具有同名的方法。
```javascript
//如果o实现了除了第一个参数之外的参数所表示的方法，则返回true
function quacks(o /* ,...*/) {
    for(var i = 1;i < arguments.length;i++) {
        var arg = arguments[i];
        switch(typeof arg) {
            case 'string': 
                if(typeof o[arg] !== 'function') return false;
                continue;
            case 'function': 
                arg = arg.prototype;
            case 'object': 
                for(var m in arg) {
                    if(typeof arg[m] !== 'function') continue;
                    if(typeog o[m] !== 'function') return false;
                }
        }
    }
    return true;
}
```
但是不能通过quacks(o, Array)检测o是否实现了Array中国所有同名的方法，原因是内置类的方法都是不可枚举的，通过for/in循环无法遍历到。但是ES5中可以使用Object.getOwnPropertyNames()获得对象的自由属性（包括可枚举和不可枚举的属性）。
#### 6. JavaScript中的面向对象技术
##### （1）实现集合类的例子
```javascript
function Set() {
    this.values = {};//结合数据都保存在对象的属性里
    this.n = 0;//集合中值的个数
    this.add.apply(this,arguments);//把所有参数添加到集合里面
}
//将每个参数添加到集合里面
Set.prototype.add = function() {
    arguments.forEach(function(item) {
        var str = Set._v2s(item);//转换为字符串
        if(!this.values.hasOwnProperty(str)) {
            this.values[str] = item;
            this.n++;
        }
    })
    return this;//支持方法链式调用
}
//从集合删除元素，这些元素由参数指定
Set.prototype.remove = function() {
    arguments.array.forEach(element => {
        var str = Set._v2s(element);
        if(this.values.hasOwnProperty(str)){
            delete this.values[str];
            this.n--;
        }
    });
    return this;
}
//如果集合中包含这个值，返回true,否则返回false
Set.prototype.contains = function(value) {
    return this.values.hasOwnProperty(Set._v2s(value));
}
//返回集合大小
Set.prototype.size = function () {
    return this.n;
}
//遍历集合中的所有元素，在指定的上下文中调用f
Set.prototype.foreach = function(f, context) {
    for(var item in this.values) {
        if(this.values.hasOwnProperty(s)) {//忽略继承的属性
            f.call(context, this.values[item]);
        }
    }
}
//内部函数，将任意JavaScript值和唯一的字符串对应起来
Set._v2s = function(val) {
    switch(val) {
        case undefined: return 'u';
        case null: return 'n';
        case true: return 't';
        case false: return 'f';
        default: switch (typeof val) {
            case 'number': return '#' + val;
            case 'string': return '\'\'' + val;
            default: return '@' + objectId(val);
        }
    }
    function objectId(o) {
        var prop = "|**objectid**|";//私有属性，用来存放id
        if(!o.hasOwnProperty(prop))//如果对象没有id
            o[prop] = Set._v2s.next++;//将下一个值赋给它
        return o[prop];//返回这个id
    }
};
Set._v2s.next = 100;//设置初始id的值。
```
##### （2）实现枚举类型的例子
+ 这个函数创建一个新的枚举类型，实参对象表示类的每个实例的名字和值
+ 返回值是一个构造函数，它标识这个新类
+ 注意：这个构造函数也会抛出异常，不能使用它来创建该类型的新实例
+ 返回的构造函数包含名/值对的映射表
+ 包括由值组成的数组，以及一个forEach()迭代器函数
```javascript
function enumeration(namesToValues) {
    //这个虚构的构造函数时返回值
    var enumeration = function() {
        throw "can not instantiate enumerations";
    }
    //枚举值继承自这个对象
    var proto = enumeration.prototype = {
        constructor: enumeration,//标识类型
        toString: function () {return this.name;},//返回名字
        valueOf: function () {return this.value},//返回值
        toJSON: function () {return this.name;}//转换为JSON
    };
    enumeration.values = [];//用以存放枚举对象的数组
    //现在创建新类型的实例
    for(name in namesToValues) {
        var e = inherit(proto);//创建一个代表它的对象
        e.name = name;//给它一个名字
        e.value = namesToValues[name];//给它一个值
        enumeration[name] = e;//将它设置为构造函数的属性
        enumeration.values.push(e);//将它存储在数组中
    }
    //一个类方法，用来对类的实例进行迭代
    enumeration.foreach = function(f, c) {
        values.foreach(function(item) {
            f.call(c, this.values[i])
        })
    };
    //返回标识这个新类型的构造函数
    return enumeration;
}
//创建一个新的枚举类
var Coin = enumeration({Penny: 1, Nickel: 5, Dime: 10, Quarter: 25});
var c = Coin.Dime;//这是新类的实例
c instanceof Coin;//true
c.constructor == Coin;//true
```
##### （3）标准转换方法
+ toString()
+ toLocaleString()
+ valueOf()
+ toJSON
+ 下面这个例子将这些方法添加到Set类的原型中
```javascript
function extend(o, p){
    for(var prop in p){
        o[prop] = p[prop];
    }
    return o;
}
extend(Set.prototype,{
    //将集合转换为字符串
    toString: function() {
        var s = '{',i = 0;
        this.foreach(function(v) {
            s += ((i++>0)?", ": "") + v;
        });
        return s + "}";
    },
    toLocaleString: function() {
        var s = "{",i = 0;
        this.foreach(function(v){
            if(i++>0) s+=", ";
            if(v == null) s += v;//null和undefined
            else s+= v.toLocaleString();//其它情况
        });
        return s + "}";
    },
    toArray: function() {
        var a = [];
        this.foreach(function(v) {a.push(v);});
        return a;
    }
})
```
##### （4）比较方法
+ 下面这个例子给Set添加一个equals()方法,这个方法只能接收一个实参，如果这个实参和调用此方法的对象相等的话则返回true
```javascript
Set.prototype.equals = function (that) {
    if(this === that) return true;
    if(!(that instanceof Set)) return false;
    if(this.size() !== that.size()) return false;
    try{
        this.foreach(function(v) {
            if(!that.contains(v)) throw false;
        })
    } catch(x) {
        if(x === false) return false;
        throw x;
    }
}
```
+ compareTo()方法只能接收一个参数，这个方法将这个参数和调用它的对象进行比较。如果this对象小于参数对象，compareTo()应当返回比0小的值，相等返回0，否则，返回大于0的值。给Range()类添加一个compareTo方法：
```javascript
Range.prototypef.compareTo = function(that) {
    if(!(that instanceof Range)) throw "error";
    var diff = this.from - that.from;//比较下边界
    if(diff == 0) diff = this.to - that.to;
    reutrn diff;
}
```
##### （5）方法借用
+ 把一个类中的方法用到其他的类中。类似于其他语言中的“多重继承”。
```javascript
//不适合实例太复杂的类
Range.prototype.equals = generic.equals;
```
##### （6）私有状态
+ 可以通过将变量（或参数）闭包在一个构造函数内来模拟实现私有实例字段，调用构造函数会创建一个实例。为了做到这一点,需要：
    + 在构造函数内部定义一个函数（因此这个函数可以访问构造函数内部的参数和变量）
    + 将这个函数赋值给新创建对象的属性
```javascript
function Range(from, to) {
    this.form = from;
    this.to = to;
}
function Range(from, to) {
    this.from = function() {return from;}
    this.to = function(){return to;}
}
```
```javascript
var r = new Range(1, 5)
```
第一种方法一旦实例化一个新的对象r，就不能修改了;
第二种可以通过方法替换它。
```javascript
r.from = function() {return 0;}
```



