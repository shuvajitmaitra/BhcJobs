# BhcJobs

A React Native mobile application built with Expo.

## Prerequisites

Make sure the following tools are installed before cloning the project:

| Tool | Version | Install |
|------|---------|---------|
| Node.js | >= 20.x | [nodejs.org](https://nodejs.org) or `nvm install 20` |
| Expo CLI | latest | `pnpm add -g expo-cli` |
| Git | any | [git-scm.com](https://git-scm.com) |

---

## Clone & Install

```bash
git clone https://github.com/shuvajitmaitra/BhcJobs.git
cd BhcJobs
pnpm install
```
---

## Environment Configuration

The API environment is controlled in [env.ts](env.ts). By default it points to production:

```ts
export const ENV: 'production' | 'local' = 'production';
```

To develop against a local backend, change `'production'` to `'local'` and make sure your local server is running on `http://localhost:5001`.

---

## Run the App

### Start the Expo dev server

```bash
pnpm start
```

Then press:
- `i` — open iOS Simulator
- `a` — open Android emulator / device
- `w` — open in browser (limited native feature support)

### Run directly on a platform

```bash
# iOS
pnpm ios

# Android
pnpm android
```

## Project Structure

```
BhcJobs/
├── src/
│   ├── components/     # Shared UI components
│   ├── helpers/        # Utility helpers
│   ├── hooks/          # Custom React hooks
│   ├── navigation/     # React Navigation setup
│   ├── redux/          # Redux Toolkit store & slices
│   ├── screens/        # Screen components
│   ├── services/       # API service layer (Axios)
│   ├── theme/          # Colors, typography, spacing
│   ├── types/          # TypeScript type definitions
│   └── utils/          # General utilities
├── assets/             # Images, fonts, icons
├── App.tsx             # App entry point
├── app.json            # Expo configuration
├── env.ts              # API environment config
├── tailwind.config.js  # NativeWind / Tailwind config
└── tsconfig.json       # TypeScript config
```


## Tech Stack

- **Framework:** React Native + Expo 54
- **Language:** TypeScript
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **State Management:** Redux Toolkit + Redux Persist
- **Navigation:** React Navigation v7
- **Forms:** React Hook Form + Zod
- **HTTP Client:** Axios
- **Package Manager:** pnpm
