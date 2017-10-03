'use strict';
const Electron = require('electron');
const Watch = require('watch');

const app = Electron.app;
const BrowserWindow = Electron.BrowserWindow;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        createWindow();
    }
});

Watch.watchTree(__dirname, (file, curr, prev) => {
    if (typeof file !== "object" || curr !== null || prev !== null) {
        if (mainWindow) {
            mainWindow.reload();
        }
    }
});
