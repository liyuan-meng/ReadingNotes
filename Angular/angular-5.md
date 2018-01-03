## 第十章 AngularJS 表单(Forms)

> http://www.angularjs.net.cn/tutorial/4.html

### 一、使用css类：

为了允许对表单和控件自定义样式， ngModel 增加了如下的CSS类： - ng-valid - ng-invalid - ng-pristine - ng-dirty

```html

<!-- user.name 和 user.email 都是必需的（required），它们仅在成为脏数据(dirty)时才会显示红色背景，但不会在初始状态下（也为空）显示。
 -->

<!doctype html>
<html ng-app>
  <head>
    <script src="http://code.angularjs.org/1.2.25/angular.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div ng-controller="Controller">
      <form novalidate class="css-form">
        Name:
          <input type="text" ng-model="user.name" required /><br />
        邮箱: <input type="email" ng-model="user.email" required /><br />
        性别: <label><input type="radio" ng-model="user.gender" value="male" />男</label>
        <label><input type="radio" ng-model="user.gender" value="female" />女</label><br />
        <button ng-click="reset()">重置</button>
        <button ng-click="update(user)">保存</button>
      </form>
    </div>
    
    <style type="text/css">
      .css-form input.ng-invalid.ng-dirty {
        background-color: #FA787E; /*红色*/
      }
    
      .css-form input.ng-valid.ng-dirty {
        background-color: #78FA89;
      }
    </style>
  </body>
</html>
```

```js
function Controller($scope) {
  $scope.master = {};
 
  $scope.update = function(user) {
    $scope.master = angular.copy(user);
  };
 
  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
  };
 
  $scope.reset();
}
```

### 二、与表单绑定和控制状态

```html
<!-- 
扩展：
1. 重置按钮 只在表单有改变的时候才可用
1. 保存按钮 只在表单有改变且数据有效的时候才可用‘
1. 为 user.email 和 user.agree 自定义错误提示信息
 -->
<!doctype html>
<html ng-app>
  <head>
    <script src="http://code.angularjs.org/1.2.25/angular.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div ng-controller="Controller">
      <form name="form" class="css-form" novalidate>
        Name:
          <input type="text" ng-model="user.name" name="uName" required /><br />
        E-mail:
          <input type="email" ng-model="user.email" name="uEmail" required/><br />
        <div ng-show="form.uEmail.$dirty && form.uEmail.$invalid">Invalid:
          <span ng-show="form.uEmail.$error.required">Tell us your email.</span>
          <span ng-show="form.uEmail.$error.email">This is not a valid email.</span>
        </div>
    
        Gender: <input type="radio" ng-model="user.gender" value="male" />male
        <input type="radio" ng-model="user.gender" value="female" />female<br />
    
        <input type="checkbox" ng-model="user.agree" name="userAgree" required />
        I agree: <input ng-show="user.agree" type="text" ng-model="user.agreeSign"
                  required /><br />
        <div ng-show="!user.agree || !user.agreeSign">Please agree and sign.</div>
    
        <button ng-click="reset()" ng-disabled="isUnchanged(user)">RESET</button>
        <button ng-click="update(user)"
                ng-disabled="form.$invalid || isUnchanged(user)">SAVE</button>
      </form>
    </div>
  </body>
</html>
```
```js
function Controller($scope) {
  $scope.master = {};
 
  $scope.update = function(user) {
    $scope.master = angular.copy(user);
  };
 
  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
  };
 
  $scope.isUnchanged = function(user) {
    return angular.equals(user, $scope.master);
  };
 
  $scope.reset();
}
```

### 三、自定义验证

1. Angular提供了一些常用的html5输入控件的验证实现：(text, number, url, email, radio, checkbox), 以及一些用于验证的指令 (required, pattern, minlength, maxlength, min, max).

2. 验证触发时机：

+ 数据到视图的更新 

+ 视图到数据的更新

3. 例子(好像有点问题，运行不了)

```html

<!-- 
    第一个指令是 'integer' 整形数字，它验证了输入是否是一个合法的整形数字
    第二个指令是 'smart-float' 智能浮点数。 
 -->
<!doctype html>
<html ng-app="form-example1">
  <head>
    <script src="http://code.angularjs.org/1.2.25/angular.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div ng-controller="Controller">
      <form name="form" class="css-form" novalidate>
        <div>
          大小 (整数 0 - 10):
          <input type="number" ng-model="size" name="size"
                 min="0" max="10" integer /><br />
          <span ng-show="form.size.$error.integer">这是无效的数字!</span>
          <span ng-show="form.size.$error.min || form.size.$error.max">
            值必需在0到10之间!</span>
        </div>
    
        <div>
          长度 (浮点):
          <input type="text" ng-model="length" name="length" smart-float />
          <br />
          <span ng-show="form.length.$error.float">
            这是无效的浮点数!</span>
        </div>
      </form>
    </div>
  </body>
</html>
```
```js
var app = angular.module('form-example1', []);
 
var INTEGER_REGEXP = /^\-?\d+$/;
app.directive('integer', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (INTEGER_REGEXP.test(viewValue)) {
          // 验证通过
          ctrl.$setValidity('integer', true);
          return viewValue;
        } else {
          // 验证不通过 返回 undefined (不会有模型更新)
          ctrl.$setValidity('integer', false);
          return undefined;
        }
      });
    }
  };
});
 
var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
app.directive('smartFloat', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (FLOAT_REGEXP.test(viewValue)) {
          ctrl.$setValidity('float', true);
          return parseFloat(viewValue.replace(',', '.'));
        } else {
          ctrl.$setValidity('float', false);
          return undefined;
        }
      });
    }
  };
});
```

## 四、实现自定义form控件(使用 'ngModel')

1. 为了能让自定义控件能够与'ngModel'正常工作，达到双向绑定的效果，它需要：

+ 实现 '$render' 方法，它负责在数据传递给方法NgModelController#$formatters之后渲染数据。

+ 调用 '$setViewValue' 方法，在任何用户与控件交互后，模型需要更新的时候调用。这通常在一个DOM事件监听器里完成。

2. 例子

```html
<!-- 为一个可编辑元素添加双向绑定。 -->
<!doctype html>
<html ng-app="form-example2">
  <head>
    <script src="http://code.angularjs.org/1.2.25/angular.min.js"></script>
    <script src="script.js"></script>
  </head>
  <body>
    <div contentEditable="true" ng-model="content" title="Click to edit">Some</div>
    <pre>model = </pre>
    
    <style type="text/css">
      div[contentEditable] {
        cursor: pointer;
        background-color: #D0D0D0;
      }
    </style>
  </body>
</html>
```
```js
angular.module('form-example2', []).directive('contenteditable', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // 视图 -> 模型
      elm.on('blur', function() {
        scope.$apply(function() {
          ctrl.$setViewValue(elm.html());
        });
      });
 
      // 模型 -> 视图
      ctrl.$render = function() {
        elm.html(ctrl.$viewValue);
      };
 
      // 从DOM中初始化数据
      ctrl.$setViewValue(elm.html());
    }
  };
});
```









