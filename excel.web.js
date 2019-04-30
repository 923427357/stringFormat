const xlsx = require('node-xlsx');
const fs = require('fs');

// let workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/entry/excel/index.xlsx`));
let workSheetsFromFile = xlsx.parse(`${__dirname}/entry/excel/web.xlsx`);

function toWriteWebTxt(data = []) {  //excel转 txt_web格式
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
                langData[lang] = langData[lang] || {};
                langData[lang][key] = val;
            }
        })
    })

    let outputArr = [];
    for (let lang in langData) {
        if(langData.hasOwnProperty(lang)) {
            let currentConent = langData[lang];
            let index = 0; //调整Array.join(', ') 输出格式
            for (let key in currentConent) {
                let value =  currentConent[key];  
                if (index === 0) key = `\n[${lang}]\n${key}`;
                index ++;
                if (false)  value = value && value.replace(/'/g, "\\'"); //notes: 优化英文标点。 I'm -> I\'m
                outputArr.push(`${key}: '${value}'`)
            }
        }
    }
    let fileName = 'output/txt/web.txt';
    fs.writeFile(fileName, `${outputArr.join(',\n')},\n`, (err) => {
        err ? console.log('\x1B[31m%s\x1B[39m', '[ Error ]', 'Write Errors!') : console.log('\x1B[32m%s\x1B[39m', '[ Success ]', 'write successfully!');
    })
}

function strTrim(str) {
    return str && str.trim() || 'err';
}

toWriteWebTxt(workSheetsFromFile);