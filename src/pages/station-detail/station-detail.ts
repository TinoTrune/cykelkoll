import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { Controller } from '../../controller/controller';

/**
 * Generated class for the StationDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-station-detail',
  templateUrl: 'station-detail.html',
})
export class StationDetailPage {

  station: any;
  stationImage: any;
  stationAvailability: any;

  // Boolean for if it's already a favorite or not.
  isFavorite: any;

  // This is for the user not not click many times when there are a async process waiting.
  isClicking = false;

  favorites = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeStorge: NativeStorage, private controller: Controller) {
    // Get the parameters from previous page.
    this.station = navParams.get('station');
    if(this.station == null) {
      return;
    }

    this.checkFavorite();

    if(this.station.isOpen) {
      this.stationAvailability = "Öppen";
    } else {
      this.stationAvailability = "Stängd";
    }

    // Create a string out of the location of the station to use as a parameter.
    let location = this.station.lat + "," + this.station.lng;

    // Get an image of the given location.
    this.stationImage = 'https://maps.googleapis.com/maps/api/streetview?size=400x200&location=' + location;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StationDetailPage');
  }

  async checkFavorite() {
    this.favorites = await this.nativeStorge.getItem('favorites');

    if(this.favorites == null) {
      this.isFavorite = false;
      return;
    }

    // Check if the this station is in the local storage of favorites.
    let favoriteStation = this.favorites.find(id => id == this.station.id);
    if(favoriteStation == null) {
      this.isFavorite = false;
    } else {
      this.isFavorite = true;
    }
  }

  async addFavorite() {
    this.isClicking = true;

    try {
      this.favorites = await this.nativeStorge.getItem('favorites');
    } catch(e) {
      console.log(e);
    }
    
    if(this.favorites == null) {
      this.favorites = [];
    }

    // Add the new station to the favorite and push it to the native storage.
    this.favorites.push(this.station.id);
    await this.nativeStorge.setItem('favorites', this.favorites);

    this.isFavorite = true;
    this.isClicking = false;
  }

  async removeFavorite() {
    this.isClicking = true;

    try {
      this.favorites = await this.nativeStorge.getItem('favorites');
    } catch(e) {
      console.log(e);
    }

    if(this.favorites == null) {
      return;
    } else {
      // See if the station id exists in favorites. If it's a positive index, it contains in the favorites.
      let index = this.favorites.indexOf(this.station.id);
      if(index > -1) {
        this.favorites.splice(index, 1);
      }

      // Removed the station from the favorites and push it to the native storage.
      await this.nativeStorge.setItem('favorites', this.favorites);

      this.isFavorite = false;
    }

    this.isClicking = false;
  }

}
