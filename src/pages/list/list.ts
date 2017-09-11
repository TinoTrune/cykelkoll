import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { Controller } from '../../controller/controller';
import { StationDetailPage } from '../station-detail/station-detail';

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  stations: any;
  stationListItems = [];

  // The sort type that the list is going to have.
  sortType: any;

  // The current location of the user/device.
  location: {latitude: number, longitude: number};

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private controller: Controller) {
    this.sortType = "distance_descending";
    this.location = {latitude: 0, longitude: 0};

    this.setLocation();
  }

  // Get the location of the device and then use the location to to get all the stations
  // with a distance between the location of the device and stations.
  async setLocation() {
    var options = {
      enableHighAccuracy: true
    };

    await this.geolocation.getCurrentPosition(options).then((resp) => {
      this.location.latitude = resp.coords.latitude;
      this.location.longitude = resp.coords.longitude;

      this.setStations();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  async setStations() {
    this.stations = await this.controller.getStationsWithDistance(this.location.latitude.toString(), this.location.longitude.toString());

    this.stationListItems = [];
    for(let station of this.stations) {
      this.stationListItems.push({
        station: station,
        id: station.id,
        name: station.name,
        distance: station.distance,
        availableBikes: station.availableBikes,
        availableBikeStands: station.availableBikeStands
      });
    }

    this.sortList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  stationClicked(item) {
    // Navigate to the detail page of a station.
    this.navCtrl.push(StationDetailPage, {
      station: item.station
    });
  }

  // Refresh the page. The spinner will stop spin when the page is refreshed.
  async doRefresh(refresher) {
    await this.setLocation();
    refresher.complete();
  }

  // Sort the list to the different types of sorts.
  sortList() {
    switch(this.sortType) {
      case 'distance_descending' : {
        this.stationListItems.sort(function(a, b) {
          return a.distance - b.distance;
        });
        break;
      }
      case 'distance_ascending' : {
        this.stationListItems.sort(function(a, b) {
          return b.distance - a.distance;
        });
        break;
      }
      case 'bike_descending' : {
        this.stationListItems.sort(function(a, b) {
          return a.availableBikes - b.availableBikes;
        });
        break;
      }
      case 'bike_ascending' : {
        this.stationListItems.sort(function(a, b) {
          return b.availableBikes - a.availableBikes;
        });
        break;
      }
      case 'bikestall_descending' : {
        this.stationListItems.sort(function(a, b) {
          return a.availableBikeStands - b.availableBikeStands;
        });
        break;
      }
      case 'bikestall_ascending' : {
        this.stationListItems.sort(function(a, b) {
          return b.availableBikeStands - a.availableBikeStands;
        });
        break;
      }
    }
  }

}
