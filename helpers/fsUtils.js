const { json } = require('express');
const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = (content, file) => {
    const content1 = fs.readFileSync(file, 'utf-8')
    const currentContent = JSON.parse(content1);
        for (let i = 0; i < currentContent.length; i++) {
          if (currentContent[i].notes_id === content) {
            const removed = currentContent.splice(i, 1);
            const updateFile = JSON.stringify(currentContent)
            fs.writeFileSync(file, updateFile, 'utf-8')
            }
          }
};

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
