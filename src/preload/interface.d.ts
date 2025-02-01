import { ElectronAPI } from '@electron-toolkit/preload';

interface API {
  onWillNavigate: (callback) => IpcRenderer;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    api: API;
  }
}

export {};
