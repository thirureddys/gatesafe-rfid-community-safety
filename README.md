# GateSafe: RFID Community Safety & Asset Protection

GateSafe is a React and Express demo for community RFID monitoring, child safety alerts, asset protection, and RFID scan simulation.

## Run locally from the repository root

```bash
npm install
npm run dev
```

The API runs on port 8080. In a second terminal, start the Vite UI:

```bash
npm --prefix gatesafe-rfid-community-safety run dev:ui
```

Open <http://localhost:5173>.

## Build and run

```bash
npm run build
npm start
```

The application is served on port 8080. `PORT` and `INACTIVITY_LIMIT_MINUTES` can be set through environment variables. The root Dockerfile builds and runs the app as a single container:

```bash
docker build -t gatesafe .
docker run --rm -p 8080:8080 gatesafe
```

## Tests

```bash
npm test
npm run typecheck
```

## Project layout

The existing application source is currently retained in `gatesafe-rfid-community-safety/`. Root-level npm scripts and the Dockerfile make installation, development, build, and container deployment available from the repository root. The application implementation and seed data are unchanged.
