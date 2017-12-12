## 第5章 语句
1. 表达式语句
1. 复合语句和空语句
1. 声明语句
+ 使用var来声明一个或者多个变量
+ 使用function定义函数。注意：函数定义不能出现在if语句、while循环语句或者其他语句中。
4. 条件语句：
+ if语句
```javascript
if(){}else{}

if(){}else if(){}else{}
```
+ switch语句
```javascript
switch(n) {
    case 1:                 //如果n===1，从这里开始执行
    //执行代码块1            
    break;                  //停止执行switch语句
    case 2:                 //如果n===2，从这里开始执行
    //执行代码块2            
    break;                  //停止执行switch语句
    case 3:                 //如果n===3，从这里开始执行
    //执行代码块3            
    break;                  //停止执行switch语句
    default:                //如果所有条件都不匹配
    //执行代码块4            
    break;                  //停止执行switch语句
}
```
注意：
+ break语句可以使解释器跳出switch语句或者循环语句。在switch语句中，如果没有break语句，那么switch语句就会从与n的值相匹配的case标签处的代码块开始执行，依次执行后续的语句，一直到整个switch代码块的结尾。
+ n 的值为常量。
+ 如果没有default语句，整个switch语句都将跳过。
5. 循环
+ while循环
```javascript
while(expression)
    statement
```
+ do/while循环:循环体至少执行一次
```javascript
do
    statement
while(expression)
```
+ for循环
```javascript
for(initialize; test; increment)
```
相当于
```javascript
initialize
while(test)
    increment
```
+ for/in循环
```javascript
for(var p in obj)//把属性名字赋值给变量
    console.log(obj[p])//输出每个属性的值
```
注意：
a.达式为null或者undefined,javascript解释器将会跳过循环并执行后续的代码。如果表达式等于一个原始值，这个原始值将会转换成与之对应的包装对象。否则，expression本身已经是对象了，JavaScript会首先计算出variable表达式的值，并将属性名赋值给它。

b.for/in循环并不会便利对象所有属性，只有“可枚举”的属性才会遍历到。在代码中自定义的属性和方法是可枚举的，对象也可以继承其他对象的属性，那些继承的自定义属性也可以使用for/in循环枚举出来。
```javascript
var obj = {
    name: "zhangsan",
    age: 21,
    friends:["a","b","c"]
};
for(var item in obj){
    console.log(item)//name age friends
} 
for(var item in item.friends){
    console.log(item)//0,1,2
} 
```
6. 跳转
+ 标签语句：通过给语句添加标签，就可以在程序的任何地方通过标签名引用这条语句。
```javascript
identifier: statement
```
```javascript
mainloop: while(token != null){
    //忽略这里代码...
    continue mainloop;//跳转到下一次循环
    //忽略这里代码...
}
```
注意：

a. 用作标签的identifier必须是一个合法的JavaScript标识符，而不能是一个保留字；

b.标签的命名空间和变量或函数的命名空间是不同的，因此可以使用同一个标识符作为语句标签和作为变量名或函数名。

c. 语句标签只有在它起作用的语句内是有定义的。

d. 一个语句标签不能和它内部的语句标签重名，但两个代码段不互相嵌套的情况下是可以出现同名的语句标签的。

e. 任何语句可以又多个标签。
+ break语句：

a. 单独使用break语句的作用是立即退出最内层的循环或switch语句。break语句只有出现在循环或者switch语句中才是合法的。
```javascript
for(var i = 0;i < a.length;i++){
    if(a[i] == target) break;
}
//当找到和target相等的值的时候退出循环。
```
b. break语句和标签一起使用的时候，程序将跳转到这个标签所表示的语句块的结束，或者直接终止这个闭合语句块的执行。当没有任何语句块指定了break标签，这时会产生一个语法错误。当使用这种形式的break语句时，带标签的语句不应该是循环或者switch语句，因为break可以跳出任何闭合的语句块，这里的语句块可以是由花括号括起来的一组语句。
```javascript
var matrix = getData();
var sum = 0, success = false;
conmpute_sum: if(matrix.length){
    for(var x = 0; x < matrix.length; x++){
        var row = matrix[x];
        if(!row) break compute_sum;
        for(var y = 0; y < row.length; y++){
        var cell = row[y]
        if(isNaN(cell)) break compute_sum;
        sum += cell;
        }
    }
    success = true;
}
//如果在success == false的条件下到这里，说明我们的矩阵中有错误，否则将对矩阵中所有的元素求和。
```
+ continue语句：不是退出循环，而是转而执行下一次循环。continue语句也可以带标签。continue语句只能在循环体内使用。
注意：

a.continue语句在while循环中直接进入下一轮的循环条件，但是for循环首先计算其increment表达式，然后判断循环条件。

+ return语句
    + 只能在函数体内出现；
    + 函数没有return，执行结果是undefined；
    + return语句可以单独使用
+ throw语句
    + 异常是指当发生某种异常情况或者错误时产生的一个信号，抛出异常就是用信号通知发生了错误或者异常。
    + throw expression中expression可以是任意类型。
    + 抛出异常时，JavaScript解释器会立即停止当前正在进行的逻辑，并跳转到就近的异常处理程序（try/catch/finally）
```javascript
if(x < 0){
    throw new Error("x不能是负数")
}
```
+ try/catch/finally语句：是JavaScript的异常处理机制，try从句中定义了要处理的异常所在的代码块；catch从句跟随在try之后，当try块内某处发生了异常时，调用catch内的代码逻辑。catch从句后跟随finally块，后者放置清理代码，不管try块是否发生异常，都会执行finally块内的逻辑。这三个语句块都需要使用{},不能省略。
7. with语句（不推荐使用）
```javascript
document.forms[0].address.value
```
如果这种表达式在代码中多次出现，可以使用with语句将form对象添加到作用域链的最顶层：
```javascript
with(document.forms[0]){
    name.value = "";
    address.value = "";
    email.value = "";
}
```
8. debugger语句：debugger语句通常什么也不做，实际上，这条语句用来产生一个断点，JavaScript代码将会停止在断点的位置。
9. "use strict"
+ ES5引入的一条指令。它并不是语句。
+ 使用"use strict"指令的目的是说明在后续的代码中将会解析为严格代码，在严格模式下：
    + 禁止使用with语句；
    + 所有变量必须先声明；
    + 在严格模式中，调用的函数中的一个this值是undefined，非严格模式下this值总是全局对象；
    + 在严格模式中，当通过call()或apply()来调用函数时，其中的this值就是通过call()或apply()传入的第一个参数；
    + 在严格模式中，给制度属性赋值和给不可操作的对象创建新成员都会跑出一个类型错误异常；
    + 在严格模式中，传入eval()的代码不能在调用程序所在的上下文中声明变量或定义函数，非严格模式下是可以的；
    + 在严格模式中，函数的arguments对象拥有传入函数值的静态副本，在非严格模式中，arguments里的数组元素和函数参数都是指向同一个值的引用；
    + 在严格模式中，当delete运算符后跟非法的标识符（比如变量、函数、函数参数）时，将会抛出一个语法错误异常；
    + 在严格模式中，试图删除一个不可配置的属性将抛出一个类型错误异常；
    + 在一个对象直接量中定义两个或多个同名属性将产生语法错误；
    + 函数声明中存在两个或多个同名的参数将产生一个语法错误；
    + 严格模式下不允许使用八进制整数直接量；
    + 在严格模式中，表示符eval和arguments当做关键字，值是不能修改的；
    + 在严格模式中，限制了对调用栈的检测能力，在严格模式的函数中，arguments.caller和argements.callee都会抛出一个类型错误异常，严格模式的函数同样具有caller和callee属性，当访问这两个属性的时候将会抛出类型错误异常。














