import { BaseWindow, ipcMain, WebContentsView } from 'electron';
import { join } from 'path';
import { SIDEBAR_WIDTH, CONTENT_PADDING, MENUBAR_HEIGHT } from '.';
import EventEmitter from 'events';

export class Tab extends EventEmitter {
  id: string;
  title: string;
  url: string;
  contentView: WebContentsView;

  constructor(mainWindow: BaseWindow, sideBarView: WebContentsView) {
    super();
    this.id = crypto.randomUUID();

    this.contentView = new WebContentsView();
    this.contentView.webContents.loadURL('https://www.google.com');

    this.title = this.contentView.webContents.getTitle();
    this.url = this.contentView.webContents.getURL();

    const contentView = new WebContentsView({
      webPreferences: { preload: join(__dirname, '../preload/index.js'), sandbox: false },
    });
    contentView.setBorderRadius(10);
    mainWindow.contentView.addChildView(contentView);

    const bounds = mainWindow.getBounds();

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
    });

    contentView.webContents.on('will-navigate', (event) => {
      sideBarView.webContents.send('will-navigate', event.url);
      this.url = event.url;
    });

    contentView.webContents.on('page-title-updated', (_, title) => {
      this.title = title;
      this.emit('tab-changed', this);
    });

    contentView.webContents.on('did-navigate-in-page', (_, url, isMainFrame) => {
      if (!isMainFrame) {
        return;
      }

      sideBarView.webContents.send('will-navigate', url);
      this.title = contentView.webContents.getTitle();
      this.url = url;

      this.emit('tab-changed', this);
    });

    ipcMain.on('set-url', (_, url: string) => {
      function formatUrl(input: string): string {
        if (/^(https?:\/\/)/i.test(input)) {
          return input;
        }

        if (/^[\w.-]+\.[a-zA-Z]{2,}$/.test(input)) {
          return `https://${input}`;
        }

        return `https://www.google.com/search?q=${encodeURIComponent(input)}`;
      }
      contentView.webContents.loadURL(formatUrl(url));
    });
  }
}
