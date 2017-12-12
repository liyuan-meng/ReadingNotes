## 第2章 词法结构
### 一、直接量
#### 1.直接量：
程序中直接使用的数据值。例如：
```javascript 1.5
1.2//数字
"hello world!"//字符串文本
true//布尔值
/javascript/gi//正则表达式直接量
```
### 二、标识符和保留字
#### 1.标识符：
用来对变量和函数进行命名。JavaScript标识符必须以字母、下划线或者美元符开始。

#### 2.保留字：
JavaScript把一些标识符拿来作为自己的保留字，因此，就不能在程序中把这些关键字作标识符了。

```
break       delete      function        return      typeof  

case        do          if              switch      var 

catch       else        in              this        void

continue    false       instanceof      throw       while   

debugger    finally     new             true        with

default     for         null            try         class

const       enum        export          extend      import   

super       
```
#### 3.下面这些在普通javascript代码中是合法的，在严格模式下是保留字
```
implements  let  private   public   yield   interface   package   protected   static  
```
#### 4.严格模式下对下面标识符做了严格限制，它们并不完全是保留字。但不能作为变量名、函数名或参数名
```
arguments   eval
```
####5.javascript预定了很多全局变量和函数，应当避免使用他们作为变量名和函数名

1 | 2 | 3 | 4 | 5
---|---|---|---|---
arguments | encodeURI | Infinity | Number | RegExp
Array | encodeURIComponent| isFinite| Object| String
Boolean | Error| isNaN| parseFloat| SyntaxError
Date | eval| JSON| parseInt| TypeError
decodeURI | evalError| Math| RangeError| undefined
encodeURIComponent | Function| NaN| ReferenceError| URIError
### 三、可选的分号
#### 1.通用规则：
如果当前语句和下一行语句无法合并解析，JavaScript则在第一行后面填补分号。

####2.特殊情况：
+ 在涉及return、break和continue语句的场景中，如果这三个关键字后面紧跟着换行，JavaScript会在换行处填补分号；
+ 在涉及“++”和“--”运算符的时候，这些运算符可以作为表达式的前缀，也可以当做表达式的后缀，如果将其用做后缀表达式，它和表达式应当在同一行，否则，行尾将填补分号，同时“++”和“--”将会作为下一行代码的前缀操作符并且与之一起解析。例如下面这段代码
```JavaScript
var x;
x
++
y
```
将解析成
```JavaScript
x;
++y
```
而不是
```JavaScript
x++;
y
```