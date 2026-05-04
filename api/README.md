# Simple Key-Value API

This is a very simple key-value store built with Rust.

The API depends on Redis. By default, the API connects to `localhost:6379`.
You can change the host/port of the Redis server by setting the `REDIS_HOST`
environment variable.

# Endpoints

- `GET /health`
  - Returns health status:
  - `200` with `{ "status": "ok" }`

- `POST /`
  - Request JSON:
    - `{ "key": "...", "value": "..." }`
  - Behavior:
    - Uses Redis `SETNX` (create only if key does not already exist)
  - Responses:
    - `201` with `{ "key": "...", "value": "...", "created": true }`
    - `409` with `{ "key": "...", "value": "...", "created": false }` when key already exists
    - `400` with `{ "error": "..." }` for invalid input
    - `500` with `{ "error": "..." }` for internal/Redis errors

- `GET /{key}`
  - Responses:
    - `200` with `{ "key": "...", "value": "..." }`
    - `404` with empty body if key is not found
    - `400` with `{ "error": "..." }` for invalid key
    - `500` with `{ "error": "..." }` for internal/Redis errors

# Run

To run the app, get `rustup` and install Rust stable. That will give you a full
Rust toolchain, including Cargo.

With that done, fire it up:

`cargo run`

# Build

`cargo build --release`

The executable API binary will be in `build/release/api`.
