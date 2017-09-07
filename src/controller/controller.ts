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
        isOpen: station.IsOpen,
        bikeStands: station.BikeStands,
        availableBikes: station.AvailableBikes,
        availableBikeStands: station.AvailableBikeStands,
        lastUpdate: station.LastUpdate
      }

      // Add the new station to the list.
      stations.push(newStation);
    }

    return stations;
  }

}
