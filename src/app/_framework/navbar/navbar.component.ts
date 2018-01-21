import { Component, OnInit, Input, Output, HostListener, EventEmitter } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navBar: any;
  burgger: any;
  bg: any;
  STO: string;
  @Input() navigation: any;
  @Input() config: any;
  @Input() isAdmin: boolean;
  @Output() onLogout = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.navBar = $('.navigation .hamburger a');
    this.burgger = $('.navigation .fixed-menu');
    this.bg = $('.bg-brightness'); 
    // tslint:disable-next-line:curly
    if (this.config.adminNavbarActive)
      this.sessionTime(this.config.settings.session_time);
  }
  logout(e) {
    this.onLogout.emit('logout');
    return false;
  }
  sessionTime(sessionTime=30) {
    let min: number, sec: number, time = (+sessionTime)*60, timer;
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
        if (sec < 10 && min < 10){
          this.STO = '0' + min + ':0' + sec;
        }
        if (time == 0) {
          clearInterval(timer);
          localStorage.clear();
          sessionStorage.clear();
          this.logout('logout');
        }
        --time;
      }, 1000);
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
        }else{
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
    $('body').css({margin: '0', height: "100%", overflow: "hidden"});
  }
  hide() {
    this.burgger.removeClass('in').addClass('out');
    this.bg.fadeOut(300);
    $('body').css({margin: '0', height: "auto", overflow: "auto"});
  }

}
