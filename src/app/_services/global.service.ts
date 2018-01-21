import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class GlobalService {
  backendUrl: string = environment.backendUrl;
  adminNavbarActive: boolean = false;
  settings: any;
  categories: any;
  username: string = 'Guest';
  constructor() { }

}
