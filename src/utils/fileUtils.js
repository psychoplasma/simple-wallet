const fs = window.require('fs');
import csv from 'csvtojson';
import { isValidAddress } from './web3-utils';


export function readUTF8File(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf-8', (e, content) => {
      if (e) {
        reject(e);
      } else {
        resolve(content);
      }
    });
  });
}

export async function csvFileToJson(filename) {
  let content = await readUTF8File(filename);
  let jsonArray = await csv({ignoreEmpty: true}).fromString(content);
  return jsonArray;
}
