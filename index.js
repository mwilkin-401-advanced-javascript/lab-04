'use strict';

const fs = require('fs');
// const reader = require('linebyline');
const readline = require('readline');

let names = ['Tia, Flowey, Maggie'];

let longString = [`'use strict';\n\nlet names=['Flowy', 'Tia', 'Sparky'];\n\nlet stringifyBuffer = () =>{\n  let str = '';\n  for( let char of buffer){\n    str += String.fromCharCode(char);\n  }\n  return str;\n};\n`];

let fileCreator = (source) => {
  fs.writeFile('./files/loop.js', source, 'utf8', (err) => {
    if (err) throw err;
    // console.log('The file has been saved!');
    // names.forEach(element => {
    //   console.log(element.split(','));
  });
};

let data = Buffer.from('');

let fileCreation = (array) => {
  array.forEach(element => {
    data = Buffer.concat([data, Buffer.from(element)]);
  });
  fileCreator(data);
};

fileCreation(longString);

// let stringifyBuffer = (data) => {
//   let str = '';
//   for(let character of data){
//     str += String.fromCharCode(character);
//   }
//   return str;
// };

// let fileReader = () => {
//   fs.readFile('./files/pair-programming.txt',(err, data) => {
//     if (err) throw err;
//     let stringData = stringifyBuffer(data).split('.');
//     console.log(stringifyBuffer(data));
//     console.log(stringData);
//   });
// };

// fileReader();

let tags = {};
let answerArray = [];

let createTag = (tag, buffer) => {
  if(!tags[tag]){
    tags[tag] ={
      open: Buffer.from(`<${tag}>`),
      close: Buffer.from(`<${tag}>`),
    };
  }
  buffer = Buffer.concat([tags[tag].open, buffer, tags[tag].close]);
  answerArray.push(buffer);
};

let fileWriter = (file) => {
  let lineReader = readline.createInterface({
    input: fs.createReadStream(file),
  });

  lineReader.on('line', function (line) {
    if(line.match(/^[0-9]\./)) {
      createTag('h3', Buffer.from(line));
    }
    else if(line.match(/\./)){
      line.split('.').forEach( sentence => {
        sentence && createTag('li', Buffer.from(sentence));
      });
    } 
    else if(line) {
      createTag('h2', Buffer.from(line));
    }
  });

  lineReader.on('close', () => {
    fs.writeFile('./files/index.html', answerArray.join(' '), (err, data) => {
      console.log('start live-server, file is there!');
    });
  });
};

fileWriter('./files/pair-programming.txt');

module.exports = fileCreation, fileWriter;




// Demo code from class
// class Converter {
//   constructor(){
//     this.buffer = Buffer.from('');
//     this.tags = {};
//   }
//   createTag(tag, buffer){
//     if(!this.tags[tag]){
//       this.tags[tag] = {
//         open: Buffer.from(`<${tag}>`),
//         close: Buffer.from(`</${tag}>`),
//       };
//     }
//     this.buffer = Buffer.concat([this.buffer, this.tags[tag].open, buffer, this.tags[tag].close]);
//   }

//   convert(file) {
//     var lineReader = reader.createInterface({
//       input: fs.createReadStream(file),
//     });

//     lineReader.on('line', function (line) {
//       if(line.match(/^[0-9]\./)) {
//         this.createTag('h3', Buffer.from(line));
//       }
//       else if (line.match(/\./)){
//         line.split('.').forEach( sentence => {
//           sentence && this.createTag('li', Buffer.from(sentence));
//         });
//       }
//       else if(line){
//         this.createTag('h2', Buffer.from(line));
//       }
//     }.bind(this));

//     lineReader.on('close', () => {
//       fs.writeFile('./files/index.html', this.buffer, (err, data) => {
//         console.log('start live-server, file is there!');
//       });
//     });
//   }
// }

// let html = new Converter();
// html.convert('./files/pair-programming.txt');


// class Converter {
//   constructor(){

//   }
// }

