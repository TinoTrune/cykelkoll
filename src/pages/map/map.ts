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
import { StationDetailPage } from '../station-detail/station-detail';

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

  // Segment value that controlls what kind of number tracking for the markers.
  markerType = 'bike';

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
        this.addMarker(station, station.bike_icon);
      }

    }); // End addMarker
  }

  // Change the markers in the map to show the number of available bikes or available bikeStands.
  segmentChanged() {
    this.map.clear();

    if(this.markerType == 'bike') {
      for(let station of this.stations) {
        this.addMarker(station, station.bike_icon);
      }
    } else if (this.markerType == 'bikeStands') {
      for(let station of this.stations) {
        this.addMarker(station, station.bikestand_icon);
      }
    }
  }

  // Add the marker to the map.
  // The icons show how many bikes/stands that are available and what it shows is dependent on the segmentcontroll.
  addMarker(station: any, icon: any) {
    this.map.addMarker({
       title: station.name,
       snippet: 'Cyklar: ' + station.availableBikes + ', Lediga ställ: ' + station.availableBikeStands,
       icon: {
         url: icon,
         size: {
           width: 32,
           height: 37
         }
       },
       position: {
         lat: station.lat,
         lng: station.lng
       }
     }).then(marker => {
          // On info window clicked.
          marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {

            // Navigate to the detail page of a station.
            this.navCtrl.push(StationDetailPage, {
              station: station
            });
          });
      });
  }

}
