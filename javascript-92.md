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
##### （1）文档坐标和视口坐标
+ 坐标系原点：
    + 文档坐标：相对于文档的左上角；文档坐标在用户滚动的时候不会变化。
    + 视口坐标：相对于其中显示文档的视口的左上角。鼠标指针的坐标是视口坐标。
    + 两种坐标系之间相互转换，需要加上或减去滚动的偏移量。 
+ 查询窗口滚动条的位置
```javascript
function getScrollOffsets (w) {
    //使用指定的窗口，如果不带参数则使用当前窗口
    w = w || window;
    //除了IE8以及更早的浏览器，其他浏览器都能用
    if(w.pageXOffset != null) {
        return{
            x: w.pageXOffset,
            y: w.pageYOffset
        };
    }
    //对于标准模式下的IE
    if(document.compatMode) {
        return {
            x: w.document.documentElement.scrollLeft,
            y: w.document.documentElement.scrollTop
        };
    }
    //怪异模式下的浏览器
    return {
        x: w.document.body.scrollLeft,
        y: w.document.body.scollTop
    };
}
```
+ 查询窗口的视口尺寸（当前工作区）
```javascript
function getViewportSize (w) {
    //使用指定的窗口，如果不带参数则使用当前窗口
    w = w || window;
    //除了IE8以及更早的浏览器，其他浏览器都能用
    if(w.innerWidth != null) {
        return{
            x: w.innerWidth,
            y: w.innerHeight
        };
    }
    //对于标准模式下的IE
    if(document.compatMode) {
        return {
            x: w.document.documentElement.cilentWidth,
            y: w.document.documentElement.clientHeight
        };
    }
    //怪异模式下的浏览器
    return {
        x: w.document.body.cilentWidth,
        y: w.document.body.clientHeight
    };
}
```
##### （2）查询元素的几何尺寸
+ getBoundingClientRect():
    + 兼容所有浏览器;
    + 没有参数;
    + 返回一个有left（左上角X）,top（左上角Y）,right（右下角X）,bottom（右下角Y）属性的对象。还有height和width属性，但是在原始的IE中没有实现。
    + 这个对象中属性的位置是相对于视口坐标的。
    + 返回的坐标包含元素的边框和内边距，不包括外边距。
+ getClientRect():
    + 查询内联元素每个独立的矩形
    + 返回一个只读的类数组对象，它的每个元素类似于getBoundingClientRect()返回对象的元素。
+ 注意：这两种方法返回的结果不是实时的，用户滚动浏览器或者改变窗口大小的时候不会更新它们。
+ 获得元素在文档坐标中的坐标：
```javascript
var box = e.getBoundingClientRect();
var offsets = getScrollOffsets();
var x = box.left + offset.x;
var y = box.top + offset.y;
```
+ 计算元素的width和height
```javascript
var box = e.getBoundingClientRect();
var w = box.width || box.right - box.left;
var h = box.height || box.bottom - bottom.top;
```
##### （3）判定元素在某点
+ document.elementFormPoint():
    + 传递X和Y坐标（使用视口坐标）
    + 返回指定位置的一个元素（改点最里面和最外面的坐标）
    + 如果指定的点在视口之外，将返回null
##### （4）滚动
+ scrollBy(0, 10)(window的方法):在当前滚动条的偏移量上水平不变，垂直增加10
+ scroll()(window的方法)
+ scrollTo(0, 10)(window的方法):当前滚动条的偏移量上水平偏移量变为0，垂直偏移量变为10
##### （5）关于元素尺寸、位置和溢出的更多信息
+ offsetLeft和offsetTop:
    + 所有HTML元素拥有这两个属性返回元素的X和Y坐标
    + 对于已定位的后代元素，这两个属性返回的坐标是相对于祖先元素而非文档。
    + 因此使用offsetLeft好offsetRight来计算元素e的位置需要循环，如果e的offsetParent为null这些属性就都是文档坐标。
```javascript
function getElementPosition(e) {
    var x = 0,y = 0;
    while(e != null) {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
    }
    return{x: x,y: y};
}
```
+ clientWidth和clientHeight属性：
    +  HTML属性
    + 只包含内容和内边距，不包括边框；
    + 如果在内边距和边框之间天剑了滚动条，两个属性的返回值也不包含滚动条；
    + 对于内联元素，两者都返回0。
    + 在文档的根元素查询这些属性时，返回值和窗口的innerWidth和innerHeight相等。
+ offsetWidth和offsetHeight属性：
    + HTML属性
    + 和clientWidth和clientHeight属性相似，只是它包含边框
+ scrollWidth和SscrollHeight
    + HTML元素
    + 元素内容区+内边距+任何溢出内容的尺寸
    + 当没有溢出时，和clientWidth和clientHeight相等。
+ scrollLeftscrollTop:
    + HTML属性。
    + 可写的，通过设置他们让元素中的内容滚动。
    + HTML元素没有类似window的scrollTo方法。
+ 当文档包含滚动并且有内容溢出时，返回元素坐标
```javascript
function getElementPos(ele) {
    var x = 0, y = 0;
    for (var e = elt; e != null; e = e.offsetParent) {
        x += e.scrollLeft;
        y += e.scollTop;
    }
    for(var e = ele.parentNode; e != null; e = e.parentNode) {
        x -= e.scrollLeft;
        y -= e.scrollTop;
    }
    return {x: x,y: y};
}
```
#### 7. HTML表单
 
HTML元素 | 描类型属性 | 时间处理程序 | 描述和事件
---|---|---|---
\<input type="button">或者\<button type="button">| "button"|onclick|按钮
\<input type="checkbox">|"checkbox"|onchange|复选按钮
\<input type="file">|"file"|onchange|载入web服务器的文件的文件名输入域，value只读
\<option>|"none"|none|select对象中的单个选项，事件处理程序在select对象上，而非单独的option对象
\<input type="password">|"password"|onchange|密码输入框，输入的字符不可见
\<input type="reset">或\<button type="reset">|"reset"|onclick|重置表单按钮
\<select>|"select-one"|onchange|选项只能单选的下拉菜单
\<select multiple>|"select-multiple"|onchange|选项可以多选的列表
\<input type="text">|"text"|onchange|单行文本输入域，缺省type时的默认元素
\<textarea>|"textarea"|onchange|多行文本输入域

#####（1）选取表单和表单元素
+ 使用getElementById()等标准方法
+ 使用document.querySelectorAll()
+ 使用属性，例如，名字为"address"的表单的第一个元素的name是"street"可以用以下方法选该元素
```javascript
document.forms.address[0]
document.forms.address.street 
document.address.street
```
+ 选取一个名字为shipping的表单元素的所有name为method的单选按钮
```javascript
var methods = document.forms.shipping.elements.method;//类数组
```
##### （2）表单和元素的属性
+ 多数表单元素通常有以下属性
    + type
    + form：对包含元素的Form对象的只读引用，如果不包含任何元素，值为null
    + name:只读
    + value：可读/写
##### （3）表单和元素的事件处理程序
+ onsubmit():
    + 侦测表单提交
    + 表单提交前调用，通过返回false能够取消提交动作
    + 通过单击“按钮”提交，直接调用表单的submit()方法不触发onsubmit事件处理程序
+ onreset()
    + 表单重置之前调用，通过返回false可以阻止表单元素重置。
    + 过单击“按钮”提交，直接调用表单的reset()方法不触发onreset事件处理程序

##### （4）开关按钮checkbox和radio
+ 单选框和复选框：
    + checked属性，可读/写的布尔值
    + defaultChecked属性，布尔值，元素第一次加载页面时是否选中
    + 设置value只改变提交表单时发送到web服务器的字符串
    + onchange事件和onclick事件
##### （5）文本域text、textarea、password、file
+ onchange事件：用户完成编辑并且将焦点移出了文本域
+ 从onkeypress或者onkeydown事件处理程序返回false，防止记录用户的按键
#### （7）选择框和选项元素select
+ onchange事件
+ 每个Option对象有一个text属性，指定了select元素中的选项所显示的纯文本字符串；value属性制定了提交表单发送到web服务器的文本字符串，它是可读/写的
+ 通过设置options.length可以从Select元素中溢出所有选项，设置options[]数组中某点null删除某个单独Option对象
#### 8. 其他文档特性
（1）Document的属性
+ body、documentElement、forms等特殊文档元素
+ cookie
+ domain: 该属性允许当web页面之间交互的时候，相同域名下相互信任的web服务器之间协作放宽同源策略安全限制
+ lastModified:包含文档修改时间的字符串
+ location:与Window对象的location属性引用同一个Location对象
+ referrer:如果有，它表示浏览器导航到当前链接的上一个文档，该属性值和HTTP的Referer头信息的内容相同
+ title:文档的<title></title>标签之间的内容
+ URL：文档的URL，只读字符串，该属性值和location.href的初始值相同，但是不会发生动态变化。
（2）document.write()方法：将字符串连接起来，然后将结果字符串插入到文档中调用它的脚本元素的位置
（3）查询选取的文本
+ window.getSelection().toString():HTML5标准API
+ document.selection.createRange().text:IE特有的技术
（4）可编辑的内容
+ 给元素标签设置contenteditable可以创建一个可编辑的区域
+ 给元素添加spellcheck属性显示开启拼写检查，使用sepllcheck=false可以显示关闭该功能
+ Document对象的designMode属性设置为字符串"on"使得整个文档可编辑







