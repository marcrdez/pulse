import { WebContentsView } from 'electron'

export class Tab {
  name: string
  url: string
  contentView: WebContentsView

  constructor() {
    this.contentView = new WebContentsView()
    this.contentView.webContents.loadURL('https://www.google.com')

    this.name = this.contentView.webContents.getTitle()
    this.url = this.contentView.webContents.getURL()
  }
}
