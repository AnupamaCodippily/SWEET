const { app, BrowserWindow, Menu, dialog } = require('electron');
const fs = require('fs');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
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
                        const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow != null , {
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
                                mainWindow?.webContents.send('load-exam', data);
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
