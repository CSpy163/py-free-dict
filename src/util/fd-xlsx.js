const xlsx = require('xlsx');

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
    let wbObj = {};
    // sheet 遍历
    for (let dict of wb.SheetNames) {
        // if (dict != '性别' && dict != '办证类型编码') continue;
        let dictObj = {}
        wbObj[dict] = dictObj;
        // wbObj.compareIndexMap[dict] = {}

        // 获取每页 Sheet 对象
        let wbDictObj = wb.Sheets[dict];
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

        // 大列遍历
        for (let i = 0; i < headColCodes.length - 1; i++) {
            // 获取 sheet 特定位置的数值
            let bigColName = i == 0 ? 'model' : wbDictObj[`${String.fromCharCode(headColCodes[i])}1`]['v'];
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
                    rowObj.cols.push(wbDictObj[`${String.fromCharCode(colIndex)}${r}`] ? wbDictObj[`${String.fromCharCode(colIndex)}${r}`]['v'] : undefined);
                }
                // 非空过滤
                if (!pureEmpty(rowObj.cols)) {
                    dictObj[bigColName].push(rowObj);
                    if (i != 0) {
                        // 普通绑定
                        bindInWbObj(wbObj, dict, bigColName, r, r);
                    }
                }
            }
            // 融合绑定
            if (i != 0) {
                merges.forEach(merge => {
                    if (merge['s']['c'] == 0 && merge['e']['c'] == 0) {
                        let startRowIndex = merge['s']['r'] + 1;
                        let endRowIndex = merge['e']['r'] + 1;
                        for (let rIndex = startRowIndex + 1; rIndex <= endRowIndex; rIndex++) {
                            bindInWbObj(wbObj, dict, bigColName, rIndex, startRowIndex);
                        }
                    }
                });
            }
        }
    }
    return wbObj;
}

// 将 wbObj 写入 Excel
function writeWbObjTo(wbObj, filename) {

    // 数组下标转 列名
    function getColName(index, startChar = "A") {
        return String.fromCharCode(startChar.charCodeAt() + index);
    }

    // 将列名专成下标（0开头）
    function decodeColName(colName, startChar = "A") {
        return colName.charCodeAt() - startChar.charCodeAt()
    }

    // 中间空行高度
    let offset = 1;
    let sheets = {}
    for (let dictName of getDictNames(wbObj)) {
        let dictObj = wbObj[dictName];
        let sheet = {}
        let merges = []
        sheet['!merges'] = merges
        sheets[dictName] = sheet;


        // 总列宽
        let totalColWidth = dictObj['model'] && dictObj['model'].length != 0 ? dictObj['model'][0]['cols'].length : 1;
        // 各大列的起始列
        let startColIndexMap = {
            'model': getColName(0)
        }

        // Step1: 设置标题
        sheet[`${startColIndexMap['model']}1`] = { v: "标准字典" };
        if (totalColWidth !== 1) {
            merges.push({
                s: { c: 0, r: 0 },
                e: { c: totalColWidth - 1, r: 0 }
            })
        }

        for (let bcName in dictObj) {
            if (bcName !== 'model') {
                startColIndexMap[bcName] = getColName(totalColWidth);
                sheet[`${startColIndexMap[bcName]}1`] = { v: bcName }
                let s = { c: totalColWidth, r: 0 }
                if (dictObj[bcName] && dictObj[bcName].length != 0) {
                    let colWidth = dictObj[bcName][0]['cols'].length;
                    totalColWidth += colWidth
                    if (colWidth != 1) {
                        let e = { c: totalColWidth - 1, r: 0 }
                        merges.push({ s, e })
                    }
                } else {
                    totalColWidth += 1
                }
            }
        }

        // Step2: 循环匹配塞值
        let startRowIndex = 2;
        if (dictObj['model'].forEach(mRow => {
            let maxHeight = 1;

            // 各大列最大高度 Map
            let maxHeighMap = {}
            // 塞各大列值
            mRow.matches.forEach(bcRowSummary => {
                let bcName = bcRowSummary['bcName'];
                if (!maxHeighMap[bcName]) {
                    maxHeighMap[bcName] = 1;
                } else {
                    maxHeighMap[bcName] += 1;
                }

                let bcRowIndex = dictObj[bcName].findIndex(row => row['rowId'] === bcRowSummary['rowId'])
                if (bcRowIndex !== -1) {
                    let bcRow = dictObj[bcName][bcRowIndex];

                    for (let i = 0; i < bcRow['cols'].length; i++) {
                        sheet[`${getColName(i, startColIndexMap[bcName])}${startRowIndex - 1 + maxHeighMap[bcName]}`] = { v: bcRow['cols'][i] };
                    }
                    // 弹出元素
                    dictObj[bcName].splice(bcRowIndex, 1);
                }

            });
            for (let mh in maxHeighMap) {
                if (maxHeighMap[mh] > maxHeight) {
                    maxHeight = maxHeighMap[mh];
                }
            }
            let mergeStartRowIndex = startRowIndex;
            let mergeEndRowIndex = startRowIndex + maxHeight - 1;
            // if (maxHeight !== 1) {
            // 塞 model，塞 merge
            for (let i = 0; i < mRow['cols'].length; i++) {
                sheet[`${getColName(i, startColIndexMap['model'])}${startRowIndex}`] = { v: mRow['cols'][i] };
                if (maxHeight != 1) {
                    merges.push({
                        s: { c: decodeColName(startColIndexMap['model']) + i, r: mergeStartRowIndex - 1 },
                        e: { c: decodeColName(startColIndexMap['model']) + i, r: mergeEndRowIndex - 1 }
                    })
                }

            }
            // }
            startRowIndex += maxHeight;

        }));

        // Step3: 补充剩余
        startRowIndex += offset;
        let mismatchHeight = 0;
        for (let bcName in dictObj) {
            if (bcName !== 'model') {
                let height = dictObj[bcName].length;
                if (height !== 0) {
                    if (mismatchHeight < height) {
                        mismatchHeight = height;
                    }
                }
                for (let i = 0; i < height; i++) {
                    let bcRow = dictObj[bcName][i];
                    for (let j = 0; j < bcRow['cols'].length; j++) {
                        sheet[`${getColName(j, startColIndexMap[bcName])}${startRowIndex + i}`] = { v: bcRow['cols'][j] };
                    }
                }

            }
        }
        startRowIndex += mismatchHeight;
        sheet['!ref'] = `A1:${getColName(totalColWidth - 1)}${startRowIndex}`
        sheets[dictName] = sheet
    }
    let wb = { SheetNames: getDictNames(wbObj), Sheets: sheets }
    xlsx.writeFile(wb, filename)
}

function bindInWbObj(wbObj, dict, bc, rowId, pRowId) {
    // 检查属性
    if (dict && wbObj[dict] && Array.isArray(wbObj[dict][bc]) && Array.isArray(wbObj[dict]['model'])) {
        // 大列 中的行
        const bcRow = wbObj[dict][bc].find(bcr => bcr['rowId'] == rowId);

        // model 中的行
        const mRow = wbObj[dict]['model'].find(mr => mr['rowId'] == pRowId);
        if (bcRow) {
            // 如果有则绑定，没有则取消绑定
            if (mRow) {
                // 设置 大列 中列
                bcRow['pRowId'] = pRowId;
                // 设置 model 中列
                if (!mRow['matches'].find(bcr => bcr['rowId'] === rowId && bcr['bcName'] === bc)) {
                    let mObj = {
                        bcName: bc,
                        rowId: rowId
                    }
                    mRow['matches'].push(mObj)
                }
                return true;
            } else {
                // 取消绑定
                bcRow['pRowId'] = "";
                wbObj[dict]['model'].forEach(mRow => {
                    let index = mRow['matches'].findIndex(mr => mr['bcName'] == bc && mr['rowId'] == rowId)
                    if (index != -1) {
                        mRow['matches'].splice(index, 1);
                    }
                })
                return true;
            }

        }
    }
    return false;
}

// 获取字典名称
function getDictNames(wbObj) {
    let dictNames = []
    for (let dict in wbObj) {
        if (dict != 'compareIndexMap') {
            dictNames.push(dict);
        }
    }
    return dictNames;
}

module.exports.readWbObjFrom = readWbObjFrom;
module.exports.writeWbObjTo = writeWbObjTo;
module.exports.bindInWbObj = bindInWbObj;
module.exports.getDictNames = getDictNames;
