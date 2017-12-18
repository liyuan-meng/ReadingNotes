## 第十五章 脚本化文档
### 一、选取文档元素
#### 1. 通过ID选取元素
```javascript
document.getElementById("idName");
```
#### 2. 通过名字选取元素
```javascript
document.getElementsByName("name");
```
#### 3. 通过标签名选取元素
```javascript
document.getElementsByTagName("span");
```
#### 4. 通过class类来获取元素
```javascript
//只有包含所有指定标识符才匹配
document.getElementsByClassName("class1 class2");
```
#### 5. 通过css选择器选取元素
+ document.querySelectorAll():接受包含一个css选择器的字符串参数，返回一个表示文档中匹配选择器的所有元素的NodeList对象。
+ document.querySelector()：接受包含一个css选择器的字符串参数，返回第一个匹配的元素（以文档顺序）或者如果没有匹配的元素就返回null。相当于jQuery中的$()。
```javascript
#nav //id="nav"的元素
div  //所有<div>元素
.warning  //所有class="warning"的元素
p[lang="fr"]  //所有使用语法的段落，如<p lang-"fr">
*[name="x"]  //所有使用语法的且其class="x"的元素
span.fatal.error //其class包含"fatal"和"error"的所有"span"元素。
#log span  //id="log"元素后代元素中的所有<span>元素
#log>span  //id="log"元素所有子元素中的所有<span>元素
body>h1:first-child  //<body>的子元素中的第一个<h1>元素
div, #log  //所有div元素，以及id="log"的元素。
```
+ 注意：很多浏览器会拒绝返回":link"和":visited"等伪类的匹配结果，因为这会泄露用户的浏览历史记录。
### 二、文档结构和遍历
#### 1. 作为节点树的文档
+ Document对象、它的Element对象和文档中表示文本的Text对象都是Node对象。Node定义了以下重要的属性
    + parentNode:该节点的父节点，或者针对Document对象应该是null，因为它没有父节点。
    + childNodes:只读的类数组对象（NodeList对象），它是节点的子节点的实时表示
    + firstChild、lastChild:该节点的子节点中的第一个和最后一个，如果没有子节点则为null。
    + nextSibling、previousSibling:该节点的兄弟节点中的前一个和下一个。
    + nodeType:该节点的类型。9代表Document节点，1代表Element节点，3代表Text节点，8代表Comment节点,11代表DocumentFragment节点。
    + nodeValue:Text节点或者Comment节点的文本内容
    + nodeName:元素标签名，以大写形式表示
```javascript
document.childNodes[0].childNodes[1];
document.firstChild.firstChild.nextSibling;
```
#### 2. 作为元素树的文档
+ firstElementChild,lastElementChild类似firstChild、lastChild
+ nextElementSibling,previousElementSibling类似nextSibling、previousSibling
+ childElementCount:子元素的数量，返回的值和children.length值相等。
### 三、属性
+ HTML元素由一个标签和一组称为属性的名/值对组成。
#### 1. HTML属性作为Element的属性
+ 查询一张图片的URL
```javascript
var image = document.getElementById("myimage");
var imgUrl = image.src;
image.id === "myimage";
```
+ 为form表单设置表单提交的属性。
```javascript
var f = document.forms[0];
f.action = "http://www.example.com";
f.methid = "POST";
```
+ 从HTML属性名转换到JavaScript属性名应该采用小写，如果属性名不止一个单词，则将除了第一个单词之外的首字母大写
+ 有些HTML属性在JavaScript中时保留字，对于这些属性，一般的规则是为属性名加前缀"html"。例如：HTML的"for"属性在JavaScript中变为"htmlFor"属性。"class"在JavaScript中是保留字，在JavaScript代码中它变成"className"。
#### 2.获取和设置非标准HTML属性
+ getAttribute()和setAttribute()方法可以查询和设置非标准的Html属性，也可以用来查询和设置XML文档中元素上的属性。
    + 属性都被看作字符串。
    + 方法使用标准属性名，设置当这些名称是JavaScript保留字也不例外。
    + 属性名不区分大小写。
```javascript
var image = documents.images[0];
var width = parseInt(image.getAttribute("WIDTH"));
image.setAttribute("class","thumbnil");
```
+ Element类型还定义了两个相关的方法，hasAttribute()和removeAttribute()，它们用来检测命名属性是否存在和完全删除属性。
+ 如果操作包含来自其他命名空间中属性的XML文档，可以使用下面四个方法的命名空间版本。：getAttributeNS()、setAttributeNS()、hasAttributeNS()和removeAttributeNS()。
    + 第一个参数：标识命名空间的URI
    + 第二个参数：通常是属性本地的名字，在命名空间中是无效的。但特别的，setAttributeNS()的第二个参数应该是属性的有效名字，包含命名空间前缀。
#### 3. 数据集属性
+ 使用getAttribute()和setAttribute来读和写非标准属性的值。但为此而付出的代价是文档将不再是合法有效的HTML。
+ HTML5提供了"data-"为前缀的小写属性，用来附加额外数据。dataset.x应该v保存data-x属性的值：data-jquery-test属性等价于dataset.jqueryTest属性。
#### 4. 作为Attr节点的属性
attributes:对于非Element类型的任何节点，该属性为null。对于Element对象，attributes属性是只读的类数组对象，代表元素的所有属性。
```javascript
document.body.attributes[0]  //body元素的第一个属性
document.body.atttributes.bgcolor  //body元素的bgcolor属性
document.body.attributes["ONLOAD"]  //body元素的onload属性
```
#### 5.元素的内容
（1）作为HTML的元素内容
+ innerHTML属性
+ outerHtml属性:返回的HTML或XML标记的字符串包含被查询元素的开头和结尾标签
+ insertAdjacentHTML()：将任意HTML标记字符串插入到指定的元素相邻的位置。
    + 第一个参数："beforebegin"、"afterbegin"、"beforeend"、"afterend";
    + 第二个参数：指定插入的标记字符串
（2）作为纯文本的元素内容
+ 使用Node的textContent属性来实现：
    + 除了IE的所有当前浏览器都支持；
    + 将指定元素的所有后代Text节点简单的串联在一起；
    + IE中，可以用Element的innerText属性来代替，除了FireFox的当前浏览器都支持。
    + innerText不返回<script></script>元素中的内容,忽略多余的空白，并试图保留表格格式，innerText针对某些表格元素是只读属性。
```javascript
var para = document.getElementByTagName("p")[0];
var text = para.textContent;
para.textContent = "hello world";
```
（3）创建、插入和删除节点
 + 创建节点
    + document.createTextNode()
    + 每个节点有一个cloneNode()方法来返回该节点的一个全新副本，给方法传递true能够递归复制所有后代节点，传递false只进行一个浅复制。
    + 除了IE浏览器的其他浏览器中，Document对象定义了一个类似的方法importNode(),如果给他传递一个节点，将返回一个适合本文档插入的节点的副本。传递true作为第二个参数，该方法将递归导入所有的后代节点。
```javascript
var newnode = document.createTextNode("text node content");
```
+ 插入节点
    + appendChild()
    + insertBefore():
        + 第一个参数：待插入的节点
        + 第二个参数：已存在的节点，新节点将插入到该节点的前面。
        + 该方法在新节点的父节点上调用，第二个参数必须是父节点的子节点
        + 如果传递null作为第二个参数，insertBefore()的行为和appendChild()类似，将节点插入到最后。
    + 调用appendChild()和insertBefore()将已经存在文档中的一个节点再次插入，那个节点将自动从它当前的位置删除并在新的位置重新插入。
+ 删除和替换节点
    + removeChild()：在父节点上调用，将删除的子节点作为参数:n.parentNode.removeChild(n);
    + replaceChild():删除一个子节点并用一个新的节点取而代之，在父节点上调用：n.parentNode.replaceChild(document.createTextNode("[REDACTED]"), n);
（4）使用DocumentFragment
+ 是一种特殊的Node，它作为其它节点的一个临时的容器。
+ 它是独立的，不是任何其他文档的一部分，它的parentNode总是null。但是类似Element，可以有任意多的子节点，可以用appendChlid()等方法来操作它们。
+ 如果给appendChild()、insertChild()、insertBefore()传递一个DocumentFragment，是将该文档片段的所有子节点插入到文档中，而非片段本身。
```javascript
var frag = document.createDocumentFragment();
```
#### 6. 文档和元素的集合形状和滚动
（1）文档坐标和视口坐标








