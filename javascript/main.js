// console.log("Hello world!");

// const a = 10;

// console.log(a);

// // a = "Hello";

// let b = 10;
// var c = 15;

// console.log(b);

// b = true;

// console.log(b);

// const obj = {
// 	b: 100,
// 	c: "Hello"
// };

// console.log(obj.b);
// console.log(obj["b"]);

// obj.d = true;
// obj["e"] = 1000;
// obj.b = {
// 	a: 1000
// };
// delete obj.c;

// console.log(obj);

// const arr = [ 213, 'Hello', 2139, true ];

// arr.push("100");

// console.log(arr.length);

// // arr[0]

// const number = 100.2891379812;
// console.log(number.toFixed(2));
// const char = "HoisadjiahuHIHIUiudksahIHIU";
// char.toLowerCase();
// char.toUpperCase();
// console.log(char.length);
// // Number(number).toFixed(2);

// const now = new Date();
// // "let's"
// console.log(now);
// console.log(now.getDate());
// console.log(now.getHours());

// console.log(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/.test("abcde6@xyz.com"));

// // const err = new Error("Đây là lỗi");

// // throw err;

// Function scope

// var a = 100;

// function aFunc() {
// 	var b = 50;

// 	function bFunc() {
// 		var c = 15;
		
// 		console.log(a); // 100
// 		console.log(b); // 50
// 		console.log(c); // 15
// 	}

// 	bFunc();

// 	console.log(a); // 100
// 	console.log(b); // 50
// 	console.log(c); // err

// 	// return true;
// }

// const result = aFunc();

// // console.log(result);

// console.log(a); // 100
// console.log(b); // lỗi

// setTimeout(function() {
// 	console.log("1s");
// }, 1000);

// setInterval(function() {
// 	console.log("1s");
// }, 1000);

// function print(num, time) {
// 	setTimeout(function() {
// 		console.log(num);
// 	}, 1000*time);
// }

// function countDown(count) {
// 	for(var i = count; i >= 0; i--) {
// 		print(i, count-i)
// 	}
// }

// countDown(5);

// Block scope {}

// let a = 10;

// if(true) {
// 	let b = 15;
// }

// console.log(a); // 10
// console.log(b); // 15

// console.log("begin");

// setTimeout(function() {
// 	console.log("1s");
// }, 0);

// console.log("end");

// function print(message) {
// 	console.log(message);
// }

// print("Hello");

// const printClone = print;

// printClone("World");

// function print(message, time, cb) {
// 	setTimeout(function() {
// 		console.log(message);
// 		if(cb) cb();
// 	}, time);
// }

// print("Đánh răng", 2000);
// print("Rửa mặt", 1500);

// print("Đánh răng", 2000, function() {
// 	print("Rửa mặt", 1500);
// });

const elem = document.createElement('p');
elem.innerText = "Hello world";
console.log(elem);

const bodyElem = document.querySelector('body');

bodyElem.appendChild(elem);