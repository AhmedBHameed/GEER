import { Injectable } from '@angular/core';

declare let $: any;
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  private push(data) {
    $.notify({
      // options
      icon: data.icon,
      title: data.title,
      message: data.message,
      url: data.url || null,
      target: data.target || null
    }, {
        // settings
        element: 'body',
        position: null,
        type: data.type,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
          from: "bottom",
          align: "left"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: 'pause',
        animate: {
          enter: 'animated fadeInUp',
          exit: 'animated fadeOutDown'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
          '<span data-notify="icon"></span> ' +
          '<span data-notify="title">{1}</span></br> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }
  public message(message: any, isError: boolean = false) {
    message = typeof message == 'object' ? message.errors[0].message : message;
    this.push({
        type: isError ? 'danger' : 'success',
        icon: isError ? 'fa fa-exclamation-triangle' : 'fa fa-flag',
        title: isError ? 'Request Error!!' : 'Login Status',
        message: message
    });
  }
}
