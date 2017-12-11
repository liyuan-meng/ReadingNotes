
## 第3章 类型、值和变量
## 一、相关定义
1.JavaScript数据类型分为原始类型和对象：
+ 原始类型：包括数字、字符串和布尔值，还有两个特殊的原始值：null（空）和iundefined（未定义），这两个值代表了各自特殊类型的唯一成员。
+ 对象：对象是属性的集合，每个属性都由名/值对（值可以是原始值、也可以是对象）构成。
+ 注意：原则上只有JavaScript对象可以拥有自己的方法，然而，数字、字符串和布尔值也可以拥有自己的方法。在JavaScript中，只有null和undefined是无法拥有方法的值。

2.JavaScript的类型也可以分为拥有方法的类型和不能拥有方法的类型，同样也可以分为可变类型和不可变类型。
+ 可变类型：可以修改的，对象和数组都属于可变类型，JavaScript程序可以更改对象属性值和数组元素的值；
+ 不可变类型：数字、布尔值、null和undefined属于不可变类型
+ 字符串可以看成是由字符组成的数组，你可能认为它是可变的，然而在JavaScript中，字符串是不可变的。

### 二、数字
1.JavaScript中的数字均用浮点数表示，JavaScript中实际操作是基于32位整数的。

2.当一个数字直接出现在JavaScript程序中时，我们称之为数字直接量，JavaScript支持多种格式的数字直接量。
+ 整型直接量：包括十进制、十六进制（以“0x”或“0X”为前缀）、由于某些ECMAScript标准支持八进制直接量，而有些不支持。所以尽量不要使用以0为前缀的整型直接量。
+ 浮点型直接量：例如3.14、.333333、6.02e23、9.88E-30。

3.JavaScript中的算术运算
+ 基本的运算：+、-、*、/、%等；
+ 复杂的算术运算：通过作为Math对象的属性定义的函数和常量来实现,Math函数详见：
> http://www.runoob.com/jsref/jsref-obj-math.html
+ 注意：
    * JavaScript中的算术运算在溢出（结果为Infinity或者-Infinity）、下溢（结果为0,或者-0）或被0整除（结果为Infinity或者-Infinity）时不会报错。0除以0是没有意义的，结果为NaN.
    * JavaScript预定义了全局变量Infinity和NaN，用来表示无穷大和非数字值，这两个值是只读的。
    ```javascript 1.5
    console.log(1/0);//Infinity
    console.log(Number.MAX_VALUE+1);//Infinity
    console.log(0/0);//NaN
    console.log(Number.MIN_VALUE/2);//0
    console.log(-1/Infinity);//0
    ```
    * 正0和负0是相等的。
    ```javascript 1.5
        console.log(-0 === 0);//true
     ```
    * NaN和任何值都不相等，包括他自己。所以如果判断变量是否等于NaN，应当使用x != x来判断，当且仅当x为NaN的时候，表达式的结果才为true。
    * 二进制浮点数和四舍五入错误:由于JavaScript中的数字均用浮点数表示，所以会出现下面的问题：.3 - .2和.2 - .1并不相等。
    ```javascript 1.5
    var x = .3 - .2;
    var y = .2 - .1;
    console.log(x == y);//false
    ```
4.日期和时间：JavaScript语言核心包括Data()构造函数，用来创建表示时间和日期的对象，这些日期对象的方法为日期计算提供了简单的API。
```javascript 1.5
    //2017年12月11日 15:38
    var then = new Date(2017, 11, 11);
    var later = new Date(2017, 11, 11, 15, 10, 30);
    var elapsed = later - then;
    console.log(then);//2017-12-10T16:00:00.000Z
    console.log(later);//2017-12-11T07:10:30.000Z
    /**
    then和later的值不相等，可以使用toLocalString()转换成当地时间。2017-12-11 00:00:00 
    */
    console.log(elapsed);//54630000
    console.log(later.getFullYear());//2017
    console.log(later.getMonth());//11
    console.log(later.getDate());//11
    console.log(later.getDay());//0代表星期日
    console.log(later.getHours());//15
    console.log(later.getUTCHours());//7
```
3.更多日期函数详见：
> http://www.runoob.com/jsref/jsref-obj-date.html 
### 三、文本
1.字符串直接量：用单引号或双引号括起来的字符序列。

2.转义字符：

转义字符 | 含义 
---|---
\o | NUL字符 
\b |退格符
\t |水平制表符
\n |换行符
\v |垂直制表符
\f |换页符
\r |回车符
\" |双引号
\' |单引号
\\\ |反斜线
\xXX |由两位十六进制数XX指定的Latin-1字符
\uXXXX |由四位十六进制数XX指定的Unicode字符

3.字符串的使用:JavaScript的内置功能之一就是字符串连接，如果将加号（+）运算符用于数字，表示两数相加，但是将它作用于字符串，则表示字符串连接，将第二个字符串拼接在第一个之后。
```JavaScript
var s = "hello world";
console.log(s.charAt(0)); //h 第一个字符
console.log(s.charAt(s.length - 1)); //d 最后一个字符
console.log(s.substring(1,4)); //ell 第2-4个字符
console.log(s.slice(1,4));//ell 第2-4个字符
console.log(s.slice(-3));//rld 最后三个字符
console.log(s.indexOf("l"));//2 
console.log(s.lastIndexOf("l"));//9
console.log(s.indexOf('l',3));//3 在位置3以及之后首次出现字符l的位置
console.log(s.split(", ")); //[ 'hello world' ]
console.log(s.toUpperCase());//HELLO WORLD          
```

4.常用字符串函数如下：
+ 字符串转换
```JavaScript
var num= 19; // 19
var myStr = num.toString(); // "19"
```
或者
```JavaScript
var num= 19; // 19
var myStr = String(num); // "19"
```
或者
```JavaScript
var num= 19; // 19
var myStr = "" +num; // "19"
```

+ 字符串分割：split()的第二个参数，表示返回的字符串数组的最大长度。
```JavaScript
var myStr = "I,Love,You,Do,you,love,me";
var substrArray = myStr .split(",");
// ["I", "Love", "You", "Do", "you", "love", "me"];
var arrayLimited = myStr .split(",", 3);
// ["I", "Love", "You"];
```
+ 获取字符串长度
```JavaScript
var myStr = "I,Love,You,Do,you,love,me";
var myStrLength = myStr.length; //25
```
+ 查询子字符串

第一个函数：indexOf()，它从字符串的开头开始查找，找到返回对应坐标，找不到返回-1。
```JavaScript
var myStr = "I,Love,you,Do,you,love,me";
var index = myStr.indexOf("you"); // 7 ,基于0开始,找不到返回-1
```
第二个函数：lastIndexOf()，它从字符串的末尾开始查找，找到返回对应坐标，找不到返回-1。
```JavaScript
var myStr = "I,Love,you,Do,you,love,me";
var index = myStr.lastIndexOf("you"); // 14
```
+ 字符串替换
```JavaScript
var myStr = "I,love,you,Do,you,love,me";
var replacedStr = myStr.replace("love","hate");
//"I,hate,you,Do,you,love,me"
```
默认只替换第一次查找到的，想要全局替换，需要置上正则全局标识
```JavaScript
var myStr = "I,love,you,Do,you,love,me";
var replacedStr = myStr.replace(/love/g,"hate");
//"I,hate,you,Do,you,hate,me"
```
+ 查找给定位置的字符或其字符编码值
```JavaScript	
var myStr = "I,love,you,Do,you,love,me";
var theChar = myStr.charAt(8);// "o",同样从0开始
```
同样，它的一个兄弟函数就是查找对应位置的字符编码值
```JavaScript	
var myStr = "I,love,you,Do,you,love,me";
var theChar = myStr.charCodeAt(8); //111
```
+ 字符串连接
```JavaScript	
var str1 = "I,love,you!";
var str2 = "Do,you,love,me?";
var str = str1 + str2 + "Yes!";
//"I,love,you!Do,you,love,me?Yes!"
```
或者
```JavaScript	
var str1 = "I,love,you!";
var str2 = "Do,you,love,me?";
var str = str1.concat(str2);
//"I,love,you!Do,you,love,me?"
```
其中concat()函数可以有多个参数，传递多个字符串，拼接多个字符串
+ 字符串切割和提取
第一种，使用slice():
```JavaScript	
var myStr = "I,love,you,Do,you,love,me";
var subStr = myStr.slice(1,5);//",lov"
```
第二种，使用substring():
```JavaScript	
var myStr = "I,love,you,Do,you,love,me";
var subStr = myStr.substring(1,5); //",lov"
```
第三种，使用substr():
```JavaScript	
var myStr = "I,love,you,Do,you,love,me";
var subStr = myStr.substr(1,5); //",love"
```
与第一种和第二种不同的是，substr()第二个参数代表截取的字符串最大长度，如上结果所示。
+ 字符串大小写转换
```JavaScript
var myStr = "I,love,you,Do,you,love,me";
var lowCaseStr = myStr.toLowerCase();
//"i,love,you,do,you,love,me";
var upCaseStr = myStr.toUpperCase();
//"I,LOVE,YOU,DO,YOU,LOVE,ME"
```
+ 字符串匹配
```JavaScript
var myStr = "I,love,you,Do,you,love,me";
var pattern = /love/;
var result = myStr.match(pattern);//["love"]
console.log(result.index);//2
console.log(result.input );//I,love,you,Do,you,love,me
```
match()函数在字符串上调用，并且接受一个正则的参数,看看第二个例子，使用exec()函数：
```JavaScript
var myStr = "I,love,you,Do,you,love,me";
var pattern = /love/;
var result = pattern.exec(myStr);//["love"]
console.log(result.index);//2
console.log(result.input );//I,love,you,Do,you,love,me
```
把正则和字符串换了个位置，即exec()函数是在正则上调用，传递字符串的参数。对于上面两个方法，匹配的结果都是返回第一个匹配成功的字符串，如果匹配失败则返回null。

如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。除了数组元素和 length 属性之外，exec() 方法还返回两个属性。index 属性声明的是匹配文本的第一个字符的位置。input 属性则存放的是被检索的字符串 string。我们可以看得出，在调用非全局的 RegExp 对象的 exec() 方法时，返回的数组与调用方法 String.match() 返回的数组是相同的。

类似的方法还有search()：
```JavaScript
var myStr = "I,love,you,Do,you,love,me";
var pattern = /love/;
var result = myStr.search(pattern);//2
```
+ 字符串比较：
```JavaScript
var myStr = "chicken";
var myStrTwo = "egg";
var first = myStr.localeCompare(myStrTwo); // -1
first = myStr.localeCompare("chicken"); // 0
first = myStr.localeCompare("apple"); // 1
```
说明比较结果的数字。如果 myStr 小于 myStrTwo，则 localeCompare() 返回小于 0 的数。如果 myStr 大于 myStrTwo，则该方法返回大于 0 的数。如果两个字符串相等，或根据本地排序规则没有区别，该方法返回 0。
5.模式匹配：利用正则表达式实现字符串的匹配

正则表达式模式：
