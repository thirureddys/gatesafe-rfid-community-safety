export type EntityCategory = 'KID' | 'ASSET';

export type SecurityStatus = 'SECURE' | 'INACTIVITY_ALERT' | 'UNAUTHORIZED_MOVEMENT';

export interface Zone {
  id: string;
  name: string;
  readerId: string;
  type: 'AMENITY' | 'PERIMETER' | 'RESIDENTIAL';
  isRestrictedForAssets?: boolean;
  isExitGate?: boolean;
}

export interface TrackedEntity {
  tagId: string;
  name: string;
  category: EntityCategory;
  ownerOrLocation: string;
  flatNumber?: string;
  currentZoneId: string;
  currentZoneName: string;
  lastSeenAt: string;
  rssi: number;
  status: SecurityStatus;
  batteryLevel: number;
}

export interface MovementEvent {
  id: string;
  timestamp: string;
  tagId: string;
  entityName: string;
  category: EntityCategory;
  fromZone: string;
  toZone: string;
  readerId: string;
  rssi: number;
  alertTriggered: boolean;
  alertType?: 'THEFT_ALERT' | 'INACTIVITY_WARNING' | 'PERIMETER_EXIT';
  message: string;
}

export interface SystemState {
  entities: TrackedEntity[];
  zones: Zone[];
  events: MovementEvent[];
  inactivityLimitMinutes: number;
  serverTime: string;
}
