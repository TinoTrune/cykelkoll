import { Component} from '@angular/core';
import { NavController, NavParams, Events} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { Controller } from '../../controller/controller';
import { StationDetailPage } from '../station-detail/station-detail';

/**
 * Generated class for the FavoritePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  stations: any;
  favoriteStations: any;

  stationListItems = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public nativeStorge: NativeStorage, private controller: Controller) {
    this.setStations();

    this.events.subscribe('reloadFavoritePage', () => {
      this.setStations();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritePage');
  }

  async setStations() {
    this.stations = await this.controller.getStations();

    try {
      this.favoriteStations = await this.nativeStorge.getItem('favorites');
    } catch (e) {
      console.log(e);
      return;
    }

    this.stationListItems = [];
    for(let favoriteStationId of this.favoriteStations) {
      let station = this.stations.find(item => item.id == favoriteStationId);

      if(station != null) {
        this.stationListItems.push({
          station: station,
          id: station.id,
          name: station.name,
          availableBikes: station.availableBikes,
          availableBikeStands: station.availableBikeStands,
          iconColor: this.getIconColor(station.availableBikes)
        });
      }
    }
  }

  stationClicked(item) {
    // Navigate to the detail page of a station.
    this.navCtrl.push(StationDetailPage, {
      station: item.station
    });
  }

  // Return the color depending on the number.
  // Low number should be red, medium number orange and high number green.
  getIconColor(amount: number) {
    if(amount > 9) {
      return "green";
    } else if (amount > 3) {
      return "orange";
    } else {
      return "red";
    }
  }

  async removeFavorite(item) {
    try {
      this.favoriteStations = await this.nativeStorge.getItem('favorites');
    } catch(e) {
      console.log(e);
    }

    if(this.favoriteStations == null) {
      return;
    } else {
      // See if the station id exists in favorites. If it's a positive index, it contains in the favorites.
      let index = this.favoriteStations.indexOf(item.id);
      let itemIndex = this.stationListItems.indexOf(item);

      if(index > -1) {
        this.favoriteStations.splice(index, 1);
      }
      if(itemIndex > -1) {
        this.stationListItems.splice(itemIndex, 1);
      }

      // Removed the station from the favorites and push it to the native storage.
      await this.nativeStorge.setItem('favorites', this.favoriteStations);
    }
  }

}
