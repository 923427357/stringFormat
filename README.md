# stringFormat
txt和xlsx文件互转

运行说明：

安装依赖包

    $ npm install

运行工具
    
    excel转txt(客户端格式)
    $ build:native:excel
    
    excel转txt(H5格式)
    $ build:web:excel

    txt(客户端格式)转excle
    $ build:native:txt

    txt(H5格式)转excle
    $ build:web:txt

目录说明：
entry: 文件入口

    excel: native.xlsx / web.xlsx
    txt:  native.txt / web.txt

output: 文件输出
        