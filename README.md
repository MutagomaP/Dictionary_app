# Dictionary Mobile App

A cross-platform English dictionary app built with **React Native** and **Expo**, developed for **LexiTech Solutions Ltd**.

Search words, view definitions and examples, listen to pronunciations, and browse your search history — on Android and iOS.

---

## Prerequisites

Before you start, make sure you have:

| Requirement | Notes |
|-------------|-------|
| [Node.js](https://nodejs.org/) | v18 or newer recommended |
| npm | Comes with Node.js |
| Expo Go app | Install on your phone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)) |
| Android Studio | Optional — for Android emulator |
| Xcode | Optional — macOS only, for iOS simulator |

You also need an **internet connection** — the app fetches word data from an online API.

---

## Getting Started

### 1. Open the project folder

```bash
cd "Dictionary_app"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

> **Note:** Use `npm start`, not `npm expo start`. The `expo` command is run through npm scripts or `npx`.

To clear the Metro cache (if the app behaves oddly):

```bash
npm run start:clear
```

Or:

```bash
npx expo start --clear
```

This opens the **Expo Dev Tools** in your terminal and shows a QR code.

### 4. Run on a device or emulator

| Platform | Command | Alternative |
|----------|---------|-------------|
| **Phone (Expo Go)** | Scan the QR code | Android: Expo Go app · iOS: Camera app |
| **Android emulator** | Press `a` in the terminal | Or run `npm run android` |
| **iOS simulator** | Press `i` in the terminal | macOS only · Or run `npm run ios` |

---

## How to Use the App

1. Open the **Search** tab from the drawer menu.
2. Type an English word (e.g. `hello`, `dictionary`) and tap **Search**.
3. View the word details — meanings, definitions, examples, and phonetics.
4. Tap the **speaker icon** to hear pronunciation (when audio is available).
5. Open **History** from the drawer to see past searches and tap any word to look it up again.

---

## API Configuration

The dictionary data comes from the **Free Dictionary API**.

**File:** `src/services/dictionaryApi.js`

```js
const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';
```

A search for `hello` calls:

```
https://api.dictionaryapi.dev/api/v2/entries/en/hello
```

To change the API endpoint, edit `BASE_URL` in that file only.

---

## Project Structure

```
Dictionary_app/
├── index.js                 # App entry point (registers root component)
├── app.json                 # Expo configuration
├── babel.config.js          # Babel + Reanimated plugin
├── assets/                  # App icons and splash images
└── src/
    ├── App.js               # Root component (providers + navigation)
    ├── screens/
    │   ├── SearchScreen.js      # Word search UI
    │   ├── WordDetailScreen.js  # Definitions & phonetics
    │   └── HistoryScreen.js     # Search history list
    ├── components/
    │   ├── SearchBar.js
    │   ├── MeaningCard.js
    │   ├── AudioButton.js
    │   ├── LoadingIndicator.js
    │   └── ErrorMessage.js
    ├── navigation/
    │   └── DrawerNavigator.js   # Drawer + stack navigation
    ├── services/
    │   └── dictionaryApi.js     # Axios API calls (API URL here)
    ├── context/
    │   └── SearchHistoryContext.js  # Global state
    ├── hooks/
    │   └── useDictionary.js     # Hook to access global state
    └── utils/
        ├── validators.js        # Input validation
        └── theme.js             # Colors and spacing
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo development server |
| `npm run start:clear` | Start with Metro cache cleared |
| `npm run android` | Start server and open on Android |
| `npm run ios` | Start server and open on iOS (macOS only) |
| `npm run web` | Start server for web (requires extra web dependencies) |

---

## Features

- Word search with input validation
- Definitions, examples, and phonetic spellings
- Audio pronunciation playback (`expo-audio`)
- Search history (no duplicates, most recent first)
- Drawer navigation (Search · History)
- Error handling for not found, network, and API failures
- Retry button on errors

---

## Troubleshooting

### `Project is incompatible with this version of Expo Go`

This project uses **Expo SDK 54**. Your Expo Go app must support SDK 54.

1. **Update Expo Go** from the [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [App Store](https://apps.apple.com/app/expo-go/id982107779).
2. Restart Metro with a clean cache:
   ```bash
   npm run start:clear
   ```
3. Scan the QR code again.

If it still fails, uninstall Expo Go, reinstall the latest version, and try again. You can also use an Android emulator: `npm run android`.

### `npm install` fails
- Ensure Node.js v18+ is installed: `node -v`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### App won't load on phone
- Phone and computer must be on the **same Wi-Fi network**
- Try switching Expo connection mode to **Tunnel** (press `s` in terminal → choose tunnel)

### Metro bundler / cache issues
```bash
npm run start:clear
```

### `Unknown command: "expo"` when using `npm expo start`
Use one of these instead (do **not** type `npm expo`):
```bash
npm start
npm run start:clear
npx expo start --clear
```

### `babel-preset-expo` not found
```bash
npx expo install babel-preset-expo
```

### Audio not playing
- Check device volume and that you are not in silent mode (iOS)
- Not every word has audio — the speaker icon is hidden when unavailable

### Word not found
- Verify spelling and try a common English word
- The API only supports **English** words

### Web console warnings
If you run the app in a browser (`npm run web`), you may see:

| Warning | Meaning | Action |
|---------|---------|--------|
| `shadow* style props are deprecated` | Fixed in `theme.js` for web | Safe to ignore if already updated |
| `props.pointerEvents is deprecated` | Comes from React Navigation | Harmless — ignore |
These are **warnings only**. The app still runs. For the full mobile experience, use Android/iOS (Expo Go or emulator).

---

## Tech Stack

- React Native 0.81 · Expo SDK 54
- React Navigation (Drawer + Native Stack)
- Axios · Expo Audio · React Context API

---

## License

See [LICENSE](LICENSE) for details.
