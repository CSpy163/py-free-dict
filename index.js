const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const mime = require('mime');
const moment = require('moment')
const {dialog} = require('electron')

const {ipcMain} = require('electron')
const {readWbObjFrom, writeWbObjTo} = require('./src/util/fd-xlsx')

// 窗体对象
let win = null
Menu.setApplicationMenu(null)
// moment 时间组件设置时区
moment.locale('zh-cn')

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

// 设置可被允许的文件类型（mime）
const allowFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']

// 响应加载文件事件
ipcMain.handle('load-file', (event, path) => {
    if (allowFileTypes.indexOf(mime.getType(path)) !== -1) {
        let wbObj = null
        try {
            wbObj = readWbObjFrom(path)
        } catch (err) {
            console.error(err)
        }
        event.sender.send('file-loaded', wbObj)
    }

})

// 响应导出事件
ipcMain.handle('export-excel', (event, wbObj) => {
    let fileName = `${moment().format('LLLss秒')}.xlsx`;
    let choosePath = dialog.showOpenDialogSync({
        title: "请选择文件保存位置",
        properties: ['openDirectory', 'createDirectory', 'promptToCreate']
    })
    if (choosePath && choosePath.length !== 0) {
        writeWbObjTo(wbObj, path.join(choosePath[0], fileName))
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