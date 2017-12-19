## 第十七章 事件处理
+ 事件类型：用来说明发生什么类型事件的字符串
+ 事件目标：发生的事件与之相关的对象
+ 事件处理程序或事件监听程序：处理或响应事件的函数
+ 事件对象：与特定事件相关且包含有关该事件详细信息的对象
+ 事件传播：浏览器决定哪个对象触发事件处理程序的过程
### 一、事件类型
+ 事件分类：
    + 依赖于设备的输入事件（mousedown mousemove mouseup keydown keypress keyup等）
    +  独立于设备的输入事件（textinput）
    +  用户界面事件（focus submit）
    +  状态变化事件（load readystatechange loadstart progress loadend）
    +  特定API事件（dragstart dragenter dragover drop）
+ 传统事件类型：
    + 表单事件
    + window事件
    + 鼠标事件
    + 键盘事件
+ Dom事件 
+ HTML5事件
+ 触摸屏和移动设备事件
### 二、注册事件处理程序
#### 1. 设置JavaScript对象属性为事件处理程序
（1）事件处理程序属性名字由“on”后面跟着事件名字组成：onclick、onchange、onload、onmouseover等。
```javascript
// 设置window对象的onload属性为一个函数，该函数是事件处理程序：在文档加载完毕时调用。
window.onload = function() {
    // 查找一个<form>元素
    var elt = document.getElementById("shipping_address");
    // 注册事件处理程序函数，在表单提交之前调用
    elt.onsubmit = function() {
        return validate(this);
    }
}
```
#### 2. 设置HTML标签属性为事件处理程序
例如：
```html
<button onclick="alert(hello world);">click me</button> 
```
+ 直接在浏览器上而非特定的文档元素上触发的事件,在js中，这些事件的处理程序在window对象上注册。在html中，会把它们放到body标签上，但浏览器会在window对象上注册它们。
```
onafterprint   onfocus       ononline    onresize 

onbeforeprint  onhashchange  onpagehide  onstorage

onbeforeunload onload        onpageshow  onundo

onblur         onmessage     onpopstate  onunload

onerror        onoffline     onredo

```
#### 3. addEventListener()和removeEventListener()
+ 第一个参数：注册处理程序的事件类型，字符串，不包括用于设置事件处理程序属性的前缀"on"。
+ 第二个参数：当指定类型的事件发生时应该调用的函数
+ 第三个参数：布尔值，通常情况下为false，如果传递了true，那么函数将注册为捕获事件处理程序，并在事件不同调用阶段调用。
+ 使用和removeEventListener()从对象上溢出事件处理程序。参数和addEventListener相同。
+ IE9之前的IE不支持这两个方法。
```javascript
var b = document.getElementById("mybutton");
b.addEventListener("click", function() {alert("hello");}, false);
```
注意：上面的代码即使多次执行也只alert一次，因为处理程序只注册一次。
#### 4.attachEvent()和deleteEvent()
+ IE5以后的版本定义的类似addEventListener()和removeEventListener()的方法
+ 不同之处
    + IE事件模型不支持事件捕获，所以这两个方法只有两个参数：事件类型和处理程序函数
    + IE方法的第一个参数使用了带"on"前缀的事件处理程序属性名
    + addachEvent()允许相同的时间处理程序函数注册多次
### 三、事件处理程序的调用
#### 1. 事件处理程序的参数
+ 通常调用事件处理程序时把事件对象event作为他们的一个参数。
+ IE8以及之前的版本，通过全局对象window.event来获得事件对象。
```javascript
fucntion handler(event) {
    event = event || window.event;
    //......
}
```
#### 2. 事件处理程序的运行环境
+ 在事件处理程序中，this关键字指的是事件目标。但是对于attachEvent()来讲是不对的，使用attachEvent()注册的处理程序作为函数调用，它们的this值是全局对象（window）。可以通过call该变this指向。
#### 3. 事件处理程序作用域
+ 事件处理程序从词法上讲也是作用域
+ 例外：通过HTML属性来注册事件处理程序，它们被转换为能存取全局变量的顶级函数而非任何本地变量。尽量不要使用这种方法
#### 4. 事件处理程序的返回值
+ 表单事件提交按钮的onclick事件处理程序能返回false组织浏览器提交表单
+ 输入域上的onkeypress事件处理程序返回false来过滤键盘输入。
+ window对象的onbeforeunload事件处理程序的返回值：当浏览器要跳转到新页面时触发这个事件，如果事件处理程序返回一个字符串，那么它将出现在询问用户是否离开当前页面的标准对话框中。
#### 5. 调用顺序
+ 通过设置对象属性或者HTML属性注册的处理程序一直优先调用
+ 使用addEventListener()注册的程序按照他们的注册顺序调用
+ 使用attachEvent()注册的处理程序可能按照任何顺序调用，所以代码不应该依赖于调用顺序
#### 6. 事件传播
##### 三个阶段
（1）事件捕获

事件的第一个阶段是捕获阶段。事件从文档的根节点流向目标对象节点。途中经过各个层次的DOM节点，并在各节点上触发捕获事件，直到到达事件的目标节点。捕获阶段的主要任务是建立传播路径，在冒泡阶段，事件会通过这个路径回溯到文档跟节点。

（2）目标阶段

当事件到达目标节点的，事件就进入了目标阶段。事件在目标节点上被触发，然后会逆向回流，直到传播至最外层的文档节点。

（3）事件冒泡

事件在目标元素上触发后，并不在这个元素上终止。它会随着DOM树一层层向上冒泡，回溯到根节点。
冒泡过程非常有用。它将我们从对特定元素的事件监听中释放出来，如果没有事件冒泡，我们需要监听很多不同的元素来确保捕获到想要的事件。

##### 事件代理
在传统的事件处理中，你按照需要为每一个元素添加或者是删除事件处理器。然而，事件处理器将有可能导致内存泄露或者是性能下降——你用得越多这种风险就越大。JavaScript事件代理可以把事件处理器添加到一个父元素上，这样就避免了把事件处理器添加到多个子元素上。

##### 阻止事件冒泡
（1）为什么要阻止事件冒泡

有种可能是，某个DOM节点绑定了某事件监听器，本来是想当该DOM节点触发事件，才会执行回调函数。结果是该节点的某后代节点触发某事件，由于事件冒泡，该DOM节点事件也会触发，执行了回调函数，这样就违背了最初的本意了。

（2）如何阻止事件冒泡

event.stopPropagation()方法就能阻止事件的冒泡。

（3）无法在捕获阶段阻止事件冒泡

##### 注意
在调用在目标上注册的事件处理函数后，大部分事件会冒泡到Dom树根，调用目标的父元素的事件处理程序，然后调用在目标祖父元素上注册的事件处理程序。这会一直到Document对象，最后到Window对象。但是：
+ focus、blur、scroll事件不会发生冒泡
+ 文档元素上的load会冒泡，但他会在Document对象上停止冒泡而不会传播到window对象，只有当整个文档都加载完毕之后才会出发Window对象上的load事件。
#### 7. 事件取消
（1）取消事件相关的默认操作：preventDefault()
+ 如果在同一对象上定义了其他处理程序，剩下的处理程序将依然会被调用
```javascript
function cancelHandler(event) {
    var event = event || window.event;
    if(event.preventDefault) event.preventDefault();//标准技术
    if(event.returnValue) event.returnValue = false;//IE
    return false;//用于处理使用对象属性注册的处理程序
}
```
（2）取消事件传播：stopPropagation()
+ 如果在同一对象上定义了其他处理程序，剩下的处理程序将不会被调用
### 四、文档加载事件
load()
#### 五、鼠标事件
+ 除了mouseenter和mouseleave外的所有鼠标事件都能冒泡
+ 传递给鼠标事件处理程序的事件对象有clientX和clientY属性。
+ alertKey、ctrKey、metaKey和shiftKey属性制定了发生时是否有键盘辅助键按下
#### 六、事件
##### 1. 事件句柄

属性 | 事件发生在何时....
---|---
onabort| 图像的加载被中断。
onblur| 元素失去焦点。
onchange| 域的内容被改变。
onclick| 当用户点击某个对象时调用的事件句柄。
ondblclick| 当用户双击某个对象时调用的事件句柄。
onerror| 在加载文档或图像时发生错误。
onfocus| 	元素获得焦点。
onkeydown| 	某个键盘按键被按下。
onkeypress| 某个键盘按键被按下并松开。
onkeyup| 某个键盘按键被松开。
onload| 一张页面或一幅图像完成加载。
onmousedown| 	鼠标按钮被按下。
onmousemove| 鼠标被移动。
onmouseout| 鼠标从某元素移开。
onmouseover| 鼠标移到某元素之上。
onmouseup| 	鼠标按键被松开。
onreset| 	重置按钮被点击。
onresize| 窗口或框架被重新调整大小。
onselect| 文本被选中。
onsubmit| 确认按钮被点击。
onunload| 用户退出页面。

##### 2.鼠标 / 键盘属性

属性 | 描述
---|---
altKey| 返回当事件被触发时，"ALT" 是否被按下。
button| 返回当事件被触发时，哪个鼠标按钮被点击。
clientX| 返回当事件被触发时，鼠标指针的水平坐标。
clientY| 返回当事件被触发时，鼠标指针的垂直坐标。
ctrlKey| 返回当事件被触发时，"CTRL" 键是否被按下。
metaKey| 返回当事件被触发时，"meta" 键是否被按下。
relatedTarget| 	返回与事件的目标节点相关的节点。
screenX| 	返回当某个事件被触发时，鼠标指针的水平坐标。
screenY| 返回当某个事件被触发时，鼠标指针的垂直坐标。
shiftKey| 返回当事件被触发时，"SHIFT" 键是否被按下。

##### 3.IE 属性

属性 | 描述
---|---
cancelBubble| 如果事件句柄想阻止事件传播到包容对象，必须把该属性设为 true。
fromElement| 对于 mouseover 和 mouseout 事件，fromElement 引用移出鼠标的元素。
keyCode| 对于 keypress 事件，该属性声明了被敲击的键生成的 Unicode 字符码。对于 keydown 和 keyup 事件，它指定了被敲击的键的虚拟键盘码。虚拟键盘码可能和使用的键盘的布局相关。
offsetX,offsetY| 发生事件的地点在事件源元素的坐标系统中的 x 坐标和 y 坐标。
returnValue| 如果设置了该属性，它的值比事件句柄的返回值优先级高。把这个属性设置为 fasle，可以取消发生事件的源元素的默认动作。
srcElement| 对于 mouseover 和 mouseout 事件，该属性引用移入鼠标的元素。
x,y| 	事件发生的位置的 x 坐标和 y 坐标，它们相对于用CSS动态定位的最内层包容元素。

##### 4.标准 Event 属性
下面列出了 2 级 DOM 事件标准定义的属性。

属性 | 描述
---|---
bubbles| 返回布尔值，指示事件是否是起泡事件类型。
cancelable| 返回布尔值，指示事件是否可拥可取消的默认动作。
currentTarget| 返回其事件监听器触发该事件的元素。
eventPhase| 返回事件传播的当前阶段。
target| 返回触发此事件的元素（事件的目标节点）。
timeStamp| 返回事件生成的日期和时间。
type| 	返回当前 Event 对象表示的事件的名称。

##### 5.标准 Event 方法
下面列出了 2 级 DOM 事件标准定义的方法。IE 的事件模型不支持这些方法：

属性 | 描述
---|---
initEvent()| 初始化新创建的 Event 对象的属性。
preventDefault()| 通知浏览器不要执行与事件关联的默认动作。
stopPropagation()| 不再派发事件。