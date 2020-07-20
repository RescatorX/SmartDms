import { LogService } from "./log.service";
import { NotificationService } from "./notification.service";
import { ConfigService } from "./config.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UiService {

  public pageTitle: string = "";
  public pageTitle$: BehaviorSubject<string>;
  public pageDescription: string = "";
  public pageDescription$: BehaviorSubject<string>;
  public isLoading: boolean = false;

  constructor(public logService: LogService, public notificationService: NotificationService, public configService: ConfigService) {
    this.pageTitle$ = <BehaviorSubject<string>>new BehaviorSubject("");
    this.pageDescription$ = <BehaviorSubject<string>>new BehaviorSubject("");
  }

  public startLoading() {
    this.isLoading = true;
  }

  public stopLoading() {
    this.isLoading = false;
  }

  public setPageHead(title: string, description: string) {
    this.pageTitle = title;
    this.pageDescription = description;
    this.pageTitle$.next(this.pageTitle);
    this.pageDescription$.next(this.pageDescription);
  }
}
