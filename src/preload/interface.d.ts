import { ElectronAPI } from '@electron-toolkit/preload';

interface API {
  onWillNavigate: (callback) => IpcRenderer;
  onTabsChanged: (callback) => IpcRenderer;
  setUrl(url: string): void;
  newTab(): void;
  changeCurrentTab(id: string): void;
  closeTab(id: string): void;
  goBack(): void;
  goForward(): void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    api: API;
  }
}

export {};
