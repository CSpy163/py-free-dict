import fs from 'fs'
import xlsx from 'xlsx'

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

    for (let dict of wb.SheetNames) {
        let dictObj = {}

        // 获取每页 Sheet 对象
        let wbDictObj = wb.SheetNames[dict];
        // 获取 sheet 有值范围
        let ref = wbDictObj['!ref'];
        // 获取 sheet 右下角坐标
        let cr = splitCell(ref.split(":")[1]);
        // 列数
        let endCol = cr['col'];
        // 行数
        let rows = cr['row'];
        // 将分割下标的 ascii值 存入数组，方便进行大列划分
        let headColCodes = [endCol.charCodeAt() + 1];
        for (let cellPosi in wbDictObj) {
            let cp = splitCell(cellPosi);
            if (cp['row'] == 1) {
                headColCodes.push(cp['col'].charCodeAt())
            }
        }
        headColCodes.sort();

        let bigColNames = [];
        for (let i = 0; i < headColCodes.length - 1; i++) {
            // 获取 sheet 特定位置的数值
            let bigColName = i == 0 ? 'model' : wbDictObj[String.fromCharCode(headColCodes[i]) + '1']['v']
            bigColNames.push(bigColName);

            dictObj[bigColName] = []
            for (let r = 2; r < rows; r++) {
                let rowObj = {
                    rowId: r,
                    cols: [],
                    matches: [],
                    pRowId: ''
                }
                // if ()
            }

        }







    }




}

function writeWbObjTo(wbObj, filename) {

}

export default {
    readWbObjFrom,
    writeWbObjTo
}