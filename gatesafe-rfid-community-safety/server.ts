import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { MovementEvent, SecurityStatus, SystemState, TrackedEntity, Zone } from './src/types.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const PORT = Number(process.env.PORT) || 8080;
const INACTIVITY_LIMIT_MINUTES = Number(process.env.INACTIVITY_LIMIT_MINUTES) || 20;

app.use(cors());
app.use(express.json());

export const INITIAL_ZONES: Zone[] = [
  { id: 'Z-GATE', name: 'Main Gate', readerId: 'RDR-001-UHF', type: 'PERIMETER', isRestrictedForAssets: true, isExitGate: true },
  { id: 'Z-POOL', name: 'Swimming Pool', readerId: 'RDR-882-HF', type: 'AMENITY' },
  { id: 'Z-PLAY', name: 'Children Play Area', readerId: 'RDR-104-HF', type: 'AMENITY' },
  { id: 'Z-GYM', name: 'Clubhouse Gym', readerId: 'RDR-205-LF', type: 'AMENITY' },
  { id: 'Z-TOWER-A', name: 'Tower A Lobby', readerId: 'RDR-301-HF', type: 'RESIDENTIAL' },
  { id: 'Z-PARK', name: 'Central Amphitheatre', readerId: 'RDR-402-UHF', type: 'AMENITY' },
];

export function createInitialEntities(): TrackedEntity[] {
  const now = Date.now();
  return [
    {
      tagId: 'TAG-K101',
      name: 'Ananya Reddy',
      category: 'KID',
      ownerOrLocation: 'Flat A-402 (Parent: Rajesh Reddy)',
      flatNumber: 'A-402',
      currentZoneId: 'Z-POOL',
      currentZoneName: 'Swimming Pool',
      lastSeenAt: new Date(now - 2 * 60 * 1000).toISOString(),
      rssi: -46,
      status: 'SECURE',
      batteryLevel: 92,
    },
    {
      tagId: 'TAG-K102',
      name: 'Aarav Sharma',
      category: 'KID',
      ownerOrLocation: 'Flat B-1104 (Parent: Sneha Sharma)',
      flatNumber: 'B-1104',
      currentZoneId: 'Z-PLAY',
      currentZoneName: 'Children Play Area',
      lastSeenAt: new Date(now - 4 * 60 * 1000).toISOString(),
      rssi: -51,
      status: 'SECURE',
      batteryLevel: 88,
    },
    {
      tagId: 'TAG-K103',
      name: 'Rohan Varma',
      category: 'KID',
      ownerOrLocation: 'Flat C-205 (Parent: Karthik Varma)',
      flatNumber: 'C-205',
      currentZoneId: 'Z-PARK',
      currentZoneName: 'Central Amphitheatre',
      lastSeenAt: new Date(now - 23 * 60 * 1000).toISOString(),
      rssi: -62,
      status: 'INACTIVITY_ALERT',
      batteryLevel: 76,
    },
    {
      tagId: 'TAG-K104',
      name: 'Diya Nair',
      category: 'KID',
      ownerOrLocation: 'Flat A-402 (Parent: Rajesh Reddy)',
      flatNumber: 'A-402',
      currentZoneId: 'Z-TOWER-A',
      currentZoneName: 'Tower A Lobby',
      lastSeenAt: new Date(now - 1 * 60 * 1000).toISOString(),
      rssi: -41,
      status: 'SECURE',
      batteryLevel: 95,
    },
    {
      tagId: 'TAG-A501',
      name: 'Commercial Treadmill #02',
      category: 'ASSET',
      ownerOrLocation: 'Clubhouse Gym Asset',
      currentZoneId: 'Z-GYM',
      currentZoneName: 'Clubhouse Gym',
      lastSeenAt: new Date(now - 6 * 60 * 1000).toISOString(),
      rssi: -39,
      status: 'SECURE',
      batteryLevel: 99,
    },
    {
      tagId: 'TAG-A502',
      name: 'Society Lawn Mower Pro',
      category: 'ASSET',
      ownerOrLocation: 'Facility Maintenance Store',
      currentZoneId: 'Z-PARK',
      currentZoneName: 'Central Amphitheatre',
      lastSeenAt: new Date(now - 9 * 60 * 1000).toISOString(),
      rssi: -54,
      status: 'SECURE',
      batteryLevel: 84,
    },
    {
      tagId: 'TAG-A503',
      name: 'Clubhouse 65" Smart TV',
      category: 'ASSET',
      ownerOrLocation: 'Clubhouse Lounge',
      currentZoneId: 'Z-GYM',
      currentZoneName: 'Clubhouse Gym',
      lastSeenAt: new Date(now - 12 * 60 * 1000).toISOString(),
      rssi: -43,
      status: 'SECURE',
      batteryLevel: 97,
    },
  ];
}

export function createInitialEvents(): MovementEvent[] {
  const now = Date.now();
  return [
    {
      id: 'EVT-1004',
      timestamp: new Date(now - 1 * 60 * 1000).toISOString(),
      tagId: 'TAG-K104',
      entityName: 'Diya Nair',
      category: 'KID',
      fromZone: 'Children Play Area',
      toZone: 'Tower A Lobby',
      readerId: 'RDR-301-HF',
      rssi: -41,
      alertTriggered: false,
      message: 'Diya Nair entered Tower A Lobby',
    },
    {
      id: 'EVT-1003',
      timestamp: new Date(now - 2 * 60 * 1000).toISOString(),
      tagId: 'TAG-K101',
      entityName: 'Ananya Reddy',
      category: 'KID',
      fromZone: 'Tower A Lobby',
      toZone: 'Swimming Pool',
      readerId: 'RDR-882-HF',
      rssi: -46,
      alertTriggered: false,
      message: 'Ananya Reddy entered Swimming Pool',
    },
    {
      id: 'EVT-1002',
      timestamp: new Date(now - 4 * 60 * 1000).toISOString(),
      tagId: 'TAG-K102',
      entityName: 'Aarav Sharma',
      category: 'KID',
      fromZone: 'Central Amphitheatre',
      toZone: 'Children Play Area',
      readerId: 'RDR-104-HF',
      rssi: -51,
      alertTriggered: false,
      message: 'Aarav Sharma entered Children Play Area',
    },
    {
      id: 'EVT-1001',
      timestamp: new Date(now - 23 * 60 * 1000).toISOString(),
      tagId: 'TAG-K103',
      entityName: 'Rohan Varma',
      category: 'KID',
      fromZone: 'Tower A Lobby',
      toZone: 'Central Amphitheatre',
      readerId: 'RDR-402-UHF',
      rssi: -62,
      alertTriggered: true,
      alertType: 'INACTIVITY_WARNING',
      message: 'Inactivity Alert: Rohan Varma stationary at Central Amphitheatre > 20 mins',
    },
  ];
}

let entities: TrackedEntity[] = createInitialEntities();
let events: MovementEvent[] = createInitialEvents();

const recentReadings = new Map<string, { zoneId: string; rssi: number; ts: number }>();

function evaluateInactivityStatuses() {
  const now = Date.now();
  const limitMs = INACTIVITY_LIMIT_MINUTES * 60 * 1000;

  entities = entities.map((entity) => {
    if (entity.status === 'UNAUTHORIZED_MOVEMENT') return entity;
    const elapsed = now - new Date(entity.lastSeenAt).getTime();
    if (entity.category === 'KID' && elapsed >= limitMs) {
      return { ...entity, status: 'INACTIVITY_ALERT' };
    }
    return entity;
  });
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'gatesafe-rfid-community-safety', timestamp: new Date().toISOString() });
});

app.get('/api/state', (_req, res) => {
  evaluateInactivityStatuses();
  const state: SystemState = {
    entities,
    zones: INITIAL_ZONES,
    events,
    inactivityLimitMinutes: INACTIVITY_LIMIT_MINUTES,
    serverTime: new Date().toISOString(),
  };
  res.json(state);
});

app.post('/api/scan', (req, res) => {
  const { tagId, zoneId, rssi = -45, simulateInactiveMinutes } = req.body as {
    tagId?: string;
    zoneId?: string;
    rssi?: number;
    simulateInactiveMinutes?: number;
  };

  if (!tagId || !zoneId) {
    return res.status(400).json({ error: 'tagId and zoneId are required' });
  }

  const entityIndex = entities.findIndex((e) => e.tagId === tagId);
  const targetZone = INITIAL_ZONES.find((z) => z.id === zoneId);

  if (entityIndex === -1 || !targetZone) {
    return res.status(404).json({ error: 'Invalid tagId or zoneId' });
  }

  const now = Date.now();
  const prevRead = recentReadings.get(tagId);
  if (prevRead && now - prevRead.ts < 2000 && prevRead.zoneId !== zoneId && prevRead.rssi > rssi) {
    return res.status(200).json({
      success: true,
      deduplicated: true,
      eventMessage: `Ignored weaker RSSI (${rssi} dBm) in favor of stronger reader (${prevRead.rssi} dBm)`,
      state: {
        entities,
        zones: INITIAL_ZONES,
        events,
        inactivityLimitMinutes: INACTIVITY_LIMIT_MINUTES,
        serverTime: new Date().toISOString(),
      },
    });
  }
  recentReadings.set(tagId, { zoneId, rssi, ts: now });

  const entity = entities[entityIndex];
  const fromZone = entity.currentZoneName;

  let newStatus: SecurityStatus = 'SECURE';
  let alertTriggered = false;
  let alertType: MovementEvent['alertType'] | undefined;
  let message = `${entity.name} moved from ${fromZone} to ${targetZone.name}`;

  if (simulateInactiveMinutes && simulateInactiveMinutes >= INACTIVITY_LIMIT_MINUTES) {
    newStatus = 'INACTIVITY_ALERT';
    alertTriggered = true;
    alertType = 'INACTIVITY_WARNING';
    message = `SAFETY CHECK: ${entity.name} stationary at ${targetZone.name} for ${simulateInactiveMinutes} mins`;
  } else if (entity.category === 'ASSET' && targetZone.isRestrictedForAssets) {
    newStatus = 'UNAUTHORIZED_MOVEMENT';
    alertTriggered = true;
    alertType = 'THEFT_ALERT';
    message = `ANTI-THEFT ALARM: Society asset "${entity.name}" detected at ${targetZone.name}!`;
  } else if (entity.category === 'KID' && targetZone.isExitGate) {
    newStatus = 'UNAUTHORIZED_MOVEMENT';
    alertTriggered = true;
    alertType = 'PERIMETER_EXIT';
    message = `PERIMETER ALERT: Child "${entity.name}" detected near ${targetZone.name}!`;
  }

  const timestampIso = simulateInactiveMinutes
    ? new Date(now - simulateInactiveMinutes * 60 * 1000).toISOString()
    : new Date(now).toISOString();

  const updatedEntity: TrackedEntity = {
    ...entity,
    currentZoneId: targetZone.id,
    currentZoneName: targetZone.name,
    lastSeenAt: timestampIso,
    rssi,
    status: newStatus,
  };

  entities[entityIndex] = updatedEntity;

  const newEvent: MovementEvent = {
    id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date(now).toISOString(),
    tagId: entity.tagId,
    entityName: entity.name,
    category: entity.category,
    fromZone,
    toZone: targetZone.name,
    readerId: targetZone.readerId,
    rssi,
    alertTriggered,
    alertType,
    message,
  };

  events = [newEvent, ...events].slice(0, 50);

  return res.json({
    success: true,
    eventMessage: message,
    state: {
      entities,
      zones: INITIAL_ZONES,
      events,
      inactivityLimitMinutes: INACTIVITY_LIMIT_MINUTES,
      serverTime: new Date().toISOString(),
    },
  });
});

app.post('/api/acknowledge/:tagId', (req, res) => {
  const { tagId } = req.params;
  const idx = entities.findIndex((e) => e.tagId === tagId);
  if (idx === -1) {
    return res.status(404).json({ error: 'Tag not found' });
  }

  const entity = entities[idx];
  const safeZone = entity.category === 'ASSET' ? INITIAL_ZONES[3] : INITIAL_ZONES[4];
  entities[idx] = {
    ...entity,
    currentZoneId: safeZone.id,
    currentZoneName: safeZone.name,
    lastSeenAt: new Date().toISOString(),
    status: 'SECURE',
  };

  events = [
    {
      id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      tagId: entity.tagId,
      entityName: entity.name,
      category: entity.category,
      fromZone: entity.currentZoneName,
      toZone: safeZone.name,
      readerId: safeZone.readerId,
      rssi: -42,
      alertTriggered: false,
      message: `Alert cleared by Security Admin: ${entity.name} verified at ${safeZone.name}`,
    },
    ...events,
  ].slice(0, 50);

  res.json({
    entities,
    zones: INITIAL_ZONES,
    events,
    inactivityLimitMinutes: INACTIVITY_LIMIT_MINUTES,
    serverTime: new Date().toISOString(),
  });
});

app.post('/api/reset', (_req, res) => {
  entities = createInitialEntities();
  events = createInitialEvents();
  recentReadings.clear();
  res.json({
    entities,
    zones: INITIAL_ZONES,
    events,
    inactivityLimitMinutes: INACTIVITY_LIMIT_MINUTES,
    serverTime: new Date().toISOString(),
  });
});

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectExecution) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[GateSafe Server] Running on http://0.0.0.0:${PORT} (mode: ${process.env.NODE_ENV || 'development'})`);
  });
}
