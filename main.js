// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut} = require('electron')
const {ipcMain} = require('electron')
const path = require('path')
const fetch = require("node-fetch")

let win
// const configUrl = "https://raw.githubusercontent.com/trongnd32/wakeupflag/main/Flag.txt"

function createWindow() {
    win = new BrowserWindow({
        alwaysOnTop: true, // enable always on top to prevent other windows from appearing above it
        kiosk: true, // enable kiosk mode, makes it full screen and what not
        frame: false, // remove menu
        resizable: false,
        minimizable: false,
        skipTaskbar: true,
        webPreferences: {
            webviewTag: true,
            devTools: false,
        },
    })

    win.setAlwaysOnTop(true, 'screen')
    win.loadFile('index.html')
    // win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
    })

    win.on('close', event => {
        // event.preventDefault() // stop the browser window from being closed
    })

    win.onbeforeunload = (e) => {
        console.log('I do not want to be closed')
    }

    // fetch(configUrl, {
    //     headers: {
    //         "Content-Type": "application/octet-stream",
    //     },
    //     credentials: 'include'
    // })
    //     .then(res => res.json())
    //     .then(data => console.log(data))
}

app.on('ready', createWindow)

app.on('before-quit', event => {
    event.preventDefault() // prevent the process from ending
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

// helper to prevent the app from loosing focus
app.on('browser-window-blur', (event, bw) => {
    bw.restore()
    bw.focus()
})

app.whenReady().then(() => {
    globalShortcut.register('F11', () => {
        console.log("Pressed F11")
    })
    globalShortcut.register('Alt+Tab', () => {
        // not work
        console.log("Pressed Alt + Tab")
    })
    globalShortcut.register('Alt+F4', () => {
        console.log("Pressed Alt + F4")
    })
    globalShortcut.register('CommandOrControl+Esc', () => {
        console.log("Pressed Ctrl + Esc")
    })
    globalShortcut.register('Control+Esc', () => {
        // not work
        console.log("Pressed Ctrl + Esc")
    })
})