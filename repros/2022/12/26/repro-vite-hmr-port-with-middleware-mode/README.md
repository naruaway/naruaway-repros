# Repro for Vite HMR port issue

This is a repro for https://github.com/vitejs/vite/pull/11487

Please use Node.js v18

```sh
npm ci
npm start
```

Then open the URL from the terminal output in browser.
You see that HMR WebSocket connection is failing
