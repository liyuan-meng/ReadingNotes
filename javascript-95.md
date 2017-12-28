## 一、XMLHTTPRequest
XMLHttpRequest 是一个API，它为客户端提供了在客户端和服务器之间传输数据的功能。它提供了一个通过 URL 来获取数据的简单方式，并且不会使整个页面刷新。这使得网页只更新一部分页面而不会打扰到用户。XMLHttpRequest 在 AJAX 中被大量使用。

### 1.构造函数：XMLHttpRequest()
构造函数初始化一个 XMLHttpRequest 对象。必须在所有其他方法被调用前调用构造函数。

### 2.属性

#### （1）onreadystatechange 
+ XMLHttpRequest.onreadystatechange = callback;
+ 当 readyState 的值改变的时候，callback 函数会被调用。
```javascript
var xhr= new XMLHttpRequest(),
    method = "GET",
    url = "https://developer.mozilla.org/";

xhr.open(method, url, true);
xhr.onreadystatechange = function () {
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    console.log(xhr.responseText)
  }
}
xhr.send();
```

#### (2) readyState
+ XMLHttpRequest.readyState 属性返回一个 XMLHttpRequest  代理当前所处的状态。

#### (3) responseXML
+ XMLHttpRequest.responseXML 属性是一个只读值，它返回一个包含请求检索的HTML或XML的Document，如果请求未成功，尚未发送，或者检索的数据无法正确解析为 XML 或 HTML，则为 null。该响应被解析，就像它是一个 “text / xml” 流。当 responseType 设置为 “document” 并且请求已异步执行时，响应将解析为 “text / html” 流。responseXML 对于任何其他类型的数据以及 data: URLs 为 null。

#### (4) timeout
+ XMLHttpRequest.timeout 是一个无符号长整型数，代表着一个请求在被自动终止前所消耗的毫秒数。默认值为 0，意味着没有超时。超时并不应该用在一个 document environment 中的同步 XMLHttpRequests  请求中，否则将会抛出一个 InvalidAccessError 类型的错误。当超时发生， timeout 事件将会被触发。

#### (5) upload
+ XMLHttpRequest.upload方法返回一个 XMLHttpRequestUpload对象，用来表示上传的进度。这个对象是不透明的，但是作为一个XMLHttpRequestEventTarget，可以通过对其绑定事件来追踪它的进度。

#### （6）response
+ 响应实体的类型由 responseType 来指定， 可以是 ArrayBuffer， Blob， Document， JavaScript 对象 (即 "json")， 或者是字符串。如果请求未完成或失败，则该值为 null

#### (7) responseText
+ 此次请求的响应为文本，或是当请求未成功或还未发送时为 null。只读。

#### (8) status
+ 请求的响应状态码 (例如, 状态码200 表示一个成功的请求).只读.

#### （9）statusText
+ 该请求的响应状态信息,包含一个状态码和原因短语 (例如 "200 OK"). 只读.

### 2.方法

#### （1） abort()
+ 如果该请求已被发出，XMLHttpRequest.abort() 方法将终止该请求。当一个请求被终止，它的 readyState 属性将被置为0（ UNSENT )。
```javascript
var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://developer.mozilla.org/";
xhr.open(method,url,true);

xhr.send();

xhr.abort();
```

#### (2) getAllResponseHeaders()
+ 返回所有响应头信息(响应头名和值), 如果响应头还没接受,则返回null.

#### (3) open()
+ 初始化一个请求. 该方法用于JavaScript代码中;如果是本地代码, 使用 openRequest()方法代替.
+ 注意: 在一个已经激活的request下（已经调用open()或者openRequest()方法的request）再次调用这个方法相当于调用了abort（）方法。
+ 参数：
    + method：请求所使用的HTTP方法; 例如 "GET", "POST", "PUT", "DELETE"等. 如果下个参数是非HTTP(S)的URL,则忽略该参数.
    + url:该请求所要访问的URL
    + async:一个可选的布尔值参数，默认为true,意味着是否执行异步操作，如果值为false,则send()方法不会返回任何东西，直到接受到了服务器的返回数据。如果为值为true，一个对开发者透明的通知会发送到相关的事件监听者。这个值必须是true,如果multipart 属性是true，否则将会出现一个意外。
    + user:用户名,可选参数,为授权使用;默认参数为空string.
    + password:密码,可选参数,为授权使用;默认参数为空string.

#### (4) send():
+ 发送请求. 如果该请求是异步模式(默认),该方法会立刻返回. 相反,如果请求是同步模式,则直到请求的响应完全接受以后,该方法才会返回.
+ 注意: 所有相关的事件绑定必须在调用send()方法之前进行.

#### (5) setRequestHeader()
+ 给指定的HTTP请求头赋值.在这之前,你必须确认已经调用 open() 方法打开了一个url.
+ 参数：
    + header：将要被赋值的请求头名称.
    + value：给指定的请求头赋的值.

### 3. 实例
```javascript
    // 发送请求
    function postMessage(msg) {
        var request = new XMLHttpRequest();
        request.open("POST", "/log.php");
        request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.send(msg);
    }
```
```javascript
    // 取得相应
    function getText(url, callback) {
        var request = new XMLHttpRequest();
        request.open("GET", url);
        request.onreadystatechange = function (ev) {
            if(request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader("Content-type");
                if(type.match(/^text/)) {
                    callback(request.responseText);
                }
            }
        };
        request.send(null);
    }
```


