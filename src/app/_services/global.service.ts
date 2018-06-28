import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  backendUrl: string;
  adminNavbarActive: boolean = false;
  settings: any;
  categories: any;
  user_id: number;
  username: string = 'Guest';

  // object for update artical
  public updateArticalObject : string = null;
  
  constructor() { }

}
