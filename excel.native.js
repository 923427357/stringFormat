const xlsx = require('node-xlsx');
const fs = require('fs');

// let workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/entry/excel/index.xlsx`));
let workSheetsFromFile = xlsx.parse(`${__dirname}/entry/excel/native.xlsx`);

function toWriteNativeTxt(data = []) {  //excel转 txt_native格式
    console.log('starting...')
    let langData = {};
    let contentArray = data[0] && data[0].data;
    let langs = contentArray[0];
    let values = contentArray.filter((_, index) => index != 0);
    values.map((item, index) => {
        item.map((val, index) => {
            let key = item[0];
            let lang = langs[index];
            if (index !== 0) {
                langData[key] = langData[key] || {};
                langData[key][lang] = val;
            }
        })
    })
    let outputArr = [];
    for (let key in langData) {
        if(langData.hasOwnProperty(key)) {
            let currentConent = langData[key];
            outputArr.push(`[${key}]`);
            let langStr = Object.entries(currentConent).map(arr => arr.join(' = ')).join('\n\t');
            outputArr.push(`\t${langStr}\n`);
        }
    }

    let fileName = 'output/txt/native.txt';
    fs.writeFile(fileName, `${outputArr.join('\n')}`, (err) => {
        err ? console.log('\x1B[31m%s\x1B[39m', '[ Error ]', 'Write Errors!--------' + err) : console.log('\x1B[32m%s\x1B[39m', '[ Success ]', 'write successfully!');
    }) 
}

function strTrim(str) {
    return str && str.trim() || 'err';
}
toWriteNativeTxt(workSheetsFromFile);