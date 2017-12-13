## 第7章 数组
### 1. 创建数组
（1）使用数组直接量创建
```javascript 1.5
var arr = [1,[3,4,5],3];
```
（2）调用构造函数Array创建
+ 无参数
```javascript 1.5
var a = new Array();
```
+ 有一个参数，指定数组长度
```javascript 1.5
var a = new Array(10)
```
+ 显示指定两个或者多个数组元素或者数组的一个非数值元素
```javascript 1.5
var arr = new Array(1,2,4,"testing");
```
#### 2. 数组的读和写
使用[]访问数组中的一个元素。
#### 3. 稀疏数组：length属性值大于元素个数
（1）创建稀疏数组
方法1：
```javascript 1.5
var a = [];
a[1000] = 0;//赋值添加一个元素，length值为1001
```
方法2：
```javascript 1.5
var a = new Array(10);
```
方法3：使用delete操作符可以创建稀疏数组
```javascript 1.5
var a = [1,2,3];
delete a[0];//a在索引0的位置不再有元素
console.log(0 in a);//false数组索引为0在数组中未定义
console.log(a.length);//3 delete操作不影响数组长度
```
（3）在数组直接量中省略值不会创建稀疏数组，省略的元素是存在的，值为undefined。
#### 4. 数组长度：length
#### 5. 数组元素的添加和删除
##### 添加数组元素
（1）为新索引赋值
（2）使用push()在数组末尾添加元素或者使用unshift()在数组开头添加元素
##### 删除数组元素
（1）使用delete运算符
（2）使用pop()方法删除数组末尾的元素或者使用shift()方法删除开头的元素
#### 6. 数组遍历
（1）使用for循环
（2）使用for/in循环，并且过滤出不想要的属性。ECMAScript允许for/in循环以不同的顺序遍历对象的属性，所以最好不要用for/in循环遍历数组。
（3）使用forEach()循环
#### 7. 多维数组
```javascript 1.5
//创建一个行和列长度都为10的二维数组。
var table = new Array(10);
table.forEach(function(item){
    item = new Array(10)
})
```
#### 8. 数组方法
##### （1）join():
+ Array.join()方法将数组中所有的元素转化成字符串并拼接在一起，返回最后生成的字符串。
##### （2）reverse():
+ Array.reverse()方法将数组元素颠倒顺序，返回逆序的数组。改变原数组
```javascript 1.5
var a = [1,2,4,5];
console.log(a.reverse());//[ 5, 4, 2, 1 ]
console.log(a === a.reverse())//true
```
##### （3）sort():
+ Array.sort()方法将数组中的元素排序并返回排序后的数组,数组元素默认以字母表顺序排序。如果数组包含undefined元素，排在后面，改变原数组
+ 参数：可选，用来指定按某种顺序进行排列的函数。
+ 用数值大小而非字母表书序进行数组排序。
```javascript 1.5
var a = [33,11,4,222];
a.sort();//字母表顺序11，222，33，4
a.sort(function(a,b){
    return a - b;//如果函数返回值大于0,a排在b前面
});//数值大小顺序[ 4, 11, 33, 222 ]
a.sort(function(a,b){
    return b - a;
});//数值大小相反顺序[ 222, 33, 11, 4 ]
```
+ 对一个字符串数组执行不区分大小写的字母表排序
```javascript 1.5
var a = ['ant','Bug','cat','Dog'];
a.sort();//区分大小写顺序['Bug','Dog','ant','cat']
a.sort(function(s,t){
    var a = s.toLowerCase();
    var b = t.toLowerCase();
    if(a > b) return 1;
    if(a < b) return -1;
    return 0;
});//['ant','Bug','cat','Dog']
```
##### (5) concat()
+ Array.concat()方法创建并返回一个新数组，不改变调用的数组
##### （6）slice()
+ Array.slice()方法返回指定数组的一个片段或子数组，它的两个参数分别指定了片段开始和结束的位置，返回的数组包含第一个参数指定的位置和所有到但不含有第二个参数指定的位置之间的所有元素。如果省略第二个参数，返回的新数组将包含从指定起始位置到数组结尾的所有元素。不改变原数组。
```javascript 1.5
var a = [1,2,3,4,5];
a.slice(1,3);//2,3
a.slice(3);//4,5
a.slice(1,-1);//2,3,4(-1指定了最后一个元素)
a.slice(-3,-2);//3
```
##### （7）splice()
+ Array.splice()方法是在数组中插入或删除元素的通用方法；
+ 第一个参数指定了插入或者删除的位置；
+ 第二个参数制定了应该从数组中删除的元素的个数。省略第二个参数，从起点到数组结尾所有元素都被删除。
+ splice()返回一个由删除元素组成的新数组，如果没有删除元素就返回一个空数组。改变原数组。
```javascript 1.5
var a = [1,2,3,4,5,6,7,8];
console.log(a.splice(4));//[ 5, 6, 7, 8 ]
console.log(a)//[ 1, 2, 3, 4 ]
```
##### （8）push()和pop()
+ push()方法在数组尾部添加一个或者多个元素，返回数组新的长度，改变原数组；
+ pop()方法删除数组最后一个元素。返回删除的元素值，改变原数组。
##### （9）unshift()和shift()
+ unshift()方法在数组首部添加一个或者多个元素，返回数组新的长度，改变原数组；
+ shift()方法删除数组首部第一个元素。返回删除的元素值，改变原数组。
##### （10）toString()和toLocaleString()
+ 将数组转换为数组中每个元素用逗号分隔的字符串列表。
##### （11）forEach()
+ 从头到尾遍历数组，为每个元素调用指定的函数。
##### （12）map()
+ map()方法将调用的数组的每个元素传递给指定的函数，并返回一个新数组，这个数组包含该函数的返回值。不改变原数组
##### （13）filter()
+ filter()方法返回的新数组是调用的数组的一个子集，传递的函数时用来逻辑判断的：该函数返回true或false。不改变原数组
```javascript 1.5
var a = [5,4,3,2,1];
smallvalues = a.filter(function(x){return x < 3});//[2,1]
everyother = a.filter(function(x,i){return i%2 == 0});//[5,3,1]
```
+ filter()会跳过稀疏数组的空缺，它的返回数组总是稠密的，所以使用filter可以压缩稀疏数组空缺，代码如下：
```javascript 1.5
var a = [2,3,4];
a.length = 10;
console.log(a);//[ 2, 3, 4, <7 empty items> ]
var b = a.filter(function(){return true});
console.log(b);//[ 2, 3, 4 ]
console.log(a);//[ 2, 3, 4, <7 empty items> ]
```
+ 甚至，压缩空缺并删除undefined和null元素，可以这样做
```javascript 1.5
a = a.filter(function(x){return x !== undefined && x !=null});
```
##### (14) every()和some()
+ every()和some()方法是数组的逻辑判定，它们对数组元素应用指定的函数进行判定，返回true或false
```javascript 1.5
a = [1,2,3,4,5];
a.every(function(x){return x < 10});//true 所x有值都小于10
```
```javascript 1.5
a = [1,2,3,4,5];
a.every(function(x){return x % 2 === 0});//true a中含有偶数值
```
##### （15）reduce()和reduceRight()
+ reduce()和reduceRight()方法使用指定的函数将数组元素进行组合，生成单个值。这种操作可以称为“注入”和“折叠”。不改变原数组
+ 第一个参数是执行化简操作的函数，化简函数的任务就是用某种方法把两个值组合或者化简为一个值，并返回化简后的值。
+ 第二个参数（可选）是一个传递给函数的初始值。如果没有指定初始值，会将数组的第一个元素作为初始值。
+ 在空数组上，不带有初始值参数调用将导致类型错误异常。如果调用它的时候只有一个值——数组只有一个元素并且没有指定初始值，或者有一个空数组并且指定了初始值，reduce()知识简单的返回那个值而不会调用化简函数。
+ reduceRight()方法按照数组从高到低处理数组。
```javascript 1.5
var a = [1,2,3,4,5];
var sum = a.reduce(function(x,y){return x+y;},0);
var product = a.reduce(function(x,y){return x*y},1);
```
##### （16）indexOf()和lastIndexOf()
+ indexOf()和lastIndexOf()方法返回找到的第一个元素的索引或者没有找到饭后-1
+ 第一个参数是需要搜索的值。
+ 第二个参数可选：它指定数组中的一个索引，从那里开始搜索。
#### 10.数组类型
（1）ES5中，可以使用Array.isArray()函数来判定数组类型。
```javascript 1.5
Array.isArray([]);//true
Array.isArray({});//false
```
isArray()
```javascript 1.5
var isArray = Function.isArray || function(o){
    return typeof o === "object" && 
    Object.prototype.toString().call(o) === "[object Array]";
}
```
#### 11. 类数组对象
（2）Arguments对象是一个类数组对象。
（3）一些Dom方法（如document.getElementByTagName()）也会返回类数组对象。
（4）JavaScript数组方法可以在类数组对象上正确工作。
（5）类数组对象没有直接继承自Array.prototype,那就不能在它们上面直接调用数组方法，尽管如此，也可以间接地使用Function.call方法调用。
```javascript 1.5
Array.join = Array.join || function(a,sep){
    return Array.prototype.join.call(a,sep)
}
```
#### 12. 作为数组的字符串
+ 字符串的行为类似于只读的数组，但是针对字符串的typeof操作符仍然返回"string"，给Array.isArray()传递字符串，将返回false。
+ 字符串是不可变值，把它们当做数组看待时，它们是只读的。