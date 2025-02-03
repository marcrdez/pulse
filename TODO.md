# Pulse

> Why Electron?

Mainly because how difficult is to fork Chromium/Firefox and do the things that I want. Electron, eventhough won not be the best solution, the main concept of this browser is to understand what I am doing and how Electron, Svelte, Vite works.

> Why Svelte?

Speedness and to learn it.

## Bugs

- [ ] Sometimes when the browser is not focused, URL and Tab dissapear.
- [ ] When entering an URL it does not change the URL when loading the webpage.
- [ ] When changing tabs, the URL does not change.

## Feats

- [ ] Change between tabs.
- [ ] Add error offline HTML page.
- [ ] Add loading animation to tab when loading a page.

## Refactors

- [ ] Create a main content View that has all tabs as children.
- [ ] Check where all the events are listened to avoid useless calls (for example: close tab call every tab event).

### Milestones

- [x] Add new tabs.
- [x] Close tabs.
- [x] When closing a tab, the previous tab does not become active.
