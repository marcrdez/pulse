import {
  app,
  BaseWindow,
  WebContentsView,
  BrowserWindow,
  Menu,
  MenuItem,
  ipcMain,
  ipcRenderer,
} from 'electron';
import { join } from 'path';
import { electronApp, is } from '@electron-toolkit/utils';
import { Browser } from './browser';

export const SIDEBAR_WIDTH = 200;
export const MENUBAR_HEIGHT = 40;
export const CONTENT_PADDING = 4;

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BaseWindow({
    width: 900,
    height: 600,
    title: 'Pulse',
    titleBarStyle: 'hidden',
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
  });

  const bounds = mainWindow.getBounds();

  const sideBar = new WebContentsView({
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });
  mainWindow.contentView.addChildView(sideBar);
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    sideBar.webContents.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    sideBar.webContents.loadFile(join(__dirname, '../renderer/index.html'));
  }
  sideBar.setBounds({ x: 0, y: 0, width: bounds.width, height: bounds.height });

  mainWindow.on('resize', () => {
    if (!mainWindow) {
      return;
    }

    const updatedBounds = mainWindow.getBounds();

    sideBar.setBounds({
      x: 0,
      y: 0,
      width: updatedBounds.width,
      height: updatedBounds.height,
    });
  });

  const browser = new Browser(mainWindow, sideBar);

  createMenu(sideBar, browser);
}

function createMenu(sideBar: WebContentsView, browser: Browser): void {
  const menu = new Menu();

  menu.append(
    new MenuItem({
      label: app.name,
      submenu: [
        {
          label: 'Toggle developer tools',
          role: 'toggleDevTools',
          accelerator: process.platform === 'darwin' ? 'F12' : 'F12',
          click: (): void => {
            sideBar.webContents.openDevTools({ mode: 'undocked' });
          },
        },
      ],
    }),
  );

  menu.append(
    new MenuItem({
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectAll' },
      ],
    }),
  );

  menu.append(
    new MenuItem({
      label: 'Tabs',
      submenu: [
        { label: 'New Tab', accelerator: 'CmdOrCtrl+T', click: (): void => browser.addTab() },
        { type: 'separator' },
        {
          label: 'Close Tab',
          accelerator: 'CmdOrCtrl+W',
          click: (): boolean => browser.currentTab.emit('close-tab', browser.currentTab.id),
        },
      ],
    }),
  );

  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
