const xlsx = require('node-xlsx');
const fs = require('fs');

function toWriteExcelofWeb () {  //txt(web) to excel
    console.log('starting...')
    let jsonData = {};
    let defaultFormatLangs = {'[zh-cn]': 'zh-cn','[en]': 'en', '[de]': 'de', '[es]': 'es', '[fr]': 'fr', '[it]': 'it', '[ja]': 'ja', '[ko]': 'ko', '[pt]': 'pt', '[ru]': 'ru', '[tr]': 'tr', '[vi]': 'vi', '[tw]': 'tw'};
    // let fileFormat = false || 'txt';
    fs.readFile('./entry/txt/web.txt', 'utf8', (err, data) => {  //TODO: 检测文本格式，并转为utf-8
        let arr = data.split('\n');
        arr = arr.filter(str => str.trim());
        let lang;
        let arrList = arr.map(str => {
            if (defaultFormatLangs[str]) {
                lang = defaultFormatLangs[str];
                jsonData[lang] = {};
            } else {
                let strArr = str.split(':');
                let key = strTrim(strArr[0]);
                let text = strTrim(strArr[1]).split('\',')[0].split('\'')[1];
                jsonData[lang][key] = text;
            }
        })
        let outputArr = [];
        let transferData = {}
        let langsArr =  Object.keys(jsonData);
        langsArr.map(lang => {
            let currentConent = jsonData[lang];
            for(let key in currentConent) {
                transferData[key] = transferData[key] || {};
                transferData[key][lang] = currentConent[key];
            }
        })
        outputArr = Object.keys(transferData).map(key => {
            let arr = [];
            arr.push(key)
            let obj = transferData[key];
            for(let lang in obj) {
                arr.push(obj[lang])
            }
            return arr;
        })
        langsArr.unshift('key');
        outputArr.unshift(langsArr);
        var data1 = [
            {
                name : 'sheet1',
                data : outputArr
            }
        ];
        // 写xlsx
        var buffer = xlsx.build(data1);
        fs.writeFile('output/excel/web.xlsx', buffer, function(err) {
            err ? console.log('\x1B[31m%s\x1B[39m', '[ Error ]', 'Write Errors!') : console.log('\x1B[32m%s\x1B[39m', '[ Success ]', 'write successfully!');
        })
    })
}

function strTrim(str) {
    return str && str.trim() || 'err';
}

toWriteExcelofWeb();
