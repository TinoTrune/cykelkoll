export interface Station {
  id?: string;
  name?: string;
  lat?: number;
  lng?: number;
  distance?: number;
  isOpen?: boolean;
  bikeStands?: number;
  availableBikes?: number | string;
  availableBikeStands?: number | string;
  lastUpdate?: string;

  bike_icon?: string;
  bikestand_icon?: string;
}
