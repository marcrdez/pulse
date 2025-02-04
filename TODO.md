# Pulse

> Why Electron?

Mainly because how difficult is to fork Chromium/Firefox and do the things that I want. Electron, eventhough would not be the best solution, the main concept of this browser is to understand what I am doing and how Electron, Svelte, Vite works.

> Why Svelte?

Speedness and to learn it.

> What are the priorities about TODOs?

1. Bugs
2. Refactors
3. Feats

Why? Avoiding bugs is the main priority, next is the refactors to avoid the big ball of mud and lastly new features.

## Bugs

- [ ] Sometimes when the browser is not focused (OS goes to sleep), URL and Tab dissapear.
- [ ] Fix close tab menu item (also shortcut Cmd+W)
- [ ] Fix menu go back and go forward enablement. (See possible [solution](https://stackoverflow.com/a/47761652))

## Feats

- [ ] Add error offline HTML page.
- [ ] Right click context menu for content.
- [ ] Right click context menu for sidebar.
- [ ] Add preferences page.
- [ ] Add loading animation to tab when loading a page.
- [ ] Drag and drop tabs.

## Refactors

- [ ] Create a main content View that has all tabs as children.
- [ ] Check where all the events are listened to avoid useless calls (for example: close tab call every tab event).
- [ ] Remove current tab as it is last children from content view.
- [ ] Remove main ipc change url event, as we are using the active tab.
- [ ] Divide main css (yeah, I am a mess).

### Milestones

> Ordered by latest

- [x] Open webContent chrome devs tool.
- [x] Go back and go forward buttons and shortcuts.
- [x] When entering an URL it does not change the URL when loading the webpage.
- [x] When changing tabs, the URL does not change.
- [x] Change between tabs.
- [x] When closing a tab, the previous tab does not become active.
- [x] Close tabs.
- [x] Add new tabs.
