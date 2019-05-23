'use strict';
const fs = require('fs');

// let buffer = Buffer.from('Wow, this topic is really cool!');
// console.log(buffer);
// console.log(buffer.toString());

// let stringifyBuffer = () =>{
//   let str = '';
//   for( let char of buffer){
//   str += String.fromCharCode(char);  
//   }
// return str;
// };



fs.writeFile('./files/loop.js', 'Hello Node.js', 'utf8', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});


