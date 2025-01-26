const { app, BrowserWindow, Menu, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Ensure preload.js is set correctly
            contextIsolation: true, // Required for contextBridge
            nodeIntegration: false, // Must be false for security
            enableRemoteModule: false, // Recommended to keep this disabled
          },
    });

    mainWindow.loadFile('public/index.html');

    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open Exam',
                    click: async () => {
                        const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow != null, {
                            title: 'Open Exam File',
                            filters: [{ name: 'JSON Files', extensions: ['json'] }],
                            properties: ['openFile'],
                        });

                        if (!canceled && filePaths.length > 0) {
                            const filePath = filePaths[0];
                            fs.readFile(filePath, 'utf-8', (err, data) => {
                                if (err) {
                                    console.error('Error reading file:', err);
                                    return;
                                }

                                // Send file content to the renderer process
                                mainWindow?.webContents.send('open-exam', data);
                            });
                        }
                    },
                },
                { type: 'separator' },
                { role: 'quit' },
            ],
        },
    ]);
    Menu.setApplicationMenu(menu);


    // Enable DevTools
    mainWindow.webContents.openDevTools(); // Opens DevTools on app launch

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
