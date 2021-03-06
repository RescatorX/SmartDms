import { Guid } from "../code/guid";

export class Notification {
  type: NotificationLevel;
  message: string;
}

export enum NotificationDisplayType {
  Message = 1,
  Alert = 2,
  MessageWithAlert = 3
}

export enum NotificationType {
  Common,
  WorkItem,
  Export
}

export enum NotificationLevel {
  Success = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
}

export class NotificationEntity {

  public static readonly defaultDuration: number = 5;

  uuid: string;
  title: string;
  message: string;
  /**duration in milisec. 0-infinit, 5sec - default */
  duration: number = NotificationEntity.defaultDuration;
  notificationType: NotificationType = NotificationType.Common;
  displayType: NotificationDisplayType = NotificationDisplayType.Message;
  notificationLevel: NotificationLevel = NotificationLevel.Info;

  data: { group?: number };

  read: string;
  deleted: string;
  enableDeletionFlag: boolean = true;

  public isLoading:boolean;

  constructor(title: string, message: string) {
    this.title = title;
    this.message = message;
    //TODO: bude ze serveru generovane
    this.uuid = Guid.NewGuid().toString();
  }

  public static createRandom(seed): NotificationEntity {
    let random: NotificationEntity = new NotificationEntity("testovací notif " + seed, "Lorem ipsum dolor sit amet consectetuer congue rhoncus tempor nunc pretium. Turpis adipiscing tincidunt montes Sed enim sem mollis quis id Phasellus. Tellus et senectus Curabitur a Nulla magna congue ut leo wisi. ");
    random.notificationType = Math.floor(Math.random() * Object.keys(NotificationType).length / 2);
    random.displayType = Math.floor(Math.random() * Object.keys(NotificationDisplayType).length / 2);
    random.notificationLevel = Math.floor(Math.random() * Object.keys(NotificationLevel).length / 2);
    random.enableDeletionFlag = Math.random() > 0.5;
    return random;
  }
}

export class NotificationEntityCollection extends Array<NotificationEntity> {
    //private messages: NotificationEntity[];
    constructor() {
        super();
    }

}
