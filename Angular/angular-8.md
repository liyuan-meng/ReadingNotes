## ui-router

### 1.配置使用ui-router

#### （1）导入js文件

```html
<script type="text/javascript" src="JS/angular.min.js"></script>
<script type="text/javascript" src="JS/angular-ui-router.min.js"></script>
```

#### （2）注入angular模块

```html
var app = angular.module('myApp', ['ui.router']);
```

#### （3）定义视图

```js
<ui-view><ui-view/>
```

#### （4）配置路由状态

```html
app.config(["$stateProvider", function ($stateProvider){       
    $stateProvider     
    .state("home", { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/',    //访问路径 
        template:'<div>模板内容......</div>'
    })      

 }]);
 ```
 
 ### 2.嵌套路由的实现
 
 #### （1）相对路径的方式:‘parent’将匹配…./index.html#/parent； ‘parent.child’将匹配…./index.html#/parent/child。 
 
 ```html  
  <body >    
    <div ng-app="myApp" >
        <a ui-sref="parent">点我显示父view内容</a>
        <a ui-sref="parent.child">点我显示父view与子view内容</a>
        <div ui-view></div> <!-- 父View -->      
    </div>  
  </body>


  <script type="text/javascript">
    var app = angular.module('myApp', ['ui.router']);   
    app.config(["$stateProvider",  function ($stateProvider) {      
        $stateProvider     
        .state("parent", {//父路由
            url: '/parent',  
            template:'<div>parent'
                    +'<div ui-view><div>'// 子View
                    +'</div>'
        })      
        .state("parent.child", {//子路由
            url: '/child',    
            template:'<div>child</div>'
        })     
    }]);

  </script>
 ```
 #### （2）绝对路径的方式
 
 ```html
 .state("parent.child", {
    url: '^/child',    
    template:'<div>child</div>'
})
```

 
 
 
 
 
 
 
 
 
 
 
 
 
 
