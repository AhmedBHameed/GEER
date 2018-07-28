import { Injectable, Injector } from '@angular/core';

// Services
import { HttpService, NotificationsService, SharedDataService, AuthService } from '.';

@Injectable()
export abstract class BaseApis {
   httpService: HttpService;
   notiService: NotificationsService;
   sharedData: SharedDataService;
   authService: AuthService;
   
   constructor(protected injector: Injector) {
      this.httpService = this.injector.get(HttpService);
      this.notiService = this.injector.get(NotificationsService);
      this.sharedData = this.injector.get(SharedDataService)
      this.authService = this.injector.get(AuthService);
   }
}