import { NotificationService } from "./notification.service";
import { HttpClient } from "@angular/common/http";

export interface FilterItem {
  [key: string]: string;
}

export class BaseService {
    serviceUrl:string;

    constructor(private notificationServiceBase: NotificationService, private httpBase: HttpClient){
    }
}
