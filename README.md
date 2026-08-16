# KineticPlex Web

## Project Description
**KineticPlex Web** is the frontend Chrome Extension for the KineticPlex 3D Sign Language Translation platform. Built with **React**, **TypeScript**, and **Vite**, it provides a fast, modern interface that captures user text and communicates with the KineticPlex API to trigger 3D sign language animations.

The project utilizes `@crxjs/vite-plugin` to enable Hot Module Replacement (HMR) directly inside the Chrome Extension environment, providing a seamless developer experience.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
* **Node.js** (v18 or higher recommended)
* **Yarn** (or npm)
* **Google Chrome** browser

## Installation & Setup

### 1. Install Dependencies
Clone the repository and install the required packages using Yarn:

```bash
cd kinetic-plex-web
yarn install
```

### 2. Environment Variables
Create a `.env` file in the root directory of the project to define the Vite development server port.

```env
VITE_PORT=5000
```

## Development (Live Reload)

To start the development server with Hot Module Replacement (HMR):

```bash
yarn dev
```
> **Note:** This command does not open a browser window. Instead, it continuously builds the extension into a `dist/` folder that Chrome reads in real-time.

### How to load the extension into Google Chrome:
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** using the toggle switch in the top right corner.
3. Click the **Load unpacked** button in the top left corner.
4. Select the `dist/` folder located inside your `kinetic-plex-web` project directory.
5. The KineticPlex Web icon will appear in your browser toolbar. 

Any changes you make to the React components (`.tsx`) or styles will now automatically update in the extension without needing to reload it manually.

## Architecture & Permissions

### CORS and API Communication
This extension is configured to communicate with the KineticPlex backend API. The `manifest.json` file explicitly grants host permissions to allow cross-origin requests:
* `http://localhost:5001/*` (KineticPlex Backend API)
* `http://localhost:5000/*` (Vite HMR Server)

### Background Service Worker
The extension utilizes a background service worker (`src/background.ts`) to comply with Manifest V3 security policies and ensure Vite's development scripts are correctly authorized by the browser.

## Production Build

To build the extension for production (e.g., to publish on the Chrome Web Store):

```bash
yarn build
```
This will generate a highly optimized and minified `dist/` folder that you can pack and distribute.