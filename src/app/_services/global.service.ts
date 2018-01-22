import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  backendUrl: string;
  adminNavbarActive: boolean = false;
  settings: any;
  categories: any;
  username: string = 'Guest';
  constructor() { }

}
