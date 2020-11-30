const { resolve } = require('path');
const { app, Menu, Tray, shell } = require('electron');
const static = require('node-static');
const file = new static.Server(`./public`)
if (app.dock) {
    app.dock.hide();
}
const staticServer = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(8080);
app.on('ready', () => {
    shell.openExternal('http://127.0.0.1:8080/');
    const tray = new Tray(resolve(__dirname, 'assets', 'phone.png'));
    renderTray(tray, true);
});
function renderTray(tray = mainTray, serviceStatus){
    var status = '';
    if(serviceStatus){
        status = 'Parar Serviço';
    }else{
        status = 'Iniciar Serviço';
    }
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Abrir Programador', click: () => {
            shell.openExternal('http://127.0.0.1:8080/');
        }},
        { label: status, click: () => {
            if(serviceStatus){
                staticServer.close();
                renderTray(tray, false);
            }else{
                staticServer.resume();
                renderTray(tray, true);
            }

        }},
        { label: 'Terminar Programador', click: () => {
            app.exit();
        }}
    ]);
    tray.setContextMenu(contextMenu);
}