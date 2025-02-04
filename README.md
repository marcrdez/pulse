# Pulse

🧘 Fast, open-source and privacy-focused browser built on top of Electron.

## About

Pulse is a browser built on top of Electron, Svelte and Vite. The main goal of this project is to understand how these technologies work together and learn about them.

### Why?

Mainly because I am always trying new apps (i.e. Ghostty). In terms of browsers, there is not much to choose from, from modern browsers we have Arc (_WHY I NEED TO LOG IN_), Vivaldi (_prioritizes webpage hot keys over browser hot keys_ 😔) and Zen (_really cool, but firefox_ 🥶).

So, why not doing my own browser? 🤔 Well, I am not going to fork Chromium or Firefox, that is a lot of work and low-level programming. I was curious about Electron, web technologies and used by a lot of cool apps like Discord, Notion, Obsidian, Dropbox,[etc.](https://www.electronjs.org/apps). I found that it uses Chromium inside, so I only need to focus on the browser itself.

## Tech stack

- [Electron](https://www.electronjs.org/)
- [Svelte](https://svelte.dev/)
- [Vite](https://vitejs.dev/)
- [Bun](https://bun.sh/)
- TODO: [Crowdin](https://crowdin.com/)

#### Why Svelte?

Well, pretty knew, well maintained and it is really fast, so why not? I am using it for the interface of the browser, so speed is a must. It does not uses a virtual DOM, I can ensure it is fast.

#### Why Vite?

Is fast and really powerful, also there is this package [electron-vite](https://electron-vite.org/) that helps to integrate Vite with Electron, and support TypeScript.

## Development

So... You want to help? See TODO.md for current bugs,refactors and feats, but feel free to do what you want.

### Install

```bash
$ nvm use
```

```bash
$ bun install
```

### Development

```bash
$ bun run dev
```

### Build

```bash
# For windows
$ bun run build:win

# For macOS
$ bun run build:mac

# For Linux
$ bun run build:linux
```
