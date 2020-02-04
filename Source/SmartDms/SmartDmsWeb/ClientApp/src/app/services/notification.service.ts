import { Injectable } from '@angular/core';
import { LogEntity, NotificationEntityCollection, NotificationEntity, NotificationDisplayType, NotificationLevel, NotificationType } from '../entities';
import { Utils } from '../code/utils';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { LogService } from './log.service';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NotificationService {
  // notifications: NotificationEntityCollection = new NotificationEntityCollection();
  get hasNotification(): boolean {
    return this.notifications$.getValue().length > 0;
  };
  get notificationsCount(): number {
    return this.notifications$.getValue().length;
  };

  public readonly NewLineSeparator = "\n";

  public notifications$: BehaviorSubject<NotificationEntityCollection> = new BehaviorSubject([]);


  readonly getUrl = "api/notifications?userName={user}";
  readonly updateUrl = "api/notifications/{uuid}";
  constructor(private http: HttpClient, private configService: ConfigService, private logService: LogService, private userService: UserService) {
  }

  startPeriodicCheck() {
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
  }

  loadNotifications(userName) {
    this.getNotifications(userName).subscribe(data => {
      if (data) {
        data.forEach(newNotif => {
          //copy some UI data to new set of notification, notification collection is transfered a rendered fully again everytime, some UI properties has to be coppied (ex.: isLoading)
          let oldNotif = this.notifications$.getValue().find(n=>n.uuid == newNotif.uuid);
          if(oldNotif && oldNotif.isLoading){
            newNotif.isLoading = true;
          }
        });
        this.notifications$.next(data);
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
    return this.http.get<NotificationEntity[]>(url).share().map(data => {
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

    if (notification.displayType == NotificationDisplayType.message || notification.displayType == NotificationDisplayType.messageWithAlert) {
      this.notifications$.getValue().push(notification);
      // this.hasNotification = true;
      // this.notificationsCount++;
    }
    if (notification.displayType == NotificationDisplayType.messageWithAlert || notification.displayType == NotificationDisplayType.alert) {
      switch (notification.notificationLevel) {
        case NotificationLevel.success:
        case NotificationLevel.info:
          this.kmAlert.success(notification.title);
          break;
        case NotificationLevel.warning:
          this.kmAlert.warning(notification.title);
          break;
        case NotificationLevel.error:
          this.kmAlert.danger(notification.title);
          break;

      }
    }
  }

  success(title: string, notificationStr: string) {
    let notification = new NotificationEntity(title, notificationStr);
    notification.notificationLevel = NotificationLevel.success;
    notification.displayType = NotificationDisplayType.message;
    notification.enableDeletionFlag = true;
    this.add(notification);
  }

  successAlert(title: string, type = NotificationType.common) {
    this.alert(title, NotificationLevel.success, type);
  }

  alert(title: string, level = NotificationLevel.success, type = NotificationType.common, data?) {
    let notification = new NotificationEntity(title, undefined);
    notification.notificationLevel = level;
    notification.notificationType = type;
    notification.displayType = NotificationDisplayType.alert;
    notification.data = data;
    this.add(notification);
  }

  err(err, type = NotificationType.common, additionalInfo = "") {
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
    this.alert(msgStr, NotificationLevel.error, type, data)
  }

  deleteAll(log: LogEntity) {
    // this.notifications = this.notifications.filter(n => !n.isDeletionEnabled);
    // this.notificationsCount = this.notifications.length;
    // this.hasNotification = this.notificationsCount > 0;
    let uuidToDelete = [...this.notifications$.getValue().map(n => n.uuid)];
    uuidToDelete.forEach(uuid => {
      this.delete(log, uuid);
    });
  }
  delete(log: LogEntity, uuid) {
    let index = this.notifications$.getValue().findIndex(m => m.uuid == uuid);
    if (index >= 0) {
      this.notifications$.getValue().splice(index, 1);
    }
    this.logService.log(log);
    let url = Utils.Replace(this.updateUrl, { uuid: uuid });
    this.http.patch(url, { deleted: true }).subscribe();;
  }

  readAll(log: LogEntity) {
    this.notifications$.getValue().forEach(n => this.read(log, n.uuid, n));
  }

  read(log: LogEntity, uuid, notification?: NotificationEntity) {

    if (!notification) {
      notification = this.notifications$.getValue().find(n => n.uuid == uuid);
    }
    notification.read = (new Date()).toISOString();

    this.logService.log(log);
    let url = Utils.Replace(this.updateUrl, { uuid: uuid });
    this.http.patch(url, { read: true }).subscribe();
  }


  getAllMessages() {
    let allNotifications = this.notifications$.getValue().filter((n: NotificationEntity) => { return n.displayType == NotificationDisplayType.message });
    return allNotifications;
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

  private lastNotification: NotificationEntity;

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
   * custom logs
   */
  public customLog(err) {
    if (err.status == 460) {
      var msgStr = err.error.message;
      //nestastna agregace
      let groupId = this.getHash(msgStr);
      let data = { group: groupId };

      this.alert(msgStr, NotificationLevel.warning, NotificationType.common, data)
    }
  }
}
