import { BaseWindow, WebContentsView } from 'electron';
import { Tab } from './tab';
import EventEmitter from 'events';
import { ipcMain } from 'electron/main';

export interface PrimitiveTabs {
  id: string;
  title: string;
  url: string;
}

export class Browser extends EventEmitter {
  private _tabs: Array<Tab> = [];
  private _currentTab: Tab;

  private readonly window: BaseWindow;
  private readonly sideBarView: WebContentsView;

  constructor(window: BaseWindow, sideBarView: WebContentsView) {
    super();

    this.window = window;
    this.sideBarView = sideBarView;
    this._currentTab = new Tab(this.window, this.sideBarView);
    this._tabs.push(this._currentTab);

    this._currentTab.on('tab-changed', (tab: Tab) => {
      this._tabs = this._tabs.map((t) => (t.id === tab.id ? tab : t));
      this.sideBarView.webContents.send('tabs-changed', this.tabs);
    });

    ipcMain.on('new-tab', () => {
      this.addTab();
    });
  }

  public addTab(): void {
    this._currentTab.background();

    const tab = new Tab(this.window, this.sideBarView);
    this._currentTab = tab;
    this._currentTab.on('tab-changed', (tab: Tab) => {
      this._tabs = this._tabs.map((t) => (t.id === tab.id ? tab : t));
      this.sideBarView.webContents.send('tabs-changed', this.tabs);
    });
    this._tabs.push(tab);
    this.sideBarView.webContents.send('tabs-changed', this.tabs);
  }

  public deleteTab(id: string): void {
    this._tabs = this._tabs.filter((tab) => tab.id !== id);
    this.sideBarView.webContents.send('tabs-changed', this.tabs);
  }

  public openDevTools(): void {
    const webContents = this._currentTab.contentView.webContents;
    if (webContents.isDevToolsOpened()) {
      webContents.closeDevTools();
    } else {
      webContents.openDevTools({ mode: 'undocked' });
      console.log('Open dev tool...');
    }
  }

  get tabs(): Array<PrimitiveTabs> {
    return this._tabs.map((tab) => ({
      id: tab.id,
      title: tab.title,
      url: tab.url,
      faviconUrls: tab.faviconUrls,
      isActive: tab.isActive,
    }));
  }
}
