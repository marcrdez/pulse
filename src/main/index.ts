import { app, BaseWindow, WebContentsView, BrowserWindow, Menu, MenuItem } from 'electron';
import { join } from 'path';
import { electronApp, is } from '@electron-toolkit/utils';

const SIDEBAR_WIDTH = 180;
const MENUBAR_HEIGHT = 30;
const CONTENT_PADDING = 7;

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
    webPreferences: { preload: join(__dirname, '../preload/index.js'), sandbox: false },
  });
  mainWindow.contentView.addChildView(sideBar);
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    sideBar.webContents.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    sideBar.webContents.loadFile(join(__dirname, '../renderer/index.html'));
  }
  sideBar.setBounds({ x: 0, y: 0, width: bounds.width, height: bounds.height });

  const contentView = new WebContentsView({
    webPreferences: { preload: join(__dirname, '../preload/index.js'), sandbox: false },
  });
  contentView.setBorderRadius(10);
  mainWindow.contentView.addChildView(contentView);

  const CONTENT_WIDTH = bounds.width - SIDEBAR_WIDTH - CONTENT_PADDING;
  const CONTENT_HEIGHT = bounds.height - MENUBAR_HEIGHT - CONTENT_PADDING;

  contentView.setBounds({
    x: SIDEBAR_WIDTH,
    y: MENUBAR_HEIGHT,
    width: CONTENT_WIDTH,
    height: CONTENT_HEIGHT,
  });

  mainWindow.on('resize', () => {
    if (!mainWindow || !contentView) {
      return;
    }

    const updatedBounds = mainWindow.getBounds();
    const UPDATED_CONTENT_WIDTH = updatedBounds.width - SIDEBAR_WIDTH - CONTENT_PADDING;
    const UPDATED_CONTENT_HEIGHT = updatedBounds.height - MENUBAR_HEIGHT - CONTENT_PADDING;

    contentView.setBounds({
      x: SIDEBAR_WIDTH,
      y: MENUBAR_HEIGHT,
      width: UPDATED_CONTENT_WIDTH,
      height: UPDATED_CONTENT_HEIGHT,
    });
    sideBar.setBounds({
      x: 0,
      y: 0,
      width: updatedBounds.width,
      height: updatedBounds.height,
    });
  });

  contentView.webContents.on('will-navigate', (ev) => {
    sideBar.webContents.send('will-navigate', ev.url);
  });

  contentView.webContents.on('did-navigate-in-page', (_, url, isMainFrame) => {
    if (!isMainFrame) {
      return;
    }

    sideBar.webContents.send('will-navigate', url);
  });

  contentView.webContents.loadURL('https://www.google.com');

  createMenu(sideBar);
}

function createMenu(view: WebContentsView): void {
  const { webContents } = view;

  const menu = new Menu();

  menu.append(
    new MenuItem({
      label: 'Open developer tools',
      submenu: [
        {
          label: 'Toggle developer tools',
          role: 'toggleDevTools',
          accelerator: process.platform === 'darwin' ? 'F12' : 'F12',
          click: (): void => {
            if (webContents.isDevToolsOpened()) {
              webContents.closeDevTools();
            } else {
              webContents.openDevTools({ mode: 'undocked' });
              console.log('Open dev tool...');
            }
          },
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
