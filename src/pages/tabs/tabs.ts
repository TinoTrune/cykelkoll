import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { FavoritePage } from '../favorite/favorite';
import { MapPage } from '../map/map';
import { ListPage } from '../list/list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FavoritePage;
  tab2Root = MapPage;
  tab3Root = ListPage;
  tab4Root = AboutPage;

  constructor() {

  }
}
