# Pulse

> Why Electron?

Mainly because how difficult is to fork Chromium/Firefox and do the things that I want. Electron, eventhough won not be the best solution, the main concept of this browser is to understand what I am doing and how Electron, Svelte, Vite works.

> Why Svelte?

Speedness and to learn it.

> What are the priorities about TODOs?

1. Bugs
2. Refactors
3. Feats

Why? Avoiding bugs is the main priority, next is the refactors to avoid the big ball of mud and lastly new features.

## Bugs

- [ ] Sometimes when the browser is not focused, URL and Tab dissapear.

## Feats

- [ ] Add error offline HTML page.
- [ ] Add preferences page.
- [ ] Add loading animation to tab when loading a page.

## Refactors

- [ ] Create a main content View that has all tabs as children.
- [ ] Check where all the events are listened to avoid useless calls (for example: close tab call every tab event).
- [ ] Remove current tab as it is last children from content view.
- [ ] Remove main ipc change url event, as we are using the active tab.

### Milestones

> Ordered by latest

- [x] When entering an URL it does not change the URL when loading the webpage.
- [x] When changing tabs, the URL does not change.
- [x] Change between tabs.
- [x] When closing a tab, the previous tab does not become active.
- [x] Close tabs.
- [x] Add new tabs.
