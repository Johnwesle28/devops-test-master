# Simple Key-Value browser app

This is a very simple (and bad!) key-value store app. It integrates with our
simple key-value API.

## Run

`npm run start`

## Build

Edit `src/config.json` to set the URL of the API, then build!

`npm run build`

The built HTML and Javascript artifacts will be in the `build/` directory.

## Notes on behavior

- The app expects `src/config.json` to include:
  - `{ "apiUrl": "http://<api-host>:8080" }`
- On create (`POST /`):
  - Shows success message if key/value is stored
  - Shows duplicate-key message if API returns `409`
- On fetch (`GET /{key}`):
  - Shows fetched value when found
  - Shows "Key not found" on `404`
- The app now shows loading and error messages for better UX.
