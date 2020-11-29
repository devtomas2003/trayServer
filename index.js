const { resolve } = require('path');
const { app, Menu, Tray } = require('electron');

app.on('ready', () => {
    const tray = new Tray(resolve(__dirname, 'assets', 'phone.png'));

    const contextMenu = Menu.buildFromTemplate([
        { label: 'dasd', click: () => {
            console.log("dfd");
        }}
    ]);
    tray.setContextMenu(contextMenu);
});

