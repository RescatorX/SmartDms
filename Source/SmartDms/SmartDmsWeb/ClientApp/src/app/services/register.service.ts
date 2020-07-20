import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogEntity, QueryEntity } from '../entities';
import { IGridService } from './igrid.service';
import { Consts } from '../code/global.const';
import { DataTypes } from '../code/data-types';
// import { Subscriber } from 'rxjs';
import { Utils } from '../code/utils';
import { LogService } from './log.service';
import { GridColumn } from '../entities/grid-column';
import { BaseEnumCollectionEntity } from '../entities/base-enum.entity';
import { UiService } from './ui.service';
import { Subscription, Observable, Subscriber, BehaviorSubject } from "rxjs";
import { BaseEnumCollectionEntityConfig } from "../entities/base-enum.entity";
import { RegisterEntity, GroupRegisterEntity, GroupsRegisterEntity } from "../entities/register.entity";

@Injectable()
export class RegisterService implements IGridService {

  readonly filterUrl: string = "/api/search/query?hql=SELECT [SELECT] FROM [TABLE] [WHERE] [ORDER]";
  readonly registerBaseUrl = "/api/registers";
  readonly springRegisterBaseUrl = "/api/spring/registers";

  public contractTypes: RegisterEntity[] = [];

  constructor(public logService: LogService, public http: HttpClient, private uiService: UiService) {
  }

  getValuesFromColumn(column: GridColumn, query?: QueryEntity): Observable<{ key, value }[]> {

    let hbColumn = column.hbNameKey;
    let order = column.hbNameKey;

    //pokud chci ziskat key i value, musim si o nej rict v filterUrl
    let isKeyValue = false;
    let url = this.filterUrl
      .replace("[hbColumnName]", column.hbNameKey)
      .replace("[SELECT]", "DISTINCT " + hbColumn)
      .replace("[TABLE]", column.table ? column.table : "RegisterEntity");
    let where = "";
    if (query) {
      where = query.getWhere();
    }
    url = url
      .replace("[WHERE]", where)
      .replace("[ORDER]", "ORDER BY " + order);

    url = encodeURI(url);

    //vysledek filtru vratim jako {key,value}
    return this.http.get<{}[]>(url).map(rows => {
      let data: { key, value }[] = [];
      rows.forEach(r => {
        if (isKeyValue) {
          data.push({ key: r[0], value: r[1] });
        } else {
          data.push({ key: r, value: r });
        }
      });
      return data;
    });
  }

  getRegisterItemsByType(log: LogEntity, regType: string): Observable<RegisterEntity[]> {
    this.uiService.logService.log(log);
    let url = this.registerBaseUrl + "/" + regType;
    return this.http.get<RegisterEntity[]>(url);
  }

  getRegisterByTypeAndCode(log: LogEntity, regType: string, regCode: string): Observable<RegisterEntity> {
    this.uiService.logService.log(log);
    let url = this.registerBaseUrl + "/" + regType + "/" + regCode;
    return this.http.get<RegisterEntity>(url);
  }

  createRegisterByType(log: LogEntity, regType: string, registerEntity: RegisterEntity, delegate = null, target = null, closeOnSuccess: boolean = false) {
    this.uiService.logService.log(log);
    let url = this.registerBaseUrl + "/" + regType;
    //let body = {name: undefined, note: '', stateCode: stateCode, typeCode: 'MAN_CUST_LEAVE', filter: filter};
    this.http.post(url, registerEntity).subscribe(d => {
      if (delegate) {
        delegate(target, d, false, null, closeOnSuccess);
      }
    }, err => {
      if (delegate) {
        delegate(target, null, true, err, closeOnSuccess);
      }
    });
  }

  updateRegisterByTypeAndCode(log: LogEntity, regType: string, regCode: string, registerEntity: RegisterEntity, delegate = null, target = null, closeOnSuccess: boolean = false) {
    this.uiService.logService.log(log);
    let url = this.registerBaseUrl + "/" + regType + "/" + regCode;
    this.http.put(url, registerEntity).subscribe(d => {
      if (delegate) {
        delegate(target, d, false, null, closeOnSuccess);
      }
    }, err => {
      if (delegate) {
        delegate(target, null, true, err, closeOnSuccess);
      }
    });
  }

  deleteRegisterByTypeAndCode(log: LogEntity, regType: string, regCode: string, delegate = null, target = null, closeOnSuccess: boolean = false) {
    this.uiService.logService.log(log);
    let url = this.registerBaseUrl + "/" + regType + "/" + regCode;
    return this.http.delete(url).subscribe(d => {
      if (delegate) {
        delegate(target, d, false, null, closeOnSuccess);
      }
    }, err => {
      if (delegate) {
        delegate(target, null, true, err, closeOnSuccess);
      }
    });
  }

  getSpringRegisterItemsByType(log: LogEntity, regType: string): Observable<RegisterEntity[]> {
    this.uiService.logService.log(log);
    let url = this.springRegisterBaseUrl + "/" + regType + "/";
    return this.http.get<RegisterEntity[]>(url);
  }

  getSpringRegisterByTypeAndCode(log: LogEntity, regType: string, regCode: string): Observable<RegisterEntity> {
    this.uiService.logService.log(log);
    let url = this.springRegisterBaseUrl + "/" + regType + "/" + regCode;
    return this.http.get<RegisterEntity>(url);
  }

  createSpringRegisterByType(log: LogEntity, regType: string, registerEntity: RegisterEntity, delegate = null, target = null, closeOnSuccess: boolean = false) {
    this.uiService.logService.log(log);
    let url = this.springRegisterBaseUrl + "/" + regType;
    //let body = {name: undefined, note: '', stateCode: stateCode, typeCode: 'MAN_CUST_LEAVE', filter: filter};
    this.http.post(url, registerEntity).subscribe(d => {
      if (delegate) {
        delegate(target, d, false, null, closeOnSuccess);
      }
    }, err => {
      if (delegate) {
        delegate(target, null, true, err, closeOnSuccess);
      }
    });
  }

  updateSpringRegisterByTypeAndCode(log: LogEntity, regType: string, regCode: string, registerEntity: RegisterEntity, delegate = null, target = null, closeOnSuccess: boolean = false) {
    this.uiService.logService.log(log);
    let url = this.springRegisterBaseUrl + "/" + regType + "/" + regCode;
    this.http.put(url, registerEntity).subscribe(d => {
      if (delegate) {
        delegate(target, d, false, null, closeOnSuccess);
      }
    }, err => {
      if (delegate) {
        delegate(target, null, true, err, closeOnSuccess);
      }
    });
  }

  deleteSpringRegisterByTypeAndCode(log: LogEntity, regType: string, regCode: string, delegate = null, target = null, closeOnSuccess: boolean = false) {
    this.uiService.logService.log(log);
    let url = this.springRegisterBaseUrl + "/" + regType + "/" + regCode;
    return this.http.delete(url).subscribe(d => {
      if (delegate) {
        delegate(target, d, false, null, closeOnSuccess);
      }
    }, err => {
      if (delegate) {
        delegate(target, null, true, err, closeOnSuccess);
      }
    });
  }

  getCostCenterGroupUsers(log: LogEntity, costCenterCode: string, groupName: string): Observable<string[]> {
    return this.getRegisterByTypeAndCode(log, "costcenters", costCenterCode).map(r => {
      let result: string[] = [];
      if (r != null) {
        try {
          let groupString = r.group;
          let costCenterGroups: GroupsRegisterEntity = <GroupsRegisterEntity>JSON.parse(groupString);
          if ((costCenterGroups != null) && (costCenterGroups.groups != null)) {
            let groups: GroupRegisterEntity[] = costCenterGroups.groups.filter(g => g.name == groupName);
            if (groups && (groups.length > 0)) {
              result = groups[0].members;
            }
          }
        } catch (error) {
          console.log("RegisterService.getCostCenterGroupUsers error: " + this.handleError(error));
        }
      }
      return result;
    })
  }

  handleError(error: any): string {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = "Error: " + error.error.message;
    } else {
      // server-side error
      errorMessage = "Error Code: " + error.status + ", nMessage: " + error.message;
    }
    return errorMessage;
  }
}
