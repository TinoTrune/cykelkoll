export interface Station {
  id?: string;
  name?: string;
  lat?: number;
  lng?: number;
  isOpen?: boolean;
  bikeStands?: number;
  availableBikes?: number;
  availableBikeStands?: number;
  lastUpdate?: string;
}
