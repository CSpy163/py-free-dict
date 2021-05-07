const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')
const mime = require('mime');
const xlsx = require('xlsx')
const moment = require('moment')
const { dialog } = require('electron')

const { ipcMain } = require('electron')


let win = null

// moment 时间组件设置时区
moment.locale('zh-cn')

// 设置可被允许的文件类型（mime）
const allowFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']

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

// 分析数据表
function analyseDict(file_name) {
  let workbook = xlsx.readFile(file_name);

  let wbObj = {}
  // 遍历 sheets
  for (let sheetName of workbook.SheetNames) {
    wbObj[sheetName] = {}

    let sheet = workbook.Sheets[sheetName];
    let bigColNames = [];
    // 获取 sheet 中，有效列数
    let ref = sheet['!ref'];
    if (ref && ref.indexOf(':' != -1)) {
      // 划分大列
      // width and height
      let wah = splitCell(ref.split(":")[1]);
      let endCol = wah['col'];
      let rows = wah['row']
      let headCols = new Set();
      headCols.add(endCol.charCodeAt() + 1)
      for (let cellPosi in sheet) {
        let cp = splitCell(cellPosi)
        let cpRow = cp['row']
        if (cpRow && cpRow == 1) {
          headCols.add(cp['col'].charCodeAt())
        }
      }
      // 排序并转码（ascii）
      let orderCol = [...headCols].sort()

      // 根据大列组装 wbObj
      for (let i = 0; i < orderCol.length - 1; i++) {
        let bigColName = i == 0 ? '_template' : sheet[String.fromCharCode(orderCol[i]) + '1']['v'];
        bigColNames.push(bigColName);

        wbObj[sheetName][bigColName] = []
        for (let r = 2; r <= rows; r++) {
          let rowObj = {
            'rowId': r,
            'cols': [],
            'matches': []
          }
          for (let c = orderCol[i]; c < orderCol[i + 1]; c++) {
            rowObj['cols'].push(sheet[String.fromCharCode(c) + r] ? sheet[String.fromCharCode(c) + r]['v'] : undefined)
          }
          if (!pureEmpty(rowObj['cols'])) {
            wbObj[sheetName][bigColName].push(rowObj)
          }
        }
      }

    }

    // 设置映射 matches
    let merges = sheet['!merges'];
    merges.forEach(merge => {
      // 只查看第一列合并的
      if (merge['s']['c'] == 0 && merge['e']['c'] == 0) {
        let startRowId = merge['s']['r'] + 1;
        let endRowId = merge['e']['r'] + 1;
        let multiRow = wbObj[sheetName]['_template'].find(rowObj => rowObj['rowId'] == startRowId);
        if (multiRow) {
          // 去除无效行
          wbObj[sheetName]['_template'] = wbObj[sheetName]['_template'].filter(rowObj => rowObj['rowId'] <= startRowId || rowObj['rowId'] > endRowId);
          // 找出每个大列中，匹配的行
          for (let bnIndex = 1; bnIndex < bigColNames.length; bnIndex++) {
            let bRowObjs = wbObj[sheetName][bigColNames[bnIndex]].filter(bnRowObj => {
              return bnRowObj['rowId'] > startRowId && bnRowObj['rowId'] <= endRowId;
            });
            if (bRowObjs) {
              bRowObjs.forEach(br => {
                br['belongs'] = {
                  'rowId': multiRow['rowId'],
                  'cols': multiRow['cols']
                }
                // multiRow['matches'].push({
                //   'bigColName': bigColNames[bnIndex],
                //   'rowId': br['rowId']
                // })
              })
            }
          }
        }
      }
    })

    for (let bcnIndex = 1; bcnIndex < bigColNames.length; bcnIndex++) {
      wbObj[sheetName][bigColNames[bcnIndex]].forEach(bcObj => {
        let rowId = bcObj['rowId'];
        let rowObj = wbObj[sheetName]['_template'].find(tObj => tObj['rowId'] == rowId)
        if (rowObj != undefined) {
          bcObj['belongs'] = {
            'rowId': rowId,
            'cols': rowObj['cols']
          }
        } else {
          bcObj['belongs'] = {
            'rowId': '',
            'cols': []
          }
        }
      })
    }
  }
  return wbObj;
}

// 响应加载文件事件
ipcMain.handle('load-file', (event, path) => {
  if (allowFileTypes.indexOf(mime.getType(path)) != -1) {
    let wbObj = null
    try {
      wbObj = analyseDict(path)
    } catch (err) {
      console.error(err)
    }
    event.sender.send('file-loaded', wbObj)
  }

})

// 响应导出事件
ipcMain.handle('export-excel', (event, wbObj) => {
  let fileName = `${moment().format('LLLss秒')}.xlsx`;
  let choosePath = dialog.showOpenDialogSync({ title: "请选择文件保存位置", properties: ['openDirectory', 'createDirectory', 'promptToCreate'] })
  if (choosePath && choosePath.length != 0) {
    objToSheets(wbObj, path.join(choosePath[0], fileName))
    event.sender.send('export-excel-ended', {
      success: true,
      fileName: fileName
    })
  } else {
    event.sender.send('export-excel-ended', {
      success: false,
      fileName: ''
    })
  }

})


function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: false
    }
  })

  // win.loadFile('./dist/index.html')
  win.loadURL('http://localhost:8080/')
  win.webContents.openDevTools()

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// obj 转 xlsx
function objToSheets(wbObj, fileName) {

  // 数组下标转 列名
  function getColName(index, startChar = "A") {
    return String.fromCharCode(startChar.charCodeAt() + index)
  }
  let sheetNames = []
  let sheets = {}
  for (let sheetName in wbObj) {
    sheetNames.push(sheetName)

    // 用来保存 Sheets 结果
    let dict = {}
    // dict 对象
    let dictObj = wbObj[sheetName]

    // dictObj 中的 template 对象
    let templateObj = dictObj['_template']
    // 各个大列名
    let bigCols = Object.keys(dictObj);
    let templateIndex = bigCols.indexOf('_template')
    if (templateIndex != -1) {
      bigCols.splice(templateIndex, 1)
    }

    // 标准列中的 id Set，用来排除无效映射
    // let templateRowIdSet = new Set(templateObj.map(tObj => tObj['rowId']));
    /* 表格高度 = 主体高度 + 最大剩余高度 */
    // 主体高度
    // let mainHeight = 0;

    // 表格最大宽度
    let maxWidth = 0;
    // 各个大列的起始列
    let colStartMap = {}

    // 初始化【融合字段】
    dict['!merges'] = []
    // 对 template 列进行特殊处理
    if (templateObj.length != 0) {
      maxWidth = templateObj[0]['cols'].length;
      dict['!merges'].push({
        s: {
          c: 0,
          r: 0
        },
        e: {
          c: maxWidth - 1,
          r: 0
        }
      })
      dict[`${getColName(0)}1`] = { v: "标准字典" }
    }

    // 循环处理各大列
    bigCols.forEach(bcName => {
      // 计算最大剩余高度
      // let bcLeftCount = 0
      // dictObj[bcName].forEach(bcRow => {
      //     if (!bcRow['belongs'] || (bcRow['belongs'] && !templateRowIdSet.has(bcRow['belongs']['rowId']))) {
      //         bcLeftCount++;
      //     }
      // })
      // maxLeftHeight = bcLeftCount > maxLeftHeight ? bcLeftCount : maxLeftHeight;

      // 计算最大宽度
      if (dictObj[bcName].length != 0) {
        let s = {
          c: maxWidth,
          r: 0
        }
        let colName = getColName(maxWidth);
        colStartMap[bcName] = colName
        maxWidth += dictObj[bcName][0]['cols'].length;
        let e = {
          c: maxWidth - 1,
          r: 0
        }
        dict['!merges'].push({ s, e })
        dict[`${colName}1`] = { v: bcName != null ? bcName : '' }
      }
    })

    let startRow = 2;
    // 生成主体  tObj 是 template 中的每一行
    templateObj.forEach(tObj => {
      let s = {
        c: 0,
        r: startRow - 1
      }
      // 每一行默认高度为 1
      let maxRowHeight = 1;
      // 填充 template
      for (let i = 0; i < tObj['cols'].length; i++) {
        dict[`${getColName(i)}${startRow}`] = { v: tObj['cols'][i] != null ? tObj['cols'][i] : '' }
      }

      // cn：colName  循环各大列
      let matches = tObj['matches']
      for (let cn in matches) {
        let cnRowHeight = matches[cn].length;
        // 第一遍循环高度，第二遍循环宽度
        for (let i = 0; i < cnRowHeight; i++) {
          for (let j = 0; j < matches[cn][i]['cols'].length; j++) {
            dict[`${getColName(j, colStartMap[cn])}${startRow + i}`] = { v: matches[cn][i]['cols'][j] != null ? matches[cn][i]['cols'][j] : '' }
          }
          // 弹出 obj 中匹配完的row
          wbObj[sheetName][cn] = wbObj[sheetName][cn].filter(row => row['rowId'] != matches[cn][i]['rowId'])
        }

        if (maxRowHeight < cnRowHeight) {
          maxRowHeight = matches[cn].length
        }
      }
      startRow += maxRowHeight;
      if (maxRowHeight != 1) {
        let e = {
          c: 0,
          r: startRow - 2
        }
        // template 融合
        for (let colIndex = 0; colIndex < tObj['cols'].length; colIndex++) {
          dict['!merges'].push({
            s: {
              c: colIndex,
              r: s['r']
            }, e: {
              c: colIndex,
              r: e['r']
            }
          })
        }
      }
    })

    // 最大剩余高度
    let maxLeftHeight = 0;
    // 填充未匹配的行
    bigCols.forEach(bcName => {
      let bcStartRow = startRow + 1;
      let bcRowHeight = dictObj[bcName].length;
      // 刷新最大剩余高度
      if (maxLeftHeight < bcRowHeight) {
        maxLeftHeight = bcRowHeight
      }
      for (let i = 0; i < bcRowHeight; i++) {
        for (let j = 0; j < dictObj[bcName][i]['cols'].length; j++) {
          dict[`${getColName(j, colStartMap[bcName])}${bcStartRow + i}`] = { v: dictObj[bcName][i]['cols'][j] != null ? dictObj[bcName][i]['cols'][j] : '' }
        }
      }
    })

    // 设置表格范围
    /* 表格高度 = 主体高度 + 最大剩余高度 */
    dict['!ref'] = `A1:${getColName(maxWidth - 1)}${startRow + 1 + maxLeftHeight}`;
    sheets[sheetName] = dict
  }


  let wb = { SheetNames: sheetNames, Sheets: sheets }
  xlsx.writeFile(wb, fileName)
}
