import { BaseWindow, WebContentsView } from 'electron';
import { Tab } from './tab';
import EventEmitter from 'events';
import { ipcMain } from 'electron/main';

export interface PrimitiveTabs {
  id: string;
  title: string;
  faviconUrls: string[];
  url: string;
  isActive: boolean;
  navigation?: { canGoBack: boolean; canGoForward: boolean };
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

    this.registerTabEvents(this._currentTab);

    ipcMain.on('new-tab', () => {
      this.addTab();
    });

    ipcMain.on('change-current-tab', (_event, id: string) => {
      const tab = this._tabs.find((t) => t.id === id);
      if (tab === undefined) {
        return;
      }

      tab.emit('active', tab);

      this._currentTab.background();
      this.updateCurrentTab(tab);
    });

    ipcMain.on('go-back', () => {
      this.goBack();
    });

    ipcMain.on('go-forward', () => {
      this.goForward();
    });
  }

  public addTab(): void {
    this._currentTab.background();

    const tab = new Tab(this.window, this.sideBarView);
    this._currentTab = tab;
    this.registerTabEvents(tab);
    this._tabs.push(tab);
    this.sideBarView.webContents.send('tabs-changed', this.tabs);
  }

  public deleteTab(tab: Tab): void {
    this._tabs = this._tabs.filter((t) => t.id !== tab.id);
    this.sideBarView.webContents.send('tabs-changed', this.tabs);
  }

  public updateCurrentTab(tab: Tab): void {
    this._currentTab = tab;
    this._currentTab.active();
    this.sideBarView.webContents.send('tabs-changed', this.tabs);
  }

  public goBack(): void {
    this._currentTab.emit('go-back');
  }

  public goForward(): void {
    this._currentTab.emit('go-forward');
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
    return this._tabs.map((tab): PrimitiveTabs => {
      const primitives: PrimitiveTabs = {
        id: tab.id,
        title: tab.title,
        url: tab.url,
        faviconUrls: tab.faviconUrls,
        isActive: tab.isActive,
      };

      if (tab.isActive) {
        primitives.navigation = {
          canGoBack: tab.navigation.canGoBack,
          canGoForward: tab.navigation.canGoForward,
        };
      }

      return primitives;
    });
  }

  get currentTab(): Tab {
    return this._currentTab;
  }

  private registerTabEvents(tabToRegister: Tab): void {
    tabToRegister.on('tab-changed', (tab: Tab) => {
      this._tabs = this._tabs.map((t) => (t.id === tab.id ? tab : t));
      this.sideBarView.webContents.send('tabs-changed', this.tabs);
    });

    tabToRegister.on('tab-removed', (tab: Tab) => {
      this.deleteTab(tab);
      const nextTab = this._tabs.find(
        (t) =>
          t.contentView.webContents.id + 1 ===
          (this.window.contentView.children.at(-1) as WebContentsView).webContents.id,
      );

      if (nextTab === undefined) {
        return;
      }

      this.updateCurrentTab(nextTab);
    });
  }
}
