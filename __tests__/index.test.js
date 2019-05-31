'use strict';

jest.mock('fs');

const fileReader = require('../index.js');

describe('File Reader Module', () => {
  it('returns an error when given a bad file', done => {
    let file = 'bad.txt';
    fileReader.fileFunction(file, (error, data) => {
      expect(error).toBeDefined();
      done();
    });
  });

  it('reads an array when given a good file', done => {
    let files = ['File Contents', 'File Contents2', 'File Contents3'];
    fileReader.fileFunction(files, (err, data) => {
      expect(err).toBeNull();
      expect(data.length).toBe(3);
      expect(data instanceof Array).toBeTruthy();
    });
  });
});


describe('File create html module', () => {
  it('returns an error when given a bad file', done => {
    let file = 'bad.txt';
    fileReader.fileWriter(file, (err, data) => {
      expect(err).toBeDefined();
      done();
    });
  });

  it('reads an array when given a good file', done => {
    let files = ['File Contents', 'File Contents2', 'File Contents3'];
    fileReader.fileWriter(files, (err, data) => {
      expect(err).toBeNull();
      expect(data.length).toBe(3);
      expect(data instanceof Array).toBeTruthy();
      done();
    });
  });
});

