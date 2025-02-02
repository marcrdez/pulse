import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { IpcRenderer, ipcRenderer } from 'electron/renderer';
import { Tab } from '../main/tab';

// Custom APIs for renderer
const api = {
  onWillNavigate: (callback): IpcRenderer =>
    ipcRenderer.on('will-navigate', (_event, value) => callback(value)),
  setUrl: (url: string): void => ipcRenderer.send('set-url', url),
  onTabsChanged: (callback): IpcRenderer =>
    ipcRenderer.on('tabs-changed', (_event, tabs: Array<Tab>) => callback(tabs)),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
