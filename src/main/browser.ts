import { BaseWindow, WebContentsView } from 'electron';
import { Tab } from './tab';
import EventEmitter from 'events';

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
      this._currentTab = tab;
      this._tabs = this._tabs.map((t) => (t.id === tab.id ? tab : t));
      this.sideBarView.webContents.send('tabs-changed', this.tabs);
    });
  }

  public addTab(): void {
    const tab = new Tab(this.window, this.sideBarView);
    this._currentTab = tab;
    this._tabs.push(tab);
    console.info(this._tabs);
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

  get currentTab(): Tab {
    return this._currentTab;
  }

  get tabs(): Array<PrimitiveTabs> {
    return this._tabs.map((tab) => ({
      id: tab.id,
      title: tab.title,
      url: tab.url,
    }));
  }
}
