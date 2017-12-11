// var s = "hello world";
// console.log(s.charAt(0)); //h 第一个字符
// console.log(s.charAt(s.length - 1)); //d 最后一个字符
// console.log(s.substring(1,4)); //ell 第2-4个字符
// console.log(s.slice(1,4));//ell 第2-4个字符
// console.log(s.slice(-3));//rld 最后三个字符
// console.log(s.indexOf("l"));//2 
// console.log(s.lastIndexOf("l"));//9
// console.log(s.indexOf('l',3));//3 在位置3以及之后首次出现字符l的位置
// console.log(s.split(", ")); //[ 'hello world' ]
// console.log(s.toUpperCase());//HELLO WORLD
var myStr = "I,love,you,Do,you,love,me";
var replacedStr = myStr.replace("love","hate");
console.log(replacedStr)