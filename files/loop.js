'use strict';

let names=['Flowy', 'Tia', 'Sparky'];

let stringifyBuffer = () =>{
  let str = '';
  let buffer = 'me';
  for( let char of buffer){
    str += String.fromCharCode(char);
  }
  return str;
};
