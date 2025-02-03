import { ElectronAPI } from '@electron-toolkit/preload';

interface API {
  onWillNavigate: (callback) => IpcRenderer;
  onTabsChanged: (callback) => IpcRenderer;
  setUrl(url: string): void;
  newTab(): void;
  closeTab(id: string): void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    api: API;
  }
}

export {};
