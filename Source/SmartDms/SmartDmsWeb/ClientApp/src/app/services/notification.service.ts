import { Injectable } from '@angular/core';
import { LogEntity, Notification, NotificationEntityCollection, NotificationEntity, NotificationDisplayType, NotificationLevel, NotificationType } from '../entities';
import { Utils } from '../code/utils';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { LogService } from './log.service';
import { UserService } from './user.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthorizeService } from '../../api-authorization/authorize.service';

@Injectable()
export class NotificationService {

  public subject = new Subject<Notification>();
  public keepAfterRouteChange = true;

  constructor(private http: HttpClient, private configService: ConfigService, private logService: LogService, private authorizeService: AuthorizeService, private userService: UserService) {
  }

  startPeriodicCheck() {
/*
    if (this.authenticationService.userIsLogged) {
      this.userService.user$.subscribe(u => {
        if (u && u.name) {
          //init call to display notif info as soon as possible after pageload
          this.loadNotifications(u.name);

          this.configService.getValue("kmweb.notificationCheckInterval").subscribe(v => {
            let interval = +v; //10 * 1000; //10sec

            Observable.interval(interval).subscribe(i => {
              this.loadNotifications(u.name);
            })
          });
        }
      });
    }
*/
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.showNotification(NotificationLevel.Success, message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = false) {
    this.showNotification(NotificationLevel.Error, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = false) {
    this.showNotification(NotificationLevel.Info, message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false) {
    this.showNotification(NotificationLevel.Warning, message, keepAfterRouteChange);
  }

  showNotification(level: NotificationLevel, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Notification>{ type: level, message: message });
  }

  clear() {
    this.subject.next();
  }  
}
