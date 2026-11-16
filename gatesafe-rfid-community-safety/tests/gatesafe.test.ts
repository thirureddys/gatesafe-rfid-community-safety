import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../server.js';

describe('GateSafe RFID Community Safety & Asset Protection — E2E Demo & API Tests', () => {
  beforeEach(async () => {
    await request(app).post('/api/reset').expect(200);
  });

  it('1. Health & Initial Seed State Verification', async () => {
    const healthRes = await request(app).get('/api/health').expect(200);
    expect(healthRes.body.status).toBe('ok');

    const stateRes = await request(app).get('/api/state').expect(200);
    expect(stateRes.body.entities).toHaveLength(7);
    expect(stateRes.body.zones).toHaveLength(6);
    expect(stateRes.body.inactivityLimitMinutes).toBe(20);

    const rohan = stateRes.body.entities.find((e: { tagId: string }) => e.tagId === 'TAG-K103');
    expect(rohan.status).toBe('INACTIVITY_ALERT');
  });

  it('2. Normal Amenity Movement Tracking (Child enters Children Play Area)', async () => {
    const scanRes = await request(app)
      .post('/api/scan')
      .send({ tagId: 'TAG-K101', zoneId: 'Z-PLAY', rssi: -44 })
      .expect(200);

    expect(scanRes.body.success).toBe(true);
    expect(scanRes.body.eventMessage).toContain('Ananya Reddy moved from Swimming Pool to Children Play Area');

    const ananya = scanRes.body.state.entities.find((e: { tagId: string }) => e.tagId === 'TAG-K101');
    expect(ananya.currentZoneName).toBe('Children Play Area');
    expect(ananya.status).toBe('SECURE');
  });

  it('3. Anti-Theft Trigger: Society Asset detected at Main Gate', async () => {
    const scanRes = await request(app)
      .post('/api/scan')
      .send({ tagId: 'TAG-A501', zoneId: 'Z-GATE', rssi: -38 })
      .expect(200);

    expect(scanRes.body.eventMessage).toContain('ANTI-THEFT ALARM');
    const treadmill = scanRes.body.state.entities.find((e: { tagId: string }) => e.tagId === 'TAG-A501');
    expect(treadmill.status).toBe('UNAUTHORIZED_MOVEMENT');
    expect(scanRes.body.state.events[0].alertType).toBe('THEFT_ALERT');
  });

  it('4. Perimeter Exit Alert: Child detected near Main Gate', async () => {
    const scanRes = await request(app)
      .post('/api/scan')
      .send({ tagId: 'TAG-K102', zoneId: 'Z-GATE', rssi: -40 })
      .expect(200);

    expect(scanRes.body.eventMessage).toContain('PERIMETER ALERT');
    const aarav = scanRes.body.state.entities.find((e: { tagId: string }) => e.tagId === 'TAG-K102');
    expect(aarav.status).toBe('UNAUTHORIZED_MOVEMENT');
    expect(scanRes.body.state.events[0].alertType).toBe('PERIMETER_EXIT');
  });

  it('5. Inactivity Guard (>20 minutes stationary) & Security Admin Alert Clearance', async () => {
    const scanRes = await request(app)
      .post('/api/scan')
      .send({ tagId: 'TAG-K104', zoneId: 'Z-POOL', rssi: -48, simulateInactiveMinutes: 25 })
      .expect(200);

    const diya = scanRes.body.state.entities.find((e: { tagId: string }) => e.tagId === 'TAG-K104');
    expect(diya.status).toBe('INACTIVITY_ALERT');

    const ackRes = await request(app).post('/api/acknowledge/TAG-K104').expect(200);
    const clearedDiya = ackRes.body.entities.find((e: { tagId: string }) => e.tagId === 'TAG-K104');
    expect(clearedDiya.status).toBe('SECURE');
  });

  it('6. RSSI Conflict Resolution (De-duplication when 2 readers ping within 2s)', async () => {
    await request(app)
      .post('/api/scan')
      .send({ tagId: 'TAG-K101', zoneId: 'Z-POOL', rssi: -40 })
      .expect(200);

    const dupRes = await request(app)
      .post('/api/scan')
      .send({ tagId: 'TAG-K101', zoneId: 'Z-PLAY', rssi: -78 })
      .expect(200);

    expect(dupRes.body.deduplicated).toBe(true);
    const ananya = dupRes.body.state.entities.find((e: { tagId: string }) => e.tagId === 'TAG-K101');
    expect(ananya.currentZoneName).toBe('Swimming Pool');
  });
});
