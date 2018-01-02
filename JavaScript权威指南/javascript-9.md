## 第九章 类和模块
### 1. 类和原型
+ 在JavaScript中，类的所有实例对象都从同一个原型对象上继承属性，因此原型对象是类的核心。
### 2. 类和构造函数
+ 调用构造函数的一个重要特征是：构造函数的prototype属性都被用作新对象的原型，这意味着通过同一个构造函数创建的所有对象都继承自一个相同对象，因此他们是同一个类的成员。

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
function Range(form, to) {
    this.form = form;
    this.to = to;
}
function Range(form, to) {
    this.form = function() {return form;}
    this.to = function(){return to;}
}
```
```javascript
var r = new Range(1, 5)
console.log(r.form());//1
```
第一种方法一旦实例化一个新的对象r，就不能修改了;
第二种可以通过方法替换它。
```javascript
r.form = function() {return 0;}
```
##### （7）构造函数的重载和工厂方法
+ 重载：根据传入的参数不同执行不同的方法
```javascript
function Set () {
    this.value = {};
    this.n = 0;
    if(arguments.length === 0 && isArrayLike(arguments[0])) {
        this.add.call(this,arguments[0]);
    }
    if(arguments.length > 0) {
        this.add.apply(this,arguments);
    }
}
```
+ 工厂模式
    + 工厂接口是工厂方法模式的核心，与调用者直接交互用来提供产品。
    + 工厂实现决定如何实例化产品，是实现扩展的途径，需要有多少种产品，就需要有多少个具体的工厂实现。
### 七、子类
#### 1. 定义子类
```javascript  
B.prototype = inherit(A.prototype);//子类派生来自父类
B.prototype.constructor = B;//重载继承来的constructor属性
```
+ 创建一个圆形对象，这个原型对象继承自Set的原型
```javascript
SingleletSet.prototype = inherit(Set.prototype);
extend(SingleletSet.prototype, {
    constructor: SingleletSet,//设置合适的constructor属性
    add: function () {throw "read-only set"},
    remove: function () {return "read-only set"}
});
//这里的singleletSet类从父类中继承了toString()、equals()等方法，同时也有add()、remove()自有方法。
```
#### 2. 构造函数和方法连链
+ 类工厂和方法链
```javascript
//这个函数返回Set类的子类
//并重写该类的add()方法用以对添加的元素做特殊的过滤
function filteredSetSubClass (superclass, filter) {
    var constructor = function () {
        superclass.apply(this, arguments);//调用父类的构造函数
    }
    constructor.prototype = inherit(superClass.prototype);
    constructor.prototype.constructor = constructor;
    prop.add = function () {
        //在添加任何成员之前首先使用过滤器将所有参数进行过滤
        for(var i = 0; i < arguments.length; i++) {
            var v = arguments[i];
            if(!filter(v)) throw("value" + v + "rejected by filter");
         }
         //调用父类的add()方法
         superclass.prototype.add.apply(this, arguments);
    }
    return constructor;
}
```
上面这个例子用一个函数将创建子类的代码包装起来，这样就可以在构造函数和方法链中使用父类的参数，而不是通过写死某个父类的名字来使用它的参数。也就是说如果想修改父类，只需要修改一处代码即可，而不需要对每个用到父类类名的地方都做修改。
#### 3. 组合vs子类 

+ “组合由于继承”

```javascript
/*
 *实现一个FilteredSet,它包装某个指定的集合对象
 *并对传入add()方法的值应用了某种过滤器
 *“范围”类中其他所有的和新方法延续到包装后的实例中
 */
var FilteredSet = Set.extend(
    function FilteredSet(set, filter) {
        this.set = set;
        this.filter = filter;
    },
    {
        //实例方法
        add: function() {
            //如果已有过滤器，直接使用它
            if(this.filter) {
                for (var i = 0;i < arguments.length;i++) {
                    var v = arguments[i];
                    if(!filter(v)) throw("value" + v + "rejected by filter");
                }
            }
            //调用set中的add方法
            this.set.add.apply(this.set, arguments);
            return this;
        },
        //剩下的方法保持不变
        remove: function () {
            this.set.remove.apply(this.set, arguments);
            return this;
        }
        /*,....其他方法..*/
    }
)

//创建一个实例
var s = new FilteredSet(new Set(), function(x) {return x !== null});
 ```
 上面这个例子中使用组合的好处是：只需创建一个单独的FilteredSe t子类即可。可以利用这个类的实例来创建任意带有成员限制的集合实例。
 #### 4. 类的层次结构和抽象类
 + 从实现中抽离接口，定义一个抽象类，某些实现方法不同的的方法在这个类中不做实现，在具体的子类上做这些方法的具体实现。
 + 使用extend()实现子类方法的扩展
#### 8. ES5中的类
+ ES5增加了方法支持
    + getter 
    + setter
    + 可枚举性
    + 可写性
    + 可配置性
+ ES5增加了对象扩展的限制
##### （1）让属性不可枚举
+ 使用Object.defindProperty(obj,prop,{
    value: value,
    writable: boolean,
    enumerable: boolean,
    configurable: boolean,
})，将enumerable的值设置为false
##### （2）定义不可变的类
+ 使用Object.defindProperty(obj,prop,{
    value: value,
    writable: boolean,
    enumerable: boolean,
    configurable: boolean,
})，将writable和configurable的值设置为false。
+ Object.defineProperty(obj,prop,{
    value: value,
    writable: boolean,
    enumerable: boolean,
    configurable: boolean,
})和Object.defineProperties()可以用来创建新属性
##### （3）封装对象状态
+ 在ES5中，可以通过定义属性getter和setter方法将状态变量更健壮的封装起来，这两个方法是无法删除的。
```javascript
function Range(from, to) {
    function getFrom() {return from;}
    function getTo() {return to;}
    function setFrom(value) {from  = value;}
    function setTo(value) {to = value;}
    Object.defineProperties(this,{
        from: {
            get: getFrom,
            set: setFrom,
            enumerable: true,
            configurable: false
        },
        to: {
            get: getTo,
            set: setTo,
            enumerable: true,
            configurable: false
        }
    })
}
var r = new Range(2, 5);
console.log(r.from);//2
```
使用这种方法，实例方法可以像读取普通的属性一样读取from和to。
##### （4）防止类的扩展
+ 使用Object.preventExtensions()可以将对象设置为不可扩展的；
+ Object.seal()可以将对象设置为不可扩展、不可配置的（依然可写）；
+ Object.freeze()可以执行冻结操作，不能给对象添加新的实例，已有的实例也无法删除或者修改。
##### （5）子类和ES5
+ 使用Object.create()创建子类
##### （6）属性描述符
+ 通过Object.defineProperty()给对象设置属性
#### 9. 模块
+ 模块化的目标：支持大规模的程序开发，处理分散源中代码的组装。实现代码重用。
+ 模块：是一个独立的JavaScript文件，模块文件可以包含一个类定义、一组相关的类、一个实用函数数据库或者是一些待执行的代码。
+ 不同的模块必须避免修改全局执行上下文，尽可能的减少定义全局变量
（1）用做命名空间的对象：
+ 避免污染全局变量
+ 模块的文件名应该和命名空间匹配
+ 最顶层的命名空间用来标识创建模块的作者或者组织
（2）作为私有命名空间的函数：模块内的某些函数并不需要外界可见。
+ 方法一：
```javascript
var collections;
if(!collections) collections = {};

collections.sets = (function namespace () {
    /*省略部分代码*/

    //通过返回命名空间对象将API导出
    return {
        AbstractSet: AbstractSet,
        NoSet: NoSet,
        SingleTonSet: SingleTonSet,
        ArraySet: ArraySet
    };
}());
```
+ 方法二：将模块函数当做构造函数
```javascript
var collections;
if(!collections) collections = {};
collections.sets = (new function namespace() {
    function Console() {
        console.log("123455")
    }
    function AbstractSet() {
    }
    function SingleTonSet() {
    }
    //将API导出到this对象
    this.AbstractSet = AbstractSet;
    this.Console = Console;
    this.SingleTonSet = SingleTonSet;
    //这里没有返回值
}());
collections.sets.Console();//123455
```
+ 方法三：
```javascript
var collections;
if(!collections) collections = {};
collections.sets = {}；
(function namespace() {
   /*省略部分代码*/

    //将API导出到this对象
    collections.sets.AbstractSet = AbstractSet;
    collections.sets.SingleTonSet = SingleTonSet;
    //这里没有返回值
}());
```



