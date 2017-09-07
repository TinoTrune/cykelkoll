import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

// This controller handels all the http-requests and everything related to API-calls.
@Injectable()
export class Provider {

  // The basic API url.
  api_url = 'http://data.goteborg.se/SelfServiceBicycleService/v1.0/Stations/ctk';

  // Which format the result is going to be in.
  // Json or Xml.
  format = 'Json';

  constructor(public http: Http) {

    // Append the URL with parameters.
    this.api_url = this.api_url + '?format=' + this.format;
  }

  // Get all the stations from the API.
  public getStations(): Promise<Response> {
    return this.http.get(this.api_url)
    .toPromise();
  }

}
