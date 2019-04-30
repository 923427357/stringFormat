const xlsx = require('node-xlsx');
const fs = require('fs');

function toWriteExcelOfNative () {  //txt(native) to excel
    console.log('starting...')
    let jsonData = {};
    // let fileFormat = false || 'txt';
    fs.readFile('./entry/txt/native.txt', 'utf8', (err, data) => {  //TODO: 检测文本格式，并转为utf-8
        let arr = data.split('\n');
        arr = arr.filter(str => str.trim());
        let lang;
        let key = '';
        let arrList = arr.map(str => {
            if (!str.includes('=')) {
                str = str.replace(/\s/g, ''); //去除所有空格
                key = str.split('[')[1].split(']')[0]
                jsonData[key] = {};
            } else {
                let strArr = str.split('=');
                let lang = strTrim(strArr[0]);
                let text = strTrim(strArr[1]);
                if (lang == 'es-ES') return; //过滤lang
                jsonData[key][lang] = text;
            }
        })
        let outputArr = [];
        let transferData = {}
        let langsArr;
        outputArr = Object.keys(jsonData).map(key => {
            let arr = [];
            arr.push(key)
            let obj = jsonData[key];
            for(let lang in obj) {
                if (!langsArr) langsArr = Object.keys(obj)
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
            

/*         try {
            fs.unlink('output/excel/native.xlsx');//删除文件
        } catch(e) {
            //
        } */
        var buffer = xlsx.build(data1);
        fs.writeFile('output/excel/native.xlsx', buffer, function(err) {
            err ? console.log('\x1B[31m%s\x1B[39m', '[ Error ]', 'Write Errors!') : console.log('\x1B[32m%s\x1B[39m', '[ Success ]', 'write successfully!');
        })
    })
}

function strTrim(str) {
    return str && str.trim() || 'err';
}

toWriteExcelOfNative();
