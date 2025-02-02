import { ElectronAPI } from '@electron-toolkit/preload';

interface API {
  onWillNavigate: (callback) => IpcRenderer;
  setUrl(url: string): void;
  onTabsChanged: (callback) => IpcRenderer;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    api: API;
  }
}

export {};
