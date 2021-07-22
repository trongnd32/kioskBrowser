// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut, ipcMain} = require('electron')
const path = require('path')
const { execFile  } = require("child_process");
var os = require('os');

const gotTheLock = app.requestSingleInstanceLock()
let win

// one instance at once
if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      // Someone tried to run a second instance, we should focus our window.
        if (win) {
            if (win.isMinimized()) win.restore()
            win.focus()
        }
    })
    // Create myWindow, load the rest of the app, etc...
    app.whenReady().then(() => {
        createWindow()
    })
}

function createWindow() {
    if(os.platform() == "win32") {
        // run keymap
        execFile(path.join(path.dirname(__dirname),"function/win32", "essential.exe"), (error, stdout, stderr) => {
            if (error) {
                // throw error;
            }
        });
    }

    win = new BrowserWindow({
        // alwaysOnTop: true, // enable always on top to prevent other windows from appearing above it
        // kiosk: true, // enable kiosk mode, makes it full screen and what not
        // frame: false, // remove menu
        // resizable: false,
        // minimizable: false,
        // skipTaskbar: true,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: false,
            contextIsolation: true,
            devTools: true,
            preload: path.join(__dirname, "preload.js"),
        },
    })

    // win.setAlwaysOnTop(true, 'screen')
    // win.setKiosk(true)
    // win.setSkipTaskbar(true)
    win.loadFile('index.html')
    win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
        app.quit()
    })

    win.on('close', event => {
        app.quit()
        // event.preventDefault() // stop the browser window from being closed
    })

    win.onbeforeunload = (e) => {
        console.log('I do not want to be closed')
    }
}

app.on('before-quit', event => {
    // event.preventDefault() // prevent the process from ending
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
    })
    globalShortcut.register('Alt+F4', () => {
        getCurrentWindow.
        win.webContents.send("openCloseDialog", true)
    })
    globalShortcut.register('CommandOrControl+Esc', () => {
        console.log("Pressed Ctrl + Esc")
    })
    // globalShortcut.register('Alt+')
})

// ipcMain.on('keypress', (event, arg) => {
//     win.focus()
// })