# GateSafe — Automated Testing & Live Demo Walkthrough Guide

## 1. Prerequisites & Installation
1. Extract the project folder and navigate into it:
   ```bash
   unzip gatesafe-rfid-community-safety-v3.zip
   cd gatesafe-rfid-community-safety
   npm install
   ```

## 2. Running Automated API & Security Engine Tests
Run the included Vitest + Supertest suite (`tests/gatesafe.test.ts`) to verify all core RFID tracking, anti-theft, perimeter exit, inactivity guard, and RSSI de-duplication rules:
```bash
npm run demo:test
```
**Expected Output:**
* `1. Health & Initial Seed State Verification` — PASS
* `2. Normal Amenity Movement Tracking (Child enters Children Play Area)` — PASS
* `3. Anti-Theft Trigger: Society Asset detected at Main Gate` — PASS
* `4. Perimeter Exit Alert: Child detected near Main Gate` — PASS
* `5. Inactivity Guard (>20 minutes stationary) & Security Admin Alert Clearance` — PASS
* `6. RSSI Conflict Resolution (De-duplication when 2 readers ping within 2s)` — PASS

## 3. Running the Full-Stack Application for Live Demo
### Option A: Development Mode (Two Terminals)
* **Terminal 1 (Express RFID Gateway Server on Port 8080):**
  ```bash
  npm run dev
  ```
* **Terminal 2 (Vite React UI on Port 5173):**
  ```bash
  npx vite
  ```
  Open `http://localhost:5173` in your browser.

### Option B: Single-Container Production Mode (Cloud Run Equivalent)
```bash
npm run build
npm start
```
Open `http://localhost:8080` in your browser.

## 4. 5-Minute Live Stakeholder Demo Script
1. **Live Monitoring Overview (`Live Monitoring` tab):**
   * Point out the 4 KPI cards (`Kids Monitored`, `Protected Society Assets`, `Active Security Alerts`, `RFID Gateway Nodes`).
   * Highlight **Rohan Varma (`TAG-K103`)** in the Central Amphitheatre showing an active pulsing **Inactivity Alert (>20m)**.
   * Click **Verify & Clear** on Rohan Varma's row to demonstrate Security Admin resolution.
2. **Anti-Theft Asset Trigger (`Hardware Sim` button):**
   * Click **Hardware Sim** in the bottom-left sidebar.
   * Click the one-click preset **Simulate Asset Theft (Treadmill -> Main Gate)**.
   * Observe the dashboard immediately flag `Commercial Treadmill #02` with **Unauthorized Movement** and log an `ANTI-THEFT ALARM` in the right-hand **Movement Feed**.
3. **Resident Mobile Experience (`Parent App View` tab):**
   * Switch to **Parent App View** and toggle between `Flat A-402`, `Flat B-1104`, and `Flat C-205` to demonstrate real-time child location cards, wristband battery levels, and push notification timelines.
4. **Commercial Unit Economics (`Business Case` tab):**
   * Review the Small (100–200 flats, $4,050 CAPEX) vs. Large (1000–1500 flats, $23,950 CAPEX) tables, 85% success verdict, and $4,500/mo SaaS + 15% AMC revenue models.
