const { app, BroserWindow, BrowserView, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, //allow node.js in renderer
            contextIsolation: false // simplfy for this example
        }
    });
    win.loadFile('index.html');
    win.webContents.openDevTools(); // Add this line
    //win.setMenuBarVisibility(false); // optional: hide default menu
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});