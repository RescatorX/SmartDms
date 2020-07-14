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
  private lastNotification: NotificationEntity;

  get hasNotification(): boolean {
    return this.notifications.length > 0;
  };
  get notificationsCount(): number {
    return this.notifications.length;
  };

  public readonly NewLineSeparator = "\n";

  public notifications: NotificationEntity[] = [];

  readonly getUrl = "api/notifications?userName={user}";
  readonly updateUrl = "api/notifications/{uuid}";

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

  loadNotifications(userName) {
    this.getNotifications(userName).subscribe(data => {
      if (data) {
        data.forEach(newNotif => {
          //copy some UI data to new set of notification, notification collection is transfered a rendered fully again everytime, some UI properties has to be coppied (ex.: isLoading)
          let oldNotif = this.notifications.find(n => n.uuid == newNotif.uuid);
          if (oldNotif && oldNotif.isLoading) {
            newNotif.isLoading = true;
          }
        });
      }
    });
  }

  getNotifications(userName): Observable<NotificationEntityCollection> {
    // let random = Math.random() * 10;
    // if (random > 2) { //80% ze kazde 2 sekundy
    //   let notif = NotificationEntity.createRandom(random);
    //   this.add(notif);
    // }
    // return Observable.of(new NotificationEntityCollection());
    this.logService.logAction(this, "getNotifications");
    let url = Utils.Replace(this.getUrl, { user: userName });
    return this.http.get<NotificationEntityCollection>(url).share().map(data => {
      // console.log(data);
      data.forEach(n => {
        if (n.data && (typeof n.data == "string")) {
          n.data = JSON.parse(n.data as string);
        }
      });
      return data;
    });
  }

  add(notification: NotificationEntity) {

    if (this.isDuplicite(notification)) {
      return;
    }

    if (notification.displayType == NotificationDisplayType.Message || notification.displayType == NotificationDisplayType.MessageWithAlert) {
      this.notifications.push(notification);
      // this.hasNotification = true;
      // this.notificationsCount++;
    }
    if (notification.displayType == NotificationDisplayType.MessageWithAlert || notification.displayType == NotificationDisplayType.Alert) {
      switch (notification.notificationLevel) {
        case NotificationLevel.Success:
        case NotificationLevel.Info:
          //this.kmAlert.success(notification.title);
          break;
        case NotificationLevel.Warning:
          //this.kmAlert.warning(notification.title);
          break;
        case NotificationLevel.Error:
          //this.kmAlert.danger(notification.title);
          break;
      }
    }
  }

  alert(title: string, level = NotificationLevel.Success, type = NotificationType.Common, data?) {
    let notification = new NotificationEntity(title, undefined);
    notification.notificationLevel = level;
    notification.notificationType = type;
    notification.displayType = NotificationDisplayType.Alert;
    notification.data = data;
    this.add(notification);
  }

  err(err, type = NotificationType.Common, additionalInfo = "") {
    let msg = []
    msg.push(this.configService.res["err"].title);
    if (err && err.error) {
      let res = this.configService.res["err"][err.error.internalErrorCode] || err.error.internalErrorCode;
      if (res) {
        msg.push(res);
      }
      msg.push(err.error.message);

    }
    if (err && err.status) {
      let status = this.configService.res["err"][err.status];
      if (status) {
        msg.push(status);
      }
    }
    if (err && err.name) {
      let name = this.configService.res["err"][err.name];
      if (name) {
        msg.push(name);
      }
    }
    //nestastna agregace
    let groupId = this.getHash(msg.join(this.NewLineSeparator));
    let data = { group: groupId };

    // if (err && err.message) {
    //   msg.push(err.message);
    // }
    let msgStr = msg.join(this.NewLineSeparator);
    err.msgStr = msgStr;
    this.alert(msgStr, NotificationLevel.Error, type, data)
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

  /**
   * 
   * @param notification Na zaklade casu a hashe z textu zpravy rozpozna, jestli se jedna o duplicitu
   */
  private isDuplicite(notification: NotificationEntity): boolean {
    let isDuplicite = this.lastNotification && this.lastNotification.data && this.lastNotification.data.group && notification.data && this.lastNotification.data.group == notification.data.group
    this.lastNotification = notification;
    return isDuplicite;
  }

  /**
   * Vypocte hash z textu zpravy a prilepi k nemu casove raziko (sekundy)
   * @param msg 
   */
  private getHash(msg: string): number {
    let hash = Utils.HashCode(msg);
    let secconds = Date.now() / 1000 | 0; //celkovy pocet sekund
    return hash + secconds;
  }
}
