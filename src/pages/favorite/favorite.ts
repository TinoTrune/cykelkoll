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

  stationListItems: any;

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
          name: station.name,
          availableBikes: station.availableBikes,
          availableBikeStands: station.availableBikeStands
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

  removeFavorite(item) {

  }

}
