# DevMood

A developer mood tracker with gamification, analytics, and daily motivational messages. Built with React Native and Expo.

---

## Features

- **Mood Check-in** — Track your daily developer mood across 5 states: Tired, Relaxed, Focused, Stressed, Happy
- **Gamification** — Earn points, build streaks, level up from Beginner Dev to Senior Dev
- **Achievements** — Unlock badges as you hit milestones (First Step, Focus Master, 100 Club, etc.)
- **Analytics** — Insights on your most frequent mood, focus rate, and weekly patterns
- **Mood History** — Full log of every check-in with timestamps and points earned
- **Smart Suggestions** — Context-aware productivity tips based on your current mood
- **Daily Motivation** — A fresh developer quote every day
- **Persistent Storage** — All data saved locally via AsyncStorage, no backend required

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) ~54 |
| Navigation | [Expo Router](https://expo.github.io/router) ~6 |
| Language | TypeScript |
| State | React Context + AsyncStorage |
| UI | React Native + StyleSheet |
| Icons | @expo/vector-icons (Feather) |
| Fonts | Inter (Google Fonts via expo-google-fonts) |
| Build | EAS Build |

---

## Project Structure

```
devmood/
├── app/
│   ├── _layout.tsx          # Root layout — providers, fonts, splash screen
│   └── (tabs)/
│       ├── _layout.tsx      # Tab bar configuration (Home + History)
│       ├── index.tsx        # Home screen
│       └── history.tsx      # History screen
├── components/
│   ├── MoodButton.tsx       # Animated mood selector button
│   ├── MoodHeroCard.tsx     # Selected mood display card
│   ├── StatCard.tsx         # Points / Level / Streak mini card
│   ├── InsightCard.tsx      # Analytics insight grid
│   ├── DailyMessageCard.tsx # Motivational quote card
│   ├── SuggestionCard.tsx   # Mood-based productivity tip
│   ├── HistoryItem.tsx      # Single history entry row
│   ├── AchievementCard.tsx  # Achievement badge card
│   ├── AchievementModal.tsx # Unlock celebration modal
│   ├── ErrorBoundary.tsx    # App-level error boundary
│   └── ErrorFallback.tsx    # Error UI fallback
├── context/
│   └── AppContext.tsx        # Global state (moods, points, streak, achievements)
├── constants/
│   └── colors.ts            # Design tokens (purple theme)
├── data/
│   ├── moods.ts             # Mood definitions (5 moods)
│   └── messages.ts          # Daily motivational messages
├── utils/
│   ├── gamification.ts      # Points, levels, achievement logic
│   ├── storage.ts           # AsyncStorage helpers
│   ├── analytics.ts         # Mood analytics computation
│   └── dateHelpers.ts       # Date formatting utilities
├── hooks/
│   └── useColors.ts         # Color scheme hook
├── assets/
│   └── images/
│       ├── icon.png         # App icon
│       └── splash.png       # Splash screen image
├── app.json                 # Expo configuration
├── eas.json                 # EAS Build configuration
├── babel.config.js          # Babel configuration
└── tsconfig.json            # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- [npm](https://npmjs.com) or [yarn](https://yarnpkg.com)
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)
- [Expo Go](https://expo.dev/go) app on your phone (for quick testing)

### Install

```bash
cd devmood
npm install
```

### Run the app

```bash
# Start Expo dev server (scan QR with Expo Go)
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator (macOS only)
npm run ios

# Run in browser
npm run web
```

---

## Building an APK (Android)

### Prerequisites

- [EAS CLI](https://docs.expo.dev/eas/cli/)
- Expo account (free) — sign up at [expo.dev](https://expo.dev)

### Steps

```bash
# 1. Install EAS CLI globally
npm install -g eas-cli

# 2. Log in to your Expo account
eas login

# 3. Configure the project (first time only)
eas build:configure

# 4. Build a preview APK (internal distribution)
eas build --platform android --profile preview

# 5. Download the APK from the link provided after the build completes
```

> The `preview` profile in `eas.json` produces a `.apk` file ready to install on any Android device.  
> The `production` profile produces an `.aab` (Android App Bundle) for Google Play submission.

---

## Customisation

### Change the color theme

Edit `constants/colors.ts` — the primary purple is `#7C6FF7`.

### Add more moods

Edit `data/moods.ts` — add a new object to the `MOODS` array following the same shape.

### Add more achievements

Edit `utils/gamification.ts` — add to `ACHIEVEMENT_DEFS` and add the unlock condition in `checkNewAchievements`.

### Change daily quotes

Edit `data/messages.ts` — add strings to the `DAILY_MESSAGES` array.

---

## Bundle Identifier

- **Android package**: `com.safiye.devmood`
- **iOS bundle ID**: `com.safiye.devmood`

To change these, update `app.json` under `ios.bundleIdentifier` and `android.package`.

---

## License

MIT
