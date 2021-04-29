const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')
const mime = require('mime');

const allowFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']

const { ipcMain } = require('electron')
ipcMain.handle('load-file', (event, path) => {
  console.log(mime.getType(path))
  
})


function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname , "preload.js"),
      contextIsolation:false
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
