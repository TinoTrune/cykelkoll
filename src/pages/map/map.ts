import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker,
 HtmlInfoWindow
} from '@ionic-native/google-maps';

import { Controller } from '../../controller/controller';

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map: GoogleMap;
  mapElement: HTMLElement;

  stations: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private controller: Controller, private googleMaps: GoogleMaps) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  // Initiate the map with its options.
  async loadMap() {
    // Gets the station from API.
    this.stations = await this.controller.getStations();

    // Get the element from map.html.
    this.mapElement = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      controls: {
        myLocationButton: true
      },
      camera: {
       target: {
         // Placeholder location. It's to get to the center of the city.
         lat: 57.708394,
         lng: 11.973339
       },
       zoom: 15
      }
    };

    this.map = this.googleMaps.create(this.mapElement, mapOptions);

    // Set the camere to the current location of the device.
    this.map.setMyLocationEnabled(true);
    this.map.getMyLocation().then((location) => {
      var myLocation = {
        lat: location.latLng.lat,
        lng: location.latLng.lng
      };
      this.map.setCameraTarget(myLocation);
    })

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      // Now you can use all methods safely.
      console.log('Map is ready!');

      for(let station of this.stations) {

        this.map.addMarker({
           title: station.name,
           snippet: 'Cyklar: ' + station.availableBikes + ', Lediga ställ: ' + station.availableBikeStands,
           icon: {
             url: station.icon,
             size: {
               width: 28,
               height: 28
             }
           },
           position: {
             lat: station.lat,
             lng: station.lng
           }
         }).then(marker => {
              // On info window clicked.
              marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {
                console.log("Hej!");
              });
          });

      } // End for-loop

    }); // End addMarker
  }

}
