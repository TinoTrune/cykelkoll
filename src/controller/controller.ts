import { Injectable } from '@angular/core';
import { Station } from '../model/station';
import { Provider } from './provider';

// This controller handels the communication between the pages and the model.
@Injectable()
export class Controller {

  constructor(public provider: Provider) {

  }

  // Get all the stations from the API.
  // Returns a list of the stations.
  async getStations() {
    // Asynchronous call.
    let result = await this.provider.getStations();

    let stations = [];
    for(let station of result.json()) {

      // Add the new station to the list.
      stations.push(this.newStation(station));
    }

    return stations;
  }

  // Get all the stations from the API with a lat and lng given rotation to calculate the distance.
  // Returns a list of the stations with a distance of given lat and lng.
  async getStationsWithDistance(lat: String, lng: String) {
    // Asynchronous call.
    let result = await this.provider.getStationWithDistance(lat, lng);

    let stations = [];
    for(let station of result.json()) {

      // Add the new station to the list.
      stations.push(this.newStation(station));
    }

    return stations;
  }

  // Creates a new model from Json object result.
  newStation(station: any) {
    // If the there are no distance, give it the default value of 0.
    let distance = 0;
    if(station.Distance != null) {
      distance = station.Distance;
    }

    var newStation: Station = {
      id: station.StationId,
      name: station.Name,
      lat: station.Lat,
      lng: station.Long,
      distance: distance,
      isOpen: station.IsOpen,
      bikeStands: station.BikeStands,
      availableBikes: station.AvailableBikes,
      availableBikeStands: station.AvailableBikeStands,
      lastUpdate: station.LastUpdate,

      // This icon is for Google Maps Marker.
      icon: this.getIcon(station.AvailableBikes)
    }

    return newStation;
  }

  // Set the icon depending on the amount of available bikes.
  getIcon(amount: number): string {
    let icon = "";
    if(amount == null) {
      icon = 'www/assets/marker/symbol_inter.png';
    } else {
      icon = 'www/assets/marker/number_' + amount.toString() +'.png';
    }

    return icon;
  }

}
