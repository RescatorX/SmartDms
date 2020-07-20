import { BaseEnumCollectionEntityConfig } from "../entities/base-enum.entity";
import { NotificationService } from "./notification.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ShreddingEntity, ShreddingEntityCollection } from "../entities/shredding.entity";
import { Injectable } from "@angular/core";
import { Subscription, Observable, Subscriber, BehaviorSubject } from "rxjs";
import { LogService } from "./log.service";
import { UserEntity } from "../entities/user.entity";
import { LogEntity, ShreddingFormEntity } from "../entities";
import { ShreddingItemEntity, ShreddingItemEntityCollection } from "../entities/shredding-item.entity";
import { NotificationType } from "../entities/notification.entity";
import { UiService } from './ui.service';
import { toPromise } from "rxjs/operator/toPromise";

@Injectable()
export class ShreddingService {
  roles: ShreddingEntityCollection = new ShreddingEntityCollection();

  oneQueue: ShreddingEntity = new ShreddingEntity();

  storeQueue: ShreddingEntity = new ShreddingEntity();

  updateQueue: ShreddingEntity = new ShreddingEntity();

  shreddingItems: ShreddingItemEntityCollection = new ShreddingItemEntityCollection();

  addShreddingDocItems: ShreddingEntityCollection = new ShreddingEntityCollection();

  //https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable?rq=1
  //https://medium.com/@luukgruijs/understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3
  //https://medium.com/@luukgruijs/understanding-rxjs-subjects-339428a1815b
  //https://medium.com/@luukgruijs/understanding-rxjs-behaviorsubject-replaysubject-and-asyncsubject-8cc061f1cfc0
  roles$: BehaviorSubject<ShreddingEntityCollection>;
  oneQueue$: BehaviorSubject<ShreddingEntity>;
  storeQueue$: BehaviorSubject<ShreddingEntity>;
  updateQueue$: BehaviorSubject<ShreddingEntity>;
  addShreddingDocItems$: BehaviorSubject<ShreddingItemEntityCollection>;

  public shreddingItems$: BehaviorSubject<ShreddingItemEntityCollection>;

  readonly serviceUrl = "/api/shredding/queues";
  readonly serviceUrlChangeState = "/api/shredding/queues/changeState/";
  readonly serviceSearchUrl = "/api/shredding/queues/documents/filter";
  readonly serviceDeleteUrl = "/api/shredding/items/removeDocs/";
  readonly serviceAddDocumentsUrl = "/api/shredding/items/addDocs/";
  readonly serviceGetProtocolUrl = "api/shredding/queues/protocol";

  readonly shreddingActiveCountUrl: string = "/api/search/query?hql=SELECT%20count%28%2A%29%20FROM%20ShreddingQueueEntity%20WHERE%20state.code%20not%20like%20%27FINISHED%27%20AND%20state.code%20not%20like%20%27REJECTED%27%20AND%20state.code%20not%20like%20%27APPROVED%27";
  readonly shreddingFinishedCountUrl: string = "/api/search/query?hql=SELECT%20count%28%2A%29%20FROM%20ShreddingQueueEntity%20WHERE%20state.code%20like%20%27FINISHED%27%20OR%20state.code%20like%20%27REJECTED%27%20OR%20state.code%20like%20%27APPROVED%27";

  constructor(private notificationService: NotificationService, private http: HttpClient, private logService: LogService, private uiService: UiService) {
    //this.loadShredding(LogEntity.CreateAction(this, ["constructor"]));
  }

  async getProtokol(log, reload: boolean = true, uuid: string): Promise<Blob> {
    let config = new BaseEnumCollectionEntityConfig();
    config.enableMultipleKey = true;
    config.keyProperty = "name";
    config.valueProperty = "name";
    config.dataProperty = "this";
    this.logService.log(log);

    const file = this.http.get<Blob>(this.serviceGetProtocolUrl + '/' + uuid, { responseType: 'blob' as 'json' }).toPromise();
    return file;
  }

  /**
   * Load roles to Observable collection (roles$: BehaviorSubject<ShreddingEntityCollection>)
   * @param reload force reload role data
   */
  loadShredding(log, reload: boolean = true, filter: string = ''): Subscription {
    if (!this.roles$) {
      this.roles$ = <BehaviorSubject<ShreddingEntityCollection>>new BehaviorSubject(new ShreddingEntityCollection());
      reload = true;
    }
    if (reload) {
      let config = new BaseEnumCollectionEntityConfig();
      config.enableMultipleKey = true;
      config.keyProperty = "name";
      config.valueProperty = "name";
      config.dataProperty = "this";
      filter = filter + '&limit=100';
      this.logService.log(log);
      return this.http.get<ShreddingEntity[]>(this.serviceUrl + '?filter=WHERE%20' + filter).subscribe(data => {
        this.roles = new ShreddingEntityCollection(data, config);
        this.roles$.next(this.roles);
      });
    }
  }

  loadOneQueueShredding(log, reload: boolean = false, uuid: string): Subscription {
    if (!this.oneQueue$) {
      this.oneQueue$ = <BehaviorSubject<ShreddingEntity>>new BehaviorSubject(new ShreddingEntity());
      reload = true;
    }
    if (reload) {
      let config = new BaseEnumCollectionEntityConfig();
      config.enableMultipleKey = true;
      config.keyProperty = "name";
      config.valueProperty = "name";
      config.dataProperty = "this";
      this.logService.log(log);
      return this.http.get<ShreddingEntity>(this.serviceUrl + '/' + uuid).subscribe(data => {
        this.oneQueue = new ShreddingEntity(data);
        this.oneQueue.setData(data);
        this.oneQueue$.next(this.oneQueue);
        console.log("Data prichozi skartace: " + data);
      });
    }
  }

  searchShredding(log, reload: boolean = false, formEntity: ShreddingFormEntity): Subscription {
    let urlParameters = "";
    this.shreddingItems$ = <BehaviorSubject<ShreddingItemEntityCollection>>new BehaviorSubject(new ShreddingItemEntityCollection());
    reload = true;
    if (reload) {
      let myParams = new HttpParams();
      myParams = myParams.set('documentType', 'DDA_DOC');
      myParams = myParams.set('queueType', 'MAN_CUST_LEAVE');
      if (formEntity.owner != undefined) myParams = myParams.set('owner', formEntity.owner);
      if (formEntity.shreddingChar != undefined) myParams = myParams.set('shreddingChar', formEntity.shreddingChar);
      if (formEntity.partner != undefined) myParams = myParams.set('partner', formEntity.partner);
      if (formEntity.documentType != undefined) myParams = myParams.set('documentType', formEntity.documentType);
      if (formEntity.docDateFrom != undefined) myParams = myParams.set('docDateFrom', new Date(formEntity.docDateFrom).toISOString());
      if (formEntity.docDateTo != undefined) myParams = myParams.set('docDateTo', new Date(new Date(formEntity.docDateTo).getTime() + 86399999).toISOString());
      if (formEntity.createdFrom != undefined) myParams = myParams.set('createdFrom', new Date(formEntity.createdFrom).toISOString());
      if (formEntity.createdTo != undefined) myParams = myParams.set('createdTo', new Date(new Date(formEntity.createdTo).getTime() + 86399999).toISOString());

      let config = new BaseEnumCollectionEntityConfig();
      config.enableMultipleKey = true;
      config.keyProperty = "name";
      config.valueProperty = "name";
      config.dataProperty = "this";

      this.logService.log(log);
      return this.http.get<ShreddingItemEntity[]>(this.serviceSearchUrl, { params: myParams }).subscribe(data => {
        this.shreddingItems = new ShreddingItemEntityCollection(data, config);
        this.shreddingItems$.next(this.shreddingItems);
        console.log(data);
      });
    }
  }

  // ulozeni vyhledavacich poli
  saveShredding(log, reload: boolean = false, formEntity: ShreddingFormEntity): Observable<ShreddingEntity> {
    if (!this.storeQueue$) {
      this.storeQueue$ = <BehaviorSubject<ShreddingEntity>>new BehaviorSubject(new ShreddingEntity());
      reload = true;
    }
    if (reload) {
      let config = new BaseEnumCollectionEntityConfig();
      config.enableMultipleKey = true;
      config.keyProperty = "name";
      config.valueProperty = "name";
      config.dataProperty = "this";
      this.logService.log(log);
      let filter = JSON.stringify(formEntity);
      let body = { name: formEntity.name, note: '', stateCode: 'NEW', typeCode: 'MAN_CUST_LEAVE', filter: null, planned: new Date() }
      body.filter = filter;
      return this.http.post<ShreddingEntity>(this.serviceUrl, body);
    }
  }

  // update vyhledavacich poli
  updateShredding(log, reload: boolean = true, formEntity: ShreddingFormEntity, stateCode: string) {
    if (!this.updateQueue$) {
      this.updateQueue$ = <BehaviorSubject<ShreddingEntity>>new BehaviorSubject(new ShreddingEntity());
      reload = true;
    }
    if (reload) {
      let config = new BaseEnumCollectionEntityConfig();
      config.enableMultipleKey = true;
      config.keyProperty = "name";
      config.valueProperty = "name";
      config.dataProperty = "this";
      this.logService.log(log);
      let filter = {};
      if (formEntity !== undefined || formEntity !== null) {
        filter = JSON.stringify(formEntity);
      }
      let body = { name: undefined, note: '', stateCode: stateCode, typeCode: 'MAN_CUST_LEAVE', filter: filter };
      this.http.put(this.serviceUrl + "/" + formEntity.uuid, body).subscribe(d => {
        //this.notificationService.successAlert("Změněno", NotificationType.common);
        this.updateQueue = new ShreddingEntity(d);
        this.updateQueue.setData(d);
        this.updateQueue$.next(this.updateQueue);
      }, err => {
        //this.notificationService.err(err, NotificationType.common);
      });
    }
  }

  // update vyhledavacich poli
  updateStateShredding(log, reload: boolean = true, formEntity: ShreddingFormEntity, stateCode: string, userId: String) {
    if (!this.updateQueue$) {
      this.updateQueue$ = <BehaviorSubject<ShreddingEntity>>new BehaviorSubject(new ShreddingEntity());
      reload = true;
    }
    if (reload) {
      let config = new BaseEnumCollectionEntityConfig();
      config.enableMultipleKey = true;
      config.keyProperty = "name";
      config.valueProperty = "name";
      config.dataProperty = "this";
      this.logService.log(log);
      let requestBody = { stateCode: stateCode, changer: userId, changed: new Date() };
      this.http.post(this.serviceUrlChangeState + formEntity.uuid, requestBody).subscribe(d => {
        //this.notificationService.successAlert("Změněno", NotificationType.common);
        this.updateQueue = new ShreddingEntity(d);
        this.updateQueue.setData(d);
        this.updateQueue$.next(this.updateQueue);
      }, err => {
        //this.notificationService.err(err, NotificationType.common);
      });
    }
  }

  // ulozeni vyhledavacich poli
  deleteItemsShredding(log, reload: boolean = true, shreddingItemEntityes: ShreddingItemEntity[], idQueue: String): Observable<ShreddingItemEntity[]> {
    if (!this.addShreddingDocItems$) {
      this.addShreddingDocItems$ = <BehaviorSubject<ShreddingItemEntityCollection>>new BehaviorSubject(new ShreddingItemEntityCollection());
      reload = true;
    }
    if (reload) {
      let config = new BaseEnumCollectionEntityConfig();
      config.enableMultipleKey = true;
      config.keyProperty = "name";
      config.valueProperty = "name";
      config.dataProperty = "this";
      this.logService.log(log);
      let request = [];
      shreddingItemEntityes.forEach(value => {
        request.push(value.uuid);
      });
      let body = { documents: request };
      return this.http.put<ShreddingItemEntity[]>(this.serviceDeleteUrl + idQueue, body);
    }
  }

  // ulozeni vyhledavacich poli
  deleteShredding(log, reload: boolean = true, idQueue: String): Observable<Object> {
    if (reload) {
      this.logService.log(log);
      return this.http.delete(this.serviceUrl + "/" + idQueue);
    }
  }

  addDocumentsToShreddingQueue(log, reload: boolean = false, uuidShredding: String, uuidDocuments: String[]) {
    if (!this.addShreddingDocItems$) {
      this.addShreddingDocItems$ = <BehaviorSubject<ShreddingItemEntityCollection>>new BehaviorSubject(new ShreddingItemEntityCollection());
      reload = true;
    }
    if (reload) {
      let config = new BaseEnumCollectionEntityConfig();
      config.enableMultipleKey = true;
      config.keyProperty = "name";
      config.valueProperty = "name";
      config.dataProperty = "this";
      this.logService.log(log);
      let documentsJson = JSON.stringify(uuidDocuments);
      let body = { documents: uuidDocuments };
      this.http.put(this.serviceAddDocumentsUrl + uuidShredding, body).subscribe(d => {
        //this.notificationService.successAlert("Pridano", NotificationType.common);
        return true;
      }, err => {
        //this.notificationService.err(err, NotificationType.common);
      });
    }
  }

  loadDocumentByQueue(log, reload: boolean = false, uuidQueue: string): Subscription {
    let urlParameters = "";
    if (!this.shreddingItems$) {
      this.shreddingItems$ = <BehaviorSubject<ShreddingItemEntityCollection>>new BehaviorSubject(new ShreddingItemEntityCollection());
      reload = true;
    }
    if (reload) {
      let config = new BaseEnumCollectionEntityConfig();
      config.enableMultipleKey = true;
      config.keyProperty = "name";
      config.valueProperty = "name";
      config.dataProperty = "this";

      this.logService.log(log);
      return this.http.get<ShreddingItemEntity[]>(this.serviceSearchUrl + "/" + uuidQueue).subscribe(data => {
        this.shreddingItems = new ShreddingItemEntityCollection(data, config);
        this.shreddingItems$.next(this.shreddingItems);
        console.log(data);
      });
    }
  }

  subscribeToService(): Observable<ShreddingEntityCollection> {
    return this.roles$.asObservable();
  }

  getShreddingActiveCount(log: LogEntity) {
    this.uiService.logService.log(log);
    return this.http.get(this.shreddingActiveCountUrl).map(d => { return d });
  }

  getShreddingFinishedCount(log: LogEntity) {
    this.uiService.logService.log(log);
    return this.http.get(this.shreddingFinishedCountUrl).map(d => { return d });
  }
}
