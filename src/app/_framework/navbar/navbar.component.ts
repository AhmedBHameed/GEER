import { Component, Injector, OnInit, Input, Output, HostListener, EventEmitter } from '@angular/core';

// Services
import { BaseApis } from '../../_services/base-apis';

// Environment
import { environment } from '../../../environments/environment';

// Graphql queries
import { gqlSettings, gqlCategories } from '../../_gql_queries';

declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends BaseApis implements OnInit {
  baseUrl: string = environment.backendUrl;
  // HTML elements varaibels
  navBar: any;
  burgger: any;
  bg: any;
  // Time session variables
  STO: string;
  // Send something on action.
  @Output() onAction = new EventEmitter();
  @Input() navigationLinks: any;
  @Input() isAdminNav: boolean;

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.navBar = $('.navigation .hamburger a');
    this.burgger = $('.navigation .fixed-menu');
    this.bg = $('.bg-brightness');

    this.httpService.post(gqlSettings).subscribe(
      (res: any) => {
        res = res.json();
        if (this.httpService.hasError(res)) {
          this.notiService.message(res);
          return false;
        }
        this.sharedData.settings = res.data.getSettings;
        if (this.sharedData.isAdmin && res.data.getSettings.session_time) this.sessionTime(res.data.getSettings.session_time);
      },
      (err: any) => {
        console.error(err);
      }
    );

    this.httpService.post(gqlCategories).subscribe(
      (res: any) => {
        res = res.json();
        if (this.httpService.hasError(res)) {
          this.notiService.message(res);
          return false;
        }
        this.sharedData.reformNavigationLinks(res.data.getCategories);
      },
      (err: any) => {
        console.error(err);
      }
    );

  }
  sessionTime(sessionTime = 30) {
    let min: number, sec: number, time = (+sessionTime) * 60, timer;
    timer = setInterval(
      () => {
        min = Math.floor(time / 60);
        sec = time % 60;
        this.STO = min.toString() + ':' + sec.toString();
        if (min < 10) {
          this.STO = '0' + min + ':' + sec;
        }
        if (sec < 10) {
          this.STO = min + ':0' + sec;
        }
        if (sec < 10 && min < 10) {
          this.STO = '0' + min + ':0' + sec;
        }
        if (time == 0) {
          clearInterval(timer);
          localStorage.clear();
          sessionStorage.clear();
          this.logout();
        }
        --time;
      }, 1000);
  }
  logout() {
    this.onAction.emit('logout');
    return false;
  }

  @HostListener('document:click', ['$event']) onClick(e) {
    e.stopPropagation();
    let el = $(e.target || e.touches[0].target);
    if (el.is('.navigation .hamburger a i') || el.is('.navigation .hamburger a')) {
      if (!this.burgger.hasClass('in')) {
        this.showMenu();
        return false;
      } else if (this.burgger.hasClass('in')) {
        this.hide();
        return false;
      }
    } else {
      if (el.closest('.fixed-menu').is('.fixed-menu')) {
        if (el.is('.dropdown') || el.closest('.dropdown').is('.dropdown')) {
          let menu = el.closest('.dropdown');
          menu.find(' > .triangle').toggleClass('collapseList');
          if (menu.next().is('.menu-list')) menu.next().slideToggle();
          return false;
        } else {
          this.hide();
        }
      } else {
        this.hide();
      }
    }
  }
  showMenu() {
    this.burgger.removeClass('out').addClass('in');
    this.bg.fadeTo(300, 0.6);
    $('body').css({ margin: '0', height: "100%", overflow: "hidden" });
  }
  hide() {
    this.burgger.removeClass('in').addClass('out');
    this.bg.fadeOut(300);
    $('body').css({ margin: '0', height: "auto", overflow: "auto" });
  }

}
