'use strict';

const fs = require('fs');

let names = ['Tia, Flowey, Maggie'];

let longString = [`'use strict';\n\nlet names=['Flowy', 'Tia', 'Sparky'];\n\nlet stringifyBuffer = () =>{\n  let str = '';\n  for( let char of buffer){\n    str += String.fromCharCode(char);\n  }\n  return str;\n};\n`];

let data = Buffer.from('');

let fileCreator = (source) => {
  fs.writeFile('./files/loop.js', source, 'utf8', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    names.forEach(element => {
      console.log(element.split(','));
    });
  });
};

let fileCreation = (array) => {
  array.forEach(element => {
    data = Buffer.concat([data, Buffer.from(element)]);
  });
  fileCreator(data);
};

fileCreation(longString);

let stringifyBuffer = (data) => {
  let str = '';
  for(let character of data){
    str += String.fromCharCode(character);
  }
  return str;
};

let fileReader = () => {
  fs.readFile('./files/pair-programming.txt',(err, data) => {
    if (err) throw err;
    console.log(data);
    console.log(stringifyBuffer(data));
  });
};

fileReader();
