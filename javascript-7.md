## 第8章 函数
### 一、 函数定义
1. 函数定义从function关键字开始。
2. 函数定义需要函数名称标识符（可选的）、一对圆括号、一对花括号。
3. 注意：以表达式方式定义的函数，函数名称是可选的；一跳函数声明语句实际上是声明了一个变量，并把一个函数对象赋值给它。
4. 函数名称通常是动词或以动词为前缀的词组。驼峰、下划线或者短名称（例如$()）。
5. 以表达式方式定义的函数在定义之前无法使用，这是因为变量声明提前了，但是变量赋值并不会提前。
6. 没有返回值的语句通常称为过程。
### 二、函数调用
函数调用的四种方法：
+ 作为函数
+ 作为方法
+ 作为构造函数
+ 通过它们的call和apply()方法间接调用
#### 1. 函数调用
+ 根据ES3和非严格模式下的ES5对函数的规定，调用上下文(this的值)是全局对象，严格模式下，调用上下文则是undefined。
```javascript
//定义并调用一个函数来确定当前脚本运行时是否为严格模式
var strict = (function(){return !this;}());
```
#### 2. 方法调用
+ 形式：
```javascript
o.m(x,y)
```
或者
```JavaScript
o['m'](x,y)
```
+ 方法调用的上下文是调用该方法的对象。
+ 当方法的返回值是一个对象，这个对象还可以调用它的方法，这种方法调用序列中每次的调用结果都是另一个表达式的组成部分。当方法不需要返回值的时候，最好返回this。
+ 如果嵌套函数作为方法调用，其this的值指向调用它的对象；如果嵌套函数作为函数调用，this的值不是全局对象（非严格模式下）就是undefined（严格模式下）。
```javascript
var o = {
    m: function() {
        var self = this;
        console.log(this === o);//true
        f();

        function f() {
            console.log(this === o);//false
            console.log(self === o);//true
        }
    }
}
o.m();
```
#### 3. 构造函数的调用
+ 如果函数或者方法调用之前带有关键字new，它就构成构造函数调用。
+ 凡是没有形参的构造函数都可以省略圆括号。
```javascript
var o = new Object();
var o = new Object;
```
+ 构造函数调用创建一个空对象，这个对象继承自函数的prototype属性。
+ 构造函数会使用创建的新对象作为调用上下文。
+ 构造函数通常不适用return关键字，它们通常初始化新对象。如果构造函数显示的返回一个对象，那么调用表单时的值就是这个对象；如果构造函数使用return语句但是没有指定返回值，或者返回一个原始值，那么这时将忽略原始值，同时返回这个新对象作为调用结果。
#### 4. 间接调用
+ 使用call和apply调用
### 三、函数的实参和形参
#### 1. 可选形参
+ 实参个数小于形参，剩下的形参将设置为undefined。因此在调用函数时形参是否可选以及是否可以省略应当保持良好的适应性。为了做到这一点，应该给省略的参数赋一个合理的默认值，如下：
```javascript
function getPropertyNames(o, /* optional */ a) {
    if(a == undefined) a = [];//如果未定义则使用新数组
    for(var var prop in o) a.push(prop);
    return a;
}
```
+ getPropertyNames函数体第一行可以替换成：
```javascript
a = a || [];
```
+ 在函数定义中要使用注释/* optional */来强调形参是可选的。
#### 2. 可变长实参列表：实参对象
（1）标识符arguments是指向实参对象的引用，实参对象是一个类数组对象，可以通过数字下标访问传入函数的实参值。

（2）实参对象可以让函数接收任意数量的形参，并返回传入实参的最大值。

（3）通过arguments[index]可以修改实参的值。

（4）严格模式中的函数无法使用arguments作为形参名或者局部变量名，也不能给argumengs赋值。

（5）在严格模式中，函数的arguments对象拥有传入函数值的静态副本，函数的 arguments 对象会保存函数被调用时候的原始参数。arguments[i] 的值不会随着相应的参数值的改变而变化，同名参数的值也不会随着与之相应的 arguments[i] 的值改变而改变。在非严格模式中，arguments里的数组元素和函数参数都是指向同一个值的引用。
```javascript
// 非严格模式
function xxx(a) {
     // 此处对a重新赋值，对arguments[0]的值产生了影响
       a = 42;
       return [a, arguments[0]];
}
var pair = xxx(17);
console.log(pair[0] === 42); // true
console.log(pair[1] === 17); // false
console.log(pair[1] === 42); // true
```
```javascript
// 严格模式
 function xxx(a) {
        'use strict'
        // 严格模式下，arguments[i]使用的是函数被调用的原始值，不随着变量的改变而改变
        a = 42;
        return [a, arguments[0]];
 }
var pair = xxx(17);
console.log(pair[0] === 42);  // true
console.log(pair[1] === 17);  // true
```
（6）callee和caller属性
+ callee和caller是实参对象定义的属性。ESMAScript标准规定callee属性指代当前正在执行的函数。caller是非标准的，但是大多数浏览器实现了这个属性，它指代调用当前正在执行的函数的函数，通过caller可以访问调用栈。
+ ES5严格模式下，对这两个属性的读写都会产生类型错误。
+ 在匿名函数中递归调用自身
```javascript
var factorial = function(x) {
    if(x < 1) {
        return 1;
    }else{
        return x * arguments.callee(x - 1);
    }
}
```
#### 3. 将对象属性用作实参
当一个函数包含炒锅三个形参时，传入的实参可以写入一个单独的对象中，在调用的时候传入一个对象。
#### 4. 实参类型
（1）可以使用注释表明形参类型和是否可选

（2）在函数中做实参类型检查，如果不符合形参类型，则抛出异常。

（3）做显示的类型转换，比如直接使用Number()将数组中的元素转换成数字类型。

### 四、作为值的函数
+ 可以将函数赋值给变量；
+ 可以将函数存储在对象的属性或者数组的元素中；
+ 作为一个参数传给另一个函数等。
（1）JavaScript中的函数并不是一个原始值而是一种特殊的对象，也就是说，函数可以拥有属性。

+ 下面这个函数每次被调用都会返回一个唯一的整数。
```javascript
uniqueInteger.counter = 0;//由于函数声明被提前了，因此可以在函数声明之前给他的成员赋值。
function uniqueInteger() {
    return uniqueInteger.counter++;
}
```
+ 下面这个函数使用了自身的属性（将自身当做数组对待）来缓存上一次的计算结果。
```javascript
function factorial(n) {
    if(isFinte(n) && n > 0 && n = Math.round(n)) {
        if(!(n in factorial)) {
            factorial[n] = n * factorial(n-1);
        }
        return factorial[n]
    }else{
        return NaN;
    }
}
factorial[1] = 1;//初始化魂村以保存这种基本情况。
```
### 五、作为命名空间的函数
+ 定义一个函数用作临时的命名空间，在这个命名空间内定义的变量不会污染到全局命名空间。
+ 使用匿名函数。
```javascript
(function(){/*模块代码*/}());
```
### 六、闭包
#### 1. 定义：
函数对象可以通过作用域链相互关联起来，函数体内部额变量都可以保存在函数作用域内，这种特性在计算机科学文献中称为“闭包”。
#### 2. 发生闭包 
（1）当调用函数时闭包所指向的作用域链和定义函数时的作用域链不是同一个作用域链的时候;
（2）当一个函数嵌套了另外一个函数，外部函数将嵌套的函数对象作为返回值返回的时候；
```javascript
var scope = "global scope";
function checkScope() {
    var scope = "local scope";
    function f() {return scope;}
    return f();
}
console.log(checkScope());//local scope
```
在下面这段代码中，checkScope仅仅返回函数内嵌套的一个函数对象，而不是直接返回结果。函数在定义的时候创建了一个作用域链，嵌套的函数f()定义在这个作用域链里，其中的变量scope一定是局部变量，不管何时何地执行函数f()，这种绑定在执行f()的时候都有效，因此返回local scope。闭包可以捕捉到局部变量（和参数），并一直保存下来，看起来像这些变量绑定到了在其中定义它们的外部函数。
```javascript
var scope = "global scope";
function checkScope() {
    var scope = "local scope";
    function f() {return scope;}
    return f;
}
console.log(checkScope()());//local scope
```
#### 3. 实现闭包
+ 我们将作用域链描述为一个对象列表，不是绑定的栈，每次调用JavaScript函数的时候，都会为之创建一个新的对象来保存局部变量，把这个对象添加至作用域链中。当函数返回的时候，就从作用域链中将这个绑定的对象删除，如果不存在嵌套的函数，也没有其他引用指向这个绑定的对象，它就会被当做垃圾回收掉。如果定义了嵌套的函数，每个嵌套的函数都各自对应一个作用域链，并且这个作用域链指向一个变量绑定对象。但如果这些嵌套函数对象在外部函数中保存下来，那么它也会和所指向的变量绑定对象一样当做垃圾回收。但是如果这个函数定义了嵌套函数，并将它作为返回值饭后或者存储在某处的属性里，这是就会有一个外部的引用指向这个嵌套的函，他就不会被当做垃圾回收，并且它所指向的变量绑定对象也不会被当做垃圾回收。

+ 函数局部变量私有化
```javascript
var uniqueInteger = (function() {
    var counter = 0;
    return function() {return counter++;}
//外部函数返回后，其他任何代码都无法访问外部函数中定义的私有变量counter,只有内部函数可以访问。
}());
```
+ 使用闭包共享私有变量

像counter一样的私有变量并不是只能用在一个单独的闭包内，在同一个外部函数定义的多个嵌套函数也可以访问它，这多个嵌套函数都共享一个作用域链。
```javascript
function counter() {
    var n = 0;
    return {
        count: function() {return n++;},
        reset: function() {n = 0;}
    };
}
var c = counter(),d = counter();//创建连个计数器
c.counter();//0
d.counter();//0
c.reset();//重置c
c.counter();//0
d.counter();//1
//每次调用counter()都会创建一个新的作用域和一个新的私有变量，所以两个对象不会相互影响。
```
+ 将私有变量作为参数传递进来，指定私有变量的初始值。
```javascript
function counter(n) {
    return {
        get count() {return n++},
        set count(m) {
            if(m >= n) n= = m;
            else throw Error("count can only be set to a large value")
        }
    }
}
```
+ 嵌套的函数不会将作用域内的私有成员复制一份，也不会对所绑定的变量生成静态快照。
 
下面的例子创建10个闭包，并将它们存储到一个数组中。
```javascript
//错误的做法
function constfunc(v) {
    var funcs = [];
    for(var i = 0;i < 10;i++) {
        funcs[i] = function() {return i;}
    }
    return funcs;
}
var funcs = constfunc();
console.log(funcs[5]());//10
```
```javascript
//正确的做法
function constfunc(v) {
    return function() {return v;}
}
var funcs = [];
for(var i = 0;i < 10;i++) {
    funcs[i] = constfunc(i);
}
console.log(funcs[5]());//5
```
+ 每个函数都包含一个this值，可以给外部函数的this转存一个变量，这样在闭包里面才能访问到外部函数的this。
+ 闭包内无法访问外部函数的arguments，可以将外部函数的参数数组转存到另一个变量中。
### 七、函数属性、方法和构造函数
#### 1. length属性
```javascript
function check(args){
    args.length;//实参真实个数
    args.callee.length;//期望的实参个数
}
```
#### 2. prototype属性
+ 每个函数都包含一个prototype属性，这个属性指向一个对象的引用，这个对象称为原型对象。
+ 每个函数都包含不同的原型对象。
+ 当将函数用作构造函数时，新创建的对象会从原型对象上继承属性。
#### 3. call()方法和apply()方法
+ call()和apply()的第一个实参是要调用函数的母对象，他是调用上下文；在ES5中，传入的第一个实参都会变成this的值，哪怕传入的参数是原始值甚至是null或undefined。在ES3中，传入的null和undefined都会被全局对象代替，其他原始值会被相应的包装对象代替。
+ call()和apply()的第二个参数是传入的参数,只不过call()传入实参的形式是列表，而apply()传入实参的形式是数组。

+ 例如：以对象o的方法调用函数f
```javascript
f.call(o,1,2,3);
f.apply(o,[1,2,3]);
```
每行代码和下面的功能类似
```javascript
o.m = f;//将f存储为o的临时方法
o.m(1,2,3);//调用它
delete o.m;//将临时方法删除
```
+ 可以使用将当前函数的arguments数组直接传入apply()来调用另一个函数。

动态修改对象的原始方法——monkey-paching：
```javascript
//将对象o中的m()方法替换为另一个方法，可以在调用原始方法之前和之后记录日志消息
function trace(o,m) {
    var original = o[m];//在闭包中保存原始方法
    o[m] = function() {
        console.log(new Date());
        console.log(this);
        var result = original.apply(this,arguments);
        console.log(new Date());
        return result;
    }
}
var o = {
    m: function(){
        console.log(arguments);
    }
};
o.m();//执行原来的函数，输出{}
trace(o,'m');
o.m();
// 执行改造过的函数，输出：
// 2017-12-14T07:45:00.969Z
// { m: [Function] }
// {}
// 2017-12-14T07:45:00.973Z
```
this总是指向调用它的对象，也就是下面定义的对象o，original.apply(this,arguments);相当于调用对象o的m函数。
> http://www.cnblogs.com/pssp/p/5216085.html
> https://www.cnblogs.com/pssp/p/5215621.html
#### 4. bind()方法
+ ES5新增方法。
+ 作用：将函数绑定至某个对象，当在函数f()上调用bind()方法并传入一个对象o作为参数，这个方法将返回一个新的函数。（以函数调用的方式）调用新的函数将会把原始的函数f()当做o的方法来调用，传入新函数的任何实参都将传入原始函数。
```javascript
function f(y) {return this.x + y} //待绑定的函数
var o = {x: 1};//将要绑定的对象
var g = f.bind(o);//通过调用g(x)来调用o.f(x)
g(2)//3
```
实现上述绑定：返回一个函数，通过调用它来调用o中的方法f(),传递它所有的实参
```javascript
function bind(f, o) {
    if(f.bind) {
        return f.bind(o);
    }else {
        return function() {
            return f.apply(o,arguments)
        }
    }
}
```
+ 模拟实现标准bind()方法
```JavaScript
if(!Function.prototype.bind) {
    Function.prototype.bind = function(o /*, args*/) {
        var self = this,boundArgs = arguments;
        //bind方法返回值是一个函数
        return function() {
            var args = [],i;
            //创建一个实参列表，将传入bind()的第二个以及后续实参都传入这个函数。
            for(i = 1; i < boundArgs.length; i++) {
                args.push(boundArgs[i]);
            }
            for(i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            return self.apply(o, args);
        }
    }
}
```
#### 5. toString()方法
 大多数的toString()方法的实现都返回函数的完整源码，内置函数返回一个类似"[native code]"的字符串作为函数体
#### 6. Function()构造函数
+ 可以使用Function()构造函数来定义函数
```javascript
var f = new Function('x', 'y', 'return x * y');
```
等价于
```javascript
var f = function(x, y) {return x * y};
```
+ Function()构造函数允许JavaScript运行时动态的创建并编译函数；
+ 每次调用Function()构造函数都会解析函数体并创建新的函数对象；
+ Function()构造函数创建的函数并不是词法作用域，函数体代码的编译总是在顶层函数执行。
#### 7. 可调用的对象
#### 8. 函数式编程
##### （1）使用函数处理数组
+ 在某些情况下，可以使用ES5的map()和reduce()等函数代替数组的循环等操作。
+ 在ES3中实现map()方法和reduce()方法。
实现map()方法：map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
```javascript
var map = Array.prototype.map 
? function(arr, f) {return arr.map(f)} 
: function(arr, f) {
    var result = [];
    for(var i = 0; i < arr.length; i++) {
        if(i in arr) {
            result[i] = f.call(this, arr[i], i, 0);
        }
    }
    return result;
}
var f = function(x, index, i, y) {
    return x*index;
}
var arr = [1,2,3,4];
console.log(map(arr,f));//[ 0, 2, 6, 12 ]
```
实现reduce()方法:reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。
```javascript
var reduce = Array.prototype.reduce
? function(arr, fun, initial) {
    if(arguments.length > 2) {
        return arr.reduce(f, initial);
    }else{
        return arr.reduce(f);
    }
}
: function(arr, fun, intial) {
    var i = 0, len = arr.length, accumulator;
    if(arguments.length > 2) {
        accumulator = initial;
    }else{
        if(len === 0) throw TypeError();
        while(i < len) {
            if(i in arr) {
                accumulator = arr[i++];
                break;
            }else{
                i++;
            }
        }
        if(i === len) throw TypeError();
    }

    while(i < len) {
        if(i in a) {
            accumulator = fun.call(undefined, accumulator, arr[i], i, arr);
        }
        i++;
    }
    return accumulator;
}
var f = function(x, y) {
    return x*y;
};
var arr = [1,2,3,4,5];
console.log(reduce(arr, f, arr[0]));//120
```
##### （2）高阶函数
+ 高阶函数是操作函数的函数，它接收一个或多个函数作为参数，并返回一个新函数。
```javascript
function not(f) {
    return function() {
        var result = f.apply(this, arguments);
        return !result;
    }
}
var even = function(x) {
    return x % 2 === 0;
}
var odd = not(even);
[1, 1, 3, 5, 5].every(odd);//true每个元素都是奇数
```
返回所有计算结果组成的数组
```javascript
function mapper(f) {
    return function(a) {return map(a ,f)}
}
var increment = function(x) {return x + 1;};
var incrementer = mapper(increment);
incrementer([1,2,3]); //[2,3,4]
```
返回一个新的可以计算f(g(...))的函数，返回的函数h()将它所有的实参传入g(),然后g()的返回值传入f()，调用f()和g()时的this值和调用h()时的this值是同一个this。
```javascript
function compose(f, g) {
    return function() {
        //需要给f()传入一个参数，所以使用f()的call()方法
        //需要给g()传入很多参数，所以使用f()的apply()方法
        return f.call(this, g.apply(this, arguments));
    };
}
var square = function(x) {return x*x};
var sum = function(x, y){return x+y};
var squareofsum = compose(square, sum);
console.log(squareofsum(2, 3));//25 (2+3)*(2+3)
```

##### （3） 不完全函数
+ 函数f的bind()方法返回一个新函数，给新函数传入特定的上下文和一组指定的参数，然后调用函数f()。我们说它把函数“绑定至”对象并传入一部分参数。bind()方法知识将实参放在（完整实参列表）左侧，也就是说传入bind()的实参都是放在传入原始函数的实参列表开始的位置，但有时我们期望传入bind()的实参放在（完整实参列表的）右侧。
```javascript
//实现一个工具函数将类数组对象（或对象）转换为真正的数组
function array(a, n) {return Array.prototype.slice.call(a, n||0)}
//这个函数的实参传递到左侧
function partialLeft(f) {
    var args = arguments;//保存外部的实参数组
    return function() {
        var a = array(args, 1);//开始处理外部的第一个args
        a = a.concat(array(arguments));//然后增加所有的内部实参
        return f.apply(this, a);//然后基于这个实参列表调用f()
    };
}
//这个函数的实参传递到右侧
function partialRight(f) {
    var args = arguments;//保存外部的实参数组
    return function() {
        var a = array(arguments);//开始处理内部参数
        a = a.concat(array(args, 1));//然后从外部第一个args开始添加
        return f.apply(this, a);//然后基于这个实参列表调用f()
    };
}
//这个函数的实参被用作模板，实参列表中的undefined值都被填充
function partial(f) {
    var args = arguments;
    return function () {
        var a = array(args, 1);
        var i = 0;j = 0;
        //遍历args，从内部实参填充undefined值
        for(; i < a.length; i++) {
            if(a[i] === undefined) a[i] = arguments[j++];
        }
        //现在将剩下的内部参数都追加进去
        a = a.concat(array(arguments, j))
        return f.apply(this, a);
    }
}

var f = function(x, y, z) {
    return x * (y - z);
};
partialLeft(f, 2)(3, 4);//2 * (3 - 4)
partialRight(f, 2)(3, 4);//3 * (4 - 2)
partial(f, undefined, 2)(3, 4);//3 * (2 - 4)
```
##### (4) 记忆
阶乘函数可以将上次的计算结果缓存起来，在函数式编程中，这种缓存技巧叫做“记忆”。下面的代码展示了一个高阶函数，memorize()接收一个函数作为实参，并返回带有记忆能力的函数。
```javascript
//返回f()的带有记忆功能的版本，只有当f()的实参的字符串表示都不相同的时候它才会工作。
function memorize(f) {
    var cache = {};//将值保存在闭包里
    return function() {
        //将实参转换为字符串形式，并将其用作缓存的键
        var key = arguments.length + Array.prototype.join.call(arguments, ",");
        if(key in cache) return cache[key];
        else return cache[key] = f.apply(this, arguments);
    };
}
//memorize()函数创建一个新对象，这个对象被当做缓存（的宿主）并赋值给一个局部变量，
//因此对于返回的函数来说他是私有的（在闭包中）。所有返回的函数将它的实参数组转换成字符串，
//并将字符串用作缓存对象的属性名。如果缓存中存在这个值，则直接返回它。
function gcd(a, b) {
    //球两个整数的最大公约数
    var t;
    if(a < b) t = b;b = a % b;a = t;
    while(b != 0) t = b;b = a % b;a = t;
    return a;
}
var gcdmemo = memorize(gcd);
gcd(85, 187);//17

var factorial = memorize(function(n){
    return (n < 1) ? 1 :n*factorial(n - 1);
})
factorial(5);//120 对于4~1的值也有缓存
```
### 八、补充知识点：
#### 1.this
+ 在绝大多数情况下，函数的调用方式决定了this的值。this不能在执行期间被赋值，并且在每次函数被调用时this的值也可能会不同。ES5引入了bind方法来设置函数的this值，而不用考虑函数如何被调用的，ES2015 引入了支持this词法解析的箭头函数（它在闭合的执行上下文内设置this的值）。
（1）全局上下文：
+ 无论是否在严格模式下，在全局执行上下文中（在任何函数体外部）this都指代全局对象。
```javascript
// 在浏览器中, window 对象同时也是全局对象：
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b)  // "MDN"
console.log(b)         // "MDN"
```
（2）函数上下文：
+ 在函数内部，this的值取决于函数被调用的方式。
+ 在严格模式下，如果this未在执行的上下文中定义，那它将会默认为undefined。
+ 如果要想把this的值从一个上下文传到另一个，就要用call，或者apply方法。
```javascript
// 一个对象可以作为call和apply的第一个参数，并且this会被绑定到这个对象。
var obj = {a: 'Custom'};

// 这个属性是在global对象定义的。
var a = 'Global';

function whatsThis(arg) {
  return this.a;  // this的值取决于函数的调用方式
}

whatsThis();          // 直接调用，      返回'Global'
whatsThis.call(obj);  // 通过call调用，  返回'Custom'
whatsThis.apply(obj); // 通过apply调用 ，返回'Custom'
```
+ 在函数使用this关键字的情况下，它的值可以被绑定到调用中的一个特定对象，使用所有函数继承自Function.prototype的call或apply方法。
```javascript
function add(c, d) {
  return this.a + this.b + c + d;
}

var o = {a: 1, b: 3};

// 第一个参数是作为‘this’使用的对象
// 后续参数作为参数传递给函数调用
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16

// 第一个参数也是作为‘this’使用的对象
// 第二个参数是一个数组，数组里的元素用作函数调用中的参数
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
```
+ 使用 call 和 apply 函数的时候要注意，如果传递的 this 值不是一个对象，JavaScript 将尝试使用内部 ToObject 操作将其转换为对象。因此，如果传递的值是一个原始值比如 7 或 'foo'，那么就会使用相关构造函数将它转换为对象，所以原始值 7 通过new Number(7)被转换为对象，而字符串'foo'使用 new String('foo') 转化为对象
```javascript
function bar() {
  console.log(Object.prototype.toString.call(this));
}

//原始值 7 被隐式转换为对象
bar.call(7); // [object Number]
```
（3）bind方法：
+ ECMAScript 5 引入了 Function.prototype.bind。调用f.bind(someObject)会创建一个与f具有相同函数体和作用域的函数，但是在这个新函数中，this将永久地被绑定到了bind的第一个参数，无论这个函数是如何被调用的。
```javascript
function f(){
  return this.a;
}

//this被固定到了传入的对象上
var g = f.bind({a:"azerty"});
console.log(g()); // azerty

var h = g.bind({a:'yoo'}); //bind只生效一次！
console.log(h()); // azerty

var o = {a:37, f:f, g:g, h:h};
console.log(o.f(), o.g(), o.h()); // 37, azerty, azerty
```
（4）箭头函数
+ 在箭头函数中，this与封闭词法上下文的this保持一致。在全局代码中，它将被设置为全局对象。
```javascript
var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject); // true
```
```javascript
// 作为对象的一个方法调用
var obj = {foo: foo};
console.log(obj.foo() === globalObject); // true

// 尝试使用call来设定this
console.log(foo.call(obj) === globalObject); // true

// 尝试使用bind来设定this
foo = foo.bind(obj);
console.log(foo() === globalObject); // true
```
+ 无论如何，foo的this被设置为它被创建时的上下文（在上面的例子中，就是全局对象）。这同样适用于在其他函数中创建的箭头函数：这些箭头函数的this被设置为外层执行上下文。
```javascript
// 创建一个含有bar方法的obj对象，bar返回一个函数，这个函数返回它自己的this，
// 这个返回的函数是以箭头函数创建的，所以它的this被永久绑定到了它外层函数的this。
// bar的值可以在调用中设置，它反过来又设置返回函数的值。
var obj = {bar: function() {
                    var x = (() => this);
                    return x;
                  }
          };

// 作为obj对象的一个方法来调用bar，把它的this绑定到obj。
// x所指向的匿名函数赋值给fn。
var fn = obj.bar();

// 直接调用fn而不设置this，通常(即不使用箭头函数的情况)默认为全局对象，若在严格模式则为undefined
console.log(fn() === obj); // true

// 但是注意，如果你只是引用obj的方法，而没有调用它(this是在函数调用过程中设置的)
var fn2 = obj.bar;
// 那么调用箭头函数后，this指向window，因为它从 bar 继承了this。
console.log(fn2()() == window); // true
```
（5）作为对象的方法
+ 当以对象里的方法的方式调用函数时，它们的 this 是调用该函数的对象。并且this的绑定只受最靠近的成员对象引用的影响。
（6）原型链中的 this
+ 如果该方法存在于一个对象的原型链上，那么this指向的是调用这个方法的对象，就好像该方法本来就存在于这个对象上。
```javascript
var o = {
  f : function(){ 
    return this.a + this.b; 
  }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```
（6）getter 与 setter 中的 this
+ 用作getter或setter的函数都会把 this 绑定到正在设置或获取属性的对象。
（7）作为构造函数
+ 当一个函数用作构造函数时（使用new关键字），它的this被绑定到正在构造的新对象。
（8）作为一个DOM事件处理函数
+ 当函数被用作事件处理函数时，它的this指向触发事件的元素（一些浏览器在使用非addEventListener的函数动态添加监听函数时不遵守这个约定）。
（9）作为一个内联事件处理函数
（10）一个返回匿名函数的例子
```javascript
this.name = "window.name";
var obj = {
    name : "obj.name",
    getName:function(){
        console.log(this.name);
        return function() {
            console.log(this.name);
        } 
    }
}
var fn = obj.getName()(); // "obj.name"  "undefined"

this.name = "window.name";
var obj = {
    name : "obj.name",
    getName:function(){
        console.log(this.name);
        return function() {
            console.log(this.name);
        } 
    }
}
var fn = obj.getName.call(this)(); // "window.name"  "undefined"

this.name = "window.name";
var obj = {
    name : "obj.name",
    getName:function(){
        console.log(this.name);
        return function() {
            console.log(this.name);
        } 
    }
}
var fn = obj.getName().call(this); // "obj.name"  "window.name"
```

