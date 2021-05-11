const xlsx = require('xlsx')

// 获取全新 wbObject
function getPureWbObject() {
    return {
        compareIndexMap: {},
        // 自带 bind 方法
        bind: function (dict, bc, rowId, pRowId) {
            // 检查属性
            if (dict && this[dict] && Array.isArray(this[dict][bc]) && Array.isArray(this[dict]['model'])) {
                // 大列 中的行
                const bcRow = this[dict][bc].find(bcr => bcr['rowId'] == rowId);
                // model 中的行
                const mRow = this[dict]['model'].find(mr => mr['rowId'] == pRowId);
                if (bcRow && mRow) {
                    // 设置 大列 中列
                    bcRow['pRowId'] = pRowId;
                    // 设置 model 中列
                    if (!mRow['matches'][bc]) mRow['matches'][bc] = [];
                    if (!mRow['matches'][bc].find(bcr => bcr['rowId'] == rowId)) {
                        mRow['matches'][bc].push({
                            similar: this.getSimilar(mRow['cols'][this['compareIndexMap'][dict]['model']], bcRow['cols'][this['compareIndexMap'][dict][bc]]),
                            bcName: bc,
                            rowId: rowId
                        })
                    }
                    return true;
                }
            }
            return false;
        },
        // 获取 相似度
        getSimilar: (template, val) => {
            if (template == null || val == null) return 0;
            template += ""
            val += ""

            let hit = 0;
            for (let i = 0; i < val.length; i++) {
                let char = val.charAt(i);
                let tIndex = template.indexOf(char);
                if (tIndex != -1) {
                    hit++;
                    if (tIndex != template.length - 1) {
                        template =
                            template.substring(0, tIndex) +
                            template.substring(tIndex + 1, template.length);
                    } else {
                        template = template.substring(0, tIndex);
                    }
                }
            }
            return hit / val.length;
        },
        // 获取 dictNames 列表
        getDictNames() {
            let dictNames = []
            for (let dict in this) {
                if (typeof dict != Function && dict != 'compareIndexMap') {
                    dictNames.push(dict);
                }
            }
            return dictNames;
        }
    }
}

/*
分割 Excel 定位标识。
比方：A1 则返回 {'row': 'A', 'col': 1}
*/
function splitCell(cell) {
    const cellPattern = /^(?<col>[A-Z]+)(?<row>\d+)$/
    return cell.match(cellPattern) ? {
        'row': cellPattern.exec(cell).groups['row'],
        'col': cellPattern.exec(cell).groups['col']
    } : {}
}

// 判断传入的数组是否全为空
function pureEmpty(col) {
    return col.find(c => c != undefined) == null || col.find(c => c != undefined) == undefined
}

// 从 表格 中读取 wbObj 对象
function readWbObjFrom(filename) {
    // workbook 对象
    let wb = xlsx.readFile(filename);

    // 用于前台操作的对象
    let wbObj = getPureWbObject();
    // sheet 遍历
    for (let dict of wb.SheetNames) {
        let dictObj = {}
        wbObj.compareIndexMap[dict] = {}


        // 获取每页 Sheet 对象
        let wbDictObj = wb.SheetNames[dict];
        // 范围（sheet的有值范围）
        let ref = wbDictObj['!ref'];
        // 融合
        let merges = wbDictObj['!merges'];
        // 获取 sheet 右下角坐标
        let cr = splitCell(ref.split(":")[1]);
        // 将分割下标的 ascii值 存入数组，方便进行大列划分
        let headColCodes = [cr['col'].charCodeAt() + 1];
        for (let cellPosi in wbDictObj) {
            let cp = splitCell(cellPosi);
            // 取出第一行
            if (cp['row'] == 1) {
                headColCodes.push(cp['col'].charCodeAt())
            }
        }
        headColCodes.sort();

        // 大列名称列表
        // let bigColNames = [];
        for (let i = 0; i < headColCodes.length - 1; i++) {
            // 获取 sheet 特定位置的数值
            let bigColName = i == 0 ? 'model' : wbDictObj[`${String.fromCharCode(headColCodes[i])}1`]['v'];
            // bigColNames.push(bigColName);

            // 设置各大列对比下标，默认为0
            wbObj.compareIndexMap[dict][bigColName] = 0;

            // 开始各大列插入值
            dictObj[bigColName] = [];
            // 逐行遍历
            for (let r = 2; r < cr['row']; r++) {
                let rowObj = {
                    rowId: r,
                    cols: [],
                    matches: [],
                    pRowId: ''
                }
                // 遍历填值
                for (let colIndex = headColCodes[i]; colIndex < headColCodes[i + 1]; colIndex++) {
                    rowObj.cols.push(wbDictObj[`${String.fromCharCode(colIndex)}${r}`]);
                }
                // 非空过滤
                if (!pureEmpty(rowObj.cols)) {
                    dictObj[bigColName].push(rowObj);
                    if (i != 0) {
                        // 普通绑定
                        wbObj.bind(dict, bigColName, rowId, rowId);
                        // 融合绑定
                        merges.forEach(merge => {
                            if (merge['s']['c'] == 0 && merge['e']['c'] == 0) {
                                let startRowIndex = merge['s']['r'] + 1;
                                let endRowIndex = merge['e']['r'] + 1;
                                for (let rIndex = startRowIndex + 1; rIndex <= endRowIndex; rIndex++) {
                                    wbObj.bind(dict, bigColName, rIndex, startRowIndex);
                                }
                            }
                        })
                    }
                }
            }
        }
        wbObj[dict] = dictObj;
    }
    return wbObj;
}

console.log(JSON.stringify(readWbObjFrom('/Users/cspy/Tmp/0511.xlsx')))