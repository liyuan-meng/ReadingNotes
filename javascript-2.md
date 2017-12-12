
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

正则表达式：
+ 正则表达式修饰符：修饰符可以在全局搜说中不区分大小写

修饰符 | 描述 
---|---
i | 执行对大小写不敏感的匹配 
g |执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
m |执行多行匹配。
 
+ 表达式 | 描述 

---|---
[abc] |查找方括号之间的任何字符。
[^abc] |查找任何不在方括号之间的字符。
[0-9] |查找任何从 0 至 9 的数字。
[a-z] |查找任何从小写 a 到小写 z 的字符。
[A-Z] |查找任何从大写 A 到大写 Z 的字符。
[A-z] |查找任何从大写 A 到小写 z 的字符。
[0-9] |查找任何从 0 至 9 的数字。
[adgk] | 查找方括号之间的任何字符。
[^adgk] |查找给定集合外的任何字符。
[abc] | 查找方括号之间的任何字符。
[0-9] |查找任何从 0 至 9 的数字。
(red\|blue) |查找任何以 \| 分隔的选项。
元字符是拥有特殊含义的字符：

+ 元字符 | 描述 

---|---
\d |查找数字。
\D |查找非数字。
\s |查找空白字符。
\S |查找非空白字符。
\b |匹配单词边界。
\B |匹配非单词边界。
\w|查找单词字符
\W|查找非单词字符
\0|查找NULL字符
\n|查找换行符
\f|查找换野夫
\r|查找回车符
\t|查找制表符
\v|查找垂直制表符
\xxx|查找八进制数xxx规定的字符
\xdd|查找十六进制数dd规定的字符
\uxxxx |查找以十六进制数 xxxx 规定的 Unicode 字符


+ 量词:

量词 | 描述 
---|---
n+ |匹配任何包含至少一个 n 的字符串。例如，/a+/ 匹配 "candy" 中的 "a"，"caaaaaaandy" 中所有的 "a"。
n* |匹配任何包含零个或多个 n 的字符串。例如，/bo*/ 匹配 "A ghost booooed" 中的 "boooo"，"A bird warbled" 中的 "b"，但是不匹配 "A goat grunted"。
n? |匹配任何包含零个或一个 n 的字符串。
n{X}|匹配包含 X 个 n 的序列的字符串。例如，/a{2}/ 不匹配 "candy," 中的 "a"，但是匹配 "caandy," 中的两个 "a"，且匹配 "caaandy." 中的前两个 "a"。
n{X,}|X 是一个正整数。前面的模式 n 连续出现至少 X 次时匹配。例如，/a{2,}/ 不匹配 "candy" 中的 "a"，但是匹配 "caandy" 和 "caaaaaaandy." 中所有的 "a"。
n{X,Y}|X 和 Y 为正整数。前面的模式 n 连续出现至少 X 次，至多 Y 次时匹配。例如，/a{1,3}/ 不匹配 "cndy"，匹配 "candy," 中的 "a"，"caandy," 中的两个 "a"，匹配 "caaaaaaandy" 中的前面三个 "a"。注意，当匹配 "caaaaaaandy" 时，即使原始字符串拥有更多的 "a"，匹配项也是 "aaa"。
n$|匹配任何结尾为 n 的字符串。
^n|匹配任何开头为 n 的字符串。
?=n|匹配任何其后紧接指定字符串 n 的字符串
?!n|匹配任何其后没有紧接指定字符串 n 的字符串。

+ RegExp 对象方法

方法 | 描述 
---|---
compile |编译正则表达式
exec |检索字符串中指定的值。如果字符串中有匹配的值返回该匹配值，否则返回 null。
test |检索字符串中指定的值。返回 true 或 false。

+ 支持正则表达式的 String 对象的方法

方法 | 描述 
---|---
search |检索与正则表达式相匹配的值，返回位置索引，如果没有找到任何匹配的子串，则返回 -1。
match |找到一个或者多个正则表达式的匹配。 match() 方法将检索字符串 String Object，以找到一个或多个与 regexp 匹配的文本。这个方法的行为在很大程度上有赖于 regexp 是否具有标志 g。如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。
replace |替换与正则表达式匹配的子串。
split |把字符串分割为字符串数组。

例子compile：在字符串中全局搜索 "man"，并用 "person" 替换。然后通过 compile() 方法，改变正则表达式，用 "person" 替换 "man" 或 "woman"，：
```javascript
var str="Every man in the world! Every woman on earth!";
var patt=/man/g;
var str2=str.replace(patt,"person");
document.write(str2+"<br>");
patt=/(wo)?man/g;
patt.compile(patt); 
str2=str.replace(patt,"person");
document.write(str2);
//Every person in the world! Every woperson on earth!
//Every person in the world! Every person on earth!
```
例子exec：
```javascript
var str="Hello world!";
//look for "Hello"
var patt=/Hello/g;
var result=patt.exec(str);
document.write("Returned value: " + result); 

//look for "W3Schools"
patt=/W3Schools/g;
result=patt.exec(str);
document.write("<br>Returned value: " + result);
// Returned value: Hello
// Returned value: null
```
例子search：
```javascript
var str="Mr. Blue has a blue house";
document.write(str.search("blue"));
//15
```
例子match:
```javascript
var str="The rain in SPAIN stays mainly in the plain"; 
var n=str.match(/ain/gi);
//ain,AIN,ain,ain
```
### 四、布尔值
1.任意JavaScript的值都可以转换成布尔值。
2.下面这些值都会被转换成false。
```
undefined null 0 -0 NaN ""(空字符串)
```
所有其他值，包括所有对象（数组）都会转换成true。
3.布尔值包含toString()方法，因此可以使用这个方法将字符串转换成"true"或者"false".
4.三个重要的布尔运算符
```
&& || !
```
### 五、null和undefind
1.null:
+ 用来描述“空值”；
+ typeof null返回"object"；
+ null是它自有类型的唯一一个成员；
+ 可以表示数字、字符串、对象是无值的；
2.undefined
+ 表示值的空缺，它是变量的一种取值，表示变量没有初始化；
+ 查询对象属性或者数组元素的值时返回undefined表示这个属性或者元素不存在；
+ 函数没有返回值，则返回undefined；
+ typeof undefined返回"undefined"；
+ undefined是它自有类型的唯一一个成员；
+ 全局属性
3.null和undefined都是表示值的空缺，两者都是只读的。判断“==”认为两者是相等的，两者都不包含任何属性和方法。如果你想将它们赋值给变量或者属性，或者将它们作为参数传入函数，最好使用null。
### 六、全局对象
1. 全局对象的属性是全局定义的符号，JavaScript程序可以直接使用，当JavaScript解析器启动的时候（或者任何web浏览器加载新页面的时候），它将创建一个新的全局对象，并给他一组定义的初始属性。
+ 全局属性
```
undefined Infinity NaN
```
+ 全局函数
```
isNaN() parseInt() eval()
```
+ 构造函数
```
Date() RegExp() String() Object() Array()
```
+ 全局对象
```
Math JSON Window
```
在代码的最顶级——不在任何函数内的JavaScript代码——可以使用JavaScript关键字this来引用全局对象。
### 七、包装对象
1. 字符串不是对象，但是它有属性。这是因为只要引用了字符串s的属性，JavaScript就会将字符串值通过调用new String(s)的方式转换成对象，这个对象继承了字符串的方法，并被用来处理属性的引用，一旦属性引用结束，这个新创建的对象就会销毁。
1. 同字符串一样，数字和布尔值也具有各自的方法：通过Number()和Boolean()构造函数创建一个临时对象，这些方法的调用均来自这个临时对象。null和undefined没有包装对象；访问他们的属性会造成一个类型错误。
```javascript
var s = "test";
//创建一个临时字符串对象，并赋值，随即销毁这个对象。
s.len = 4;
var t = s.len;//undefined
```
3. 存取字符串、数字或者布尔值的属性时创建的临时对象称作包装对象。它只是偶尔用来区分字符串值和字符串对象、数字值和数字对象、布尔值和布尔对象。
1. 可以通过String()、Number()或者Boolean()构造函数来显示创建包装对象。
```javascript
var s = "test";
var S = new String(s);
S.len = 4;
console.log(S.len);//4
```
“==”等于运算符将原始值和其包装对象视为相等，但是“===”全等运算符将它们视为不等。通过typeof可以看到原始值和包装对象的不同。
### 八、不可变的原始值和可变的对象引用
1. JavaScript中的原始值（undefined null 布尔值 数字和字符串）与对象（数组 对象）有着根本区别
+ 原始值不可更改；对象的值可以修改。
+ 原始值的比较是值的比较，对于字符串，只有长度相等且每个索引的字符串都相等的时候才相等。对象的比较并非值的比较，及时两个对象包含相同的属性和相同的值，也是不相等的。由于对象是引用类型，对象值都是引用，对象的比较是引用的比较，当且仅当它们引用容一个基对象的时候，它们才相等。
```javascript
var a = [],b = [];
a===b;//false

var c = [],d = c;
d===c;//true
```
+ 可以通过循环来完成对象或者数组赋值，得到一个对象或者数组的副本。
```javascript   
var a = ['a','b','c'];
var b = [];
a.forEach(function(item,index){
    b[index] = item;
})
```
+ 比较两个单独的数组或者对象，则必须比较它们的属性和元素。
```javascript
function equalArr(a,b){
    if(a.length != b.length){
        return false;
    }else{
        a.forEach(function(item,index){
            if(item != b[index]){
                return false;
            }
        })
        return true;
    }
}
```
### 九、类型转换

1. JavaScript类型转换
1. 
原始值 | 转字符串|转数字|转布尔值|转对象 
---|---|---|---|---
undefined |'undefined'|NaN|false|throws typeError
null|'null'|0|false|throws typeError
true|'true'|1| |new Boolean(true)
flase|'false'|0| |new Boolean(false)
""(空字符串)| |0|false|new String("")
"1.2"||1.2|true|new String("1.2")
"one"||NaN|true|new String("one")
0|"0"| | false|new Number(0)
-0|"-0"| | false|new Number(-0)
NaN|"NaN"| | false|new Number(NaN)
Infinity|"Infinity"| | true|new Number(Infinity)
-Infinity|"-Infinity"| | true|new Number(-Infinity)
1|"1"| | true|new Number(1)
{}(任意对象)|详见3|详见4|true|
[](任意数组)|""|0|true|
["9"](一个数字元素)|"9"|9|true|
["a"](其他数组)|使用join方法|NaN|true|
function(){}|???????|NaN|true

2. 显式类型转换
+ Boolean()、Number()、String()或者Object()函数
```javascript
Number(3)//=>3
String(false)//=?false或者使用false.toString()
Booleab([])//=>tue
Object(3)//=>new Number(3)
```
+ 注意：null和undefined之外的任何值都具有toString()方法，这个方法和String()方法返回的结果一致。
3. 通过运算符做隐式类型转换
```javascript
x+""//等价于String(x)
+x//等价于Number(x),也可以写成x-0
!!x//等价于Boolean(x)
```
4. 对象转换成字符串
+ 如果对象具有toString()方法，则调用，如果它返回一个原始值，JavaScript将这个原始值转换成字符串，并返回这个字符串的结果；
+ 如果对象没有toString()方法，或者这个方法并不返回一个原始值，那么JavaScript就会调用valueOf()方法，如果存在这个方法，则JavaScript调用它，如果返回值是原始值，JavaScript会将这个原始值转换成字符串，并返回这个字符串。
+ 否则，JavaScript无法获得一个原始值，抛出异常。
5. 对象转换成数字
+ 如果对象具有valueOf()方法，则调用，如果它返回一个原始值，JavaScript将这个原始值转换成数字，并返回这个数字；
+ 如果对象没有valueOf()方法，或者这个方法并不返回一个原始值，那么JavaScript就会调用toString()方法，如果存在这个方法，则JavaScript调用它，如果返回值是原始值，JavaScript会将这个原始值转换成数字，并返回这个数字。
+ 否则，JavaScript无法获得一个原始值，抛出异常。
5. 日期对象的类型转换
+ 对象到原始值的转换基本上是对象到数字的转换（调用valueOf()），日期对象则使用对象到字符串的转换模式，通过valueOf()或toString()返回的原始值将会被直接使用，而不会被强制转换成字符串或者数字。
+ 注意：日期对象和"+" "-" "==" 以及 ">"的运行结果
```javascript
var now = new Date();
typeof(now + 1);//"string" 将日期转换成字符串"
typeof(now - 1);//"number" 将日期转换成数字"
now == now.toString();//true 隐式和显示的字符串转换
now > now - 1;//true" 将日期转换成数字"
```
### 十、变量声明
使用var关键字。
### 十一、变量作用域
1. 全局变量拥有全局作用域。
1. 局部变量：只在函数内有定义。在函数体内，局部变量的优先级高于同名的全局变量。
1. 声明提前：JavaScript的函数作用域是指函数内声明所有变量在函数体内始终可见。这意味着变量在定义之间甚至可以使用。
```javascript
var scope = "global";
function f(){
    console.log(scope);//undefined
    var scope = "local";
    console.log(scope);//local
}
```
上述的代码输出的解释是：将函数内的变量声明“提前”到函数体顶部，同时变量初始化留在原来的位置。
4. 作为属性的变量:使用var声明的全局变量不可以通过delete删除.
1. 作用域链：从局部作用域到全局作用域进行变量搜索，如果找不到，则抛出异常。






