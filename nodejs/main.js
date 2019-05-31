
// require("fs").writeFile("test.txt", "Hello world", (err) => {
// 	if(err) console.log(err)
// 	else console.log("Write file success!");
// });

// funcName();

// function funcName() {
// }

// const funcName = function () {
// 	console.log("Hello");
// }

// const funcName = () => {

// }
// const fs = require("fs");

// const data = fs.readFile("test.txt", { encoding: 'utf-8' }, (err, data) => {
// 	if(err) console.log(err)
// 	else return data;
// 	// else console.log(data+"");
// });
// console.log(data);

// const data = fs.readFileSync("test.txt", { encoding: 'utf-8' });
// console.log(data);

// const obj = {
// 	name: 'Huy',
// 	age: 18
// };

// const jsonObj = JSON.stringify(obj);

// fs.writeFileSync('test.txt', jsonObj);

// const data = fs.readFileSync('test.txt', { encoding: 'utf-8' });
// try {
// 	const objData = JSON.parse(data);
// 	console.log(objData);
// 	console.log(objData.name);
// } catch (error) {
// 	console.log(error);
// }

// console.log("Hello");

const fileController = require("./fileController");

const fileData = fileController.readFile('./test.txt');
console.log(fileData);