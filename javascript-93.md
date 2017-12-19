## 第十六章 脚本化css
### 一、脚本化内联样式
1. 名字约定：如果一个css属性没有连字符，就采用小写形式。如果有一个或者多个连字符，那么去掉连字符，除了第一个单词外，其他的单词首字母大写。如果一个css属性在JavaScript是保留字，在之前加"css"前缀创建合法的名字。
```javascript
e.style.position = "absolute";
e.style.fontFamiliy = "snas-serif";
```
2. 单位不能省略
```javascript
e.style.left = "12px";
```
3. 复合属性
```javascript
e.style.margin = topMargin + "px" +rightMargin + "px" +bottomMargin + "px" +leftMargin + "px";
```
4. 作为单个字符串值来查询元素的内联样式：setAttribute()和getAttribute()
```javascript
// 两者都可以设置e的样式属性为字符串s
e.setAttribute('style',s);
e.style.cssText = s;
//两者都可以查询元素的内联样式
s = e.getAttribute("style");
s = e.style.cssText;
```
## 二、动画
1. 使用setTimeout()和setInterval()重复调用函数来修改元素的内联样式达到目的。
## 三、脚本化css类
1. className属性只指定0个或者1个类名。 
2. classList：将className当做一个CSS类集合。但是并不是所有浏览器都支持这个属性
```javascript
// 如果e有classList属性则返回，否则返回一个模拟的对象
// 返回的对象有contains()、add()、remove()、和toString()等方法来检测和修改元素e的集合。如果classList属性是原生支持的。
// 返回的类数组对象有length和数组索引属性，但是它有一个toArray()方法来返回一个含元素类名的纯数组快照。
function classList(e) {
    if(e.classList) return e.classList;
    else return new CSSClassList(e);
}
function CSSClassList(e) {this.e = e;}
// 如果e.className包含类名c则返回true，否则返回false
CSSClassList.prototype.contains = function(c) {
    if(c.length === 0 || c.indexOf(" ") != -1) throw new Error("invalid class name");

    var classes = this.e.className;
    if(!classes) return false;//e不包含类名
    if(classes === c) return true;
    // 否则，把c自身看成一个单词，利用正则表达式搜索c，\b表示单词边界。
    return classes.search("\\b" + c + "\\b") != -1;
};
// 如果c不存在，将c添加到e.className
CSSClassList.prototype.add = function(c) {
    if(this.contains(e)) return;
    var classes = this.e.className;
    if(classes && classes[classes.length] != " ") {
        c = " " + c;
    }
    this.e.className += c;
};
// 将e.className中出现的所有c删除
CSSClassList.prototype.remove = function(c) {
    if(c.length && c.indexOf(" ") != -1) throw new Error("invalid class name");
    var pattern = new RegExp("\\b" + c + "\\b\\s*", g);
    this.e.className = this.e.className.replace(pattern, ""); 
};
// toggle
CSSClassList.prototype.toggle = function(c) {
    if(this.contains(c)) {
        this.remove(c);
        return false;
    } else {
        this.add(c);
        return true;
    }
};
// 返回e.className本身
CSSClassList.prototype.toString = function() {return this.e.className;};
// 返回e.className中的类名
CSSClassList.prototype.toArray = function() {
    return this.e.className.match(/\b\w+\b/g) || [];
}
```
### 四、脚本化样式表
1. 开启和关闭样式表
2. 查询、插入和删除样式表
3. document.styleSheets[]数组的元素是CSSStyleSheet对象
4. insertRule()和deleteRule()用来添加和删除规则，IE中对应的是addRule()和removeRule()
5. 创建新样式表：document.createStyleSheet()
