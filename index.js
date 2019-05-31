'use strict';

const fs = require('fs');
// const reader = require('linebyline');
const reader = require('readline');

//--------*
//
// Part 1
//
//---------*

let names = ['Tia, Flowey, Maggie'];

let longString = [`'use strict';\n\nlet names=['Flowy', 'Tia', 'Sparky'];\n\nlet stringifyBuffer = () =>{\n  let str = '';\n  let buffer = 'me';\n  for( let char of buffer){\n    str += String.fromCharCode(char);\n  }\n  return str;\n};\n`];

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


//--------*
//
// Part 2
//
//---------*

// let tags = {};
// let answerArray = [];

class Converter {
  constructor(){
    this.buffer = Buffer.from('');
    this.tags = {};
  }

  createTag(tag, buffer){
    if(! this.tags[tag]){
      this.tags[tag] = {
        open: Buffer.from(`<${tag}>`),
        close: Buffer.from(`</${tag}>`),
      };
    }
    this.buffer = Buffer.concat([this.buffer, this.tags[tag].open, this.buffer, this.tags[tag].close]);
  }

  convert(file) {
    let lineReader = reader.createInterface({
      input: fs.createReadStream(file),
    });

    lineReader.on('line', function (line) {
      if(line.match(/^[0-9]\./)) {
        this.createTag('h3', Buffer.from(line));
      }
      else if(line.match(/\./)){
        line.split('.').forEach( sentence => {
          sentence && this.createTag('li', Buffer.from(sentence));
        });
      } 
      else if(line) {
        this.createTag('h2', Buffer.from(line));
      }
    }.bind(this));

    lineReader.on('close', () => {
      fs.writeFile('./files/index.html', this.buffer, (err, data) => {
        console.log('Start live-server, file is there!');
      });
    });
  }
}
let htmlTags = new Converter();
htmlTags.convert('./files/pair-programming.txt');

// module.exports = fileCreation, fileWriter;

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
