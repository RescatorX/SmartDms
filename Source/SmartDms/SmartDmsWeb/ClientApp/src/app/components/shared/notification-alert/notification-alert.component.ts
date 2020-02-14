import { Component, OnInit, ViewChild, Injector, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import { FormMode } from '../../../code';
import { DocumentEntity, LogEntity } from '../../../entities';
import { DocumentService, UiService } from '../../../services';
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

  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getAlert().subscribe((alert: Notification) => {
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

  removeNotification(notification: Notification) {
    this.notifications = this.notifications.filter(x => x !== notification);
  }

  /**Set css class for Alert -- Called from alert component**/
  cssClass(notification: Notification) {
    if (!notification) {
      return;
    }
    switch (notification.type) {
      case NotificationType.Success:
        return 'toast-success';
      case NotificationType.Error:
        return 'toast-error';
      case NotificationType.Info:
        return 'toast-info';
      case NotificationType.Warning:
        return 'toast-warning';
    }
  }  
}
