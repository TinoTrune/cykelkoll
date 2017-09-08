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

      // Model initiation.
      var newStation: Station = {
        id: station.StationId,
        name: station.Name,
        lat: station.Lat,
        lng: station.Long,
        distance: 0,
        isOpen: station.IsOpen,
        bikeStands: station.BikeStands,
        availableBikes: station.AvailableBikes,
        availableBikeStands: station.AvailableBikeStands,
        lastUpdate: station.LastUpdate,

        // This icon is for Google Maps Marker.
        icon: this.getIcon(station.AvailableBikes)
      }

      // Add the new station to the list.
      stations.push(newStation);
    }

    return stations;
  }

  // Set the icon depending on the amount of available bikes.
  getIcon(amount: number): string {
    let iconUrl = "";

    if(amount < 9) {
      iconUrl = 'http://icons.iconarchive.com/icons/iconarchive/red-orb-alphabet/48/Number-' + amount.toString() + '-icon.png';
    } else {
      iconUrl = 'http://icons.iconarchive.com/icons/iconarchive/red-orb-alphabet/48/Number-9-icon.png';
    }

    return iconUrl;
  }

}
