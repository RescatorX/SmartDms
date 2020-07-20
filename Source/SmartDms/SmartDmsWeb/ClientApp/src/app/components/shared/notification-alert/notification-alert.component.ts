import { Component, OnInit, ViewChild, Injector, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import { FormMode } from '../../../code';
import { DocumentEntity, LogEntity, NotificationEntity, NotificationLevel } from '../../../entities';
//import { DocumentService, UiService } from '../../../services';
import { NotificationService } from '../../../services';

interface HashTable<T> {
  [key: string]: T;
}

@Component({
  selector: 'notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.scss']
})
export class NotificationAlertComponent implements OnInit {

  notifications: NotificationEntity[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getAlert().subscribe((alert: NotificationEntity) => {
      this.notifications = [];
      if (!alert) {
        this.notifications = [];
        return;
      }
      this.notifications.push(alert);
      setTimeout(() => {
        this.notifications = this.notifications.filter(x => x !== alert);
      }, 4000);
    });
  }

  removeNotification(notification: NotificationEntity) {
    this.notifications = this.notifications.filter(x => x !== notification);
  }

  /**Set css class for Alert -- Called from alert component**/
  cssClass(notification: NotificationEntity) {
    if (!notification) {
      return;
    }
    switch (notification.notificationLevel) {
      case NotificationLevel.Success:
        return 'toast-success';
      case NotificationLevel.Error:
        return 'toast-error';
      case NotificationLevel.Info:
        return 'toast-info';
      case NotificationLevel.Warning:
        return 'toast-warning';
    }
  }  
}
