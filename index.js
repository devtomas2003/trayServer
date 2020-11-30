const { resolve } = require('path');
const { app, Menu, Tray } = require('electron');
const { spawn } = require('child_process');
const static = require('node-static');
const file = new static.Server(`./public`)
if (app.dock) {
    app.dock.hide();
}
app.on('ready', () => {
    require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            file.serve(request, response);
        }).resume();
    }).listen(8080);
    const tray = new Tray(resolve(__dirname, 'assets', 'phone.png'));

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Abrir Programador', click: () => {
            spawn('yarn', [path], { shell: true });
        }},
        { label: 'Parar Programador', click: () => {
            console.log("ff");
        }},
    ]);
    tray.setContextMenu(contextMenu);
});

