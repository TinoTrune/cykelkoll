import { Injectable } from '@angular/core';

import { Provider } from './provider';

@Injectable()
export class Controller {

  constructor(public provider: Provider) {

  }

}
