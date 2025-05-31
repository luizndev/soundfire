const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Permite usar Node.js dentro da janela, cuidado com segurança
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Carrega a sua app React rodando localmente
  win.loadURL('http://localhost:3000');
  
  // Ou pode carregar o build estático da React (depois do build)
  // win.loadFile(path.join(__dirname, 'build', 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
