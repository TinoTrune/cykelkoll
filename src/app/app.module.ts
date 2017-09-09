import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

// Controllers.
import { Controller } from '../controller/controller';
import { Provider } from '../controller/provider';

// Pages.
import { AboutPage } from '../pages/about/about';
import { FavoritePage } from '../pages/favorite/favorite';
import { MapPage } from '../pages/map/map';
import { ListPage } from '../pages/list/list';
import { StationDetailPage } from '../pages/station-detail/station-detail';
import { TabsPage } from '../pages/tabs/tabs';

// Native frameworks.
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    FavoritePage,
    MapPage,
    ListPage,
    StationDetailPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    FavoritePage,
    MapPage,
    ListPage,
    StationDetailPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Controller,
    Provider,
    NativeStorage,
    GoogleMaps,
    Geolocation,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
