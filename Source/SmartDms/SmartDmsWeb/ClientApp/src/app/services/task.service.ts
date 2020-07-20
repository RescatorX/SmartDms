import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { GridColumn, LogEntity, NotificationLevel, QueryEntity, TaskEntity, WorkflowEntity, WorkflowHistoryEntity, WorkflowStartEntity, RegisterEntity } from "../entities";
import { IGridService } from './igrid.service';
import { LogService } from './log.service';
import { UiService } from './ui.service';
import { RegisterService } from './register.service';

@Injectable()
export class TaskService implements IGridService {

  readonly tasksUrl: string = "/api/tasks";
  readonly taskUrl: string = "/api/tasks/[uuid]";

  readonly workflowListUrl: string = "/api/spring/workflow/activatedTasks";
  readonly workflowStartUrl: string = "/api/spring/workflow/startWorkflow";
  readonly workflowHistoryUrl: string = "/api/spring/workflow/getDocumentHistory/[uuid]";
  readonly workflowImageUrl: string = "/api/spring/workflow/getImage/[uuid]";
  readonly workflowSendUrl: string = "/api/spring/workflow/nextTask";
  readonly exportToIsDocUrl: string = "/api/documents/exportISDOC/[uuid]";

  readonly defaultTableName = "TaskEntity"
  readonly filterUrl: string = "/api/search/query?hql=SELECT [SELECT] FROM [TABLE] [WHERE] [ORDER]";
  readonly tasksSearchUrl: string = "/api/search/fulltext";

  readonly taskCountUrl: string = "/api/search/query?hql=SELECT%20count%28%2A%29%20FROM%20TaskEntity";
  readonly workflowTaskCountUrl: string = "/api/search/query?hql=SELECT%20count%28%2A%29%20FROM%20InvoiceEntity%20WHERE%20internal=false%20AND%20documentType.code%20LIKE%20%27%25INV_ISSUE%25%27";

  public contractTypes: TaskEntity[] = [];

  constructor(public logService: LogService, public http: HttpClient, private uiService: UiService, private registerService: RegisterService) {
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

  getTasks(query?: QueryEntity): Observable<TaskEntity[]> {

    let url = this.tasksUrl;

    if (query) {
      //different rest service for fultext search with cache
      if (query.searchKeys) {
        return this.getTasksSearched(query).map(d => {
          //when fulltext is used and server return more than limit of result for fulltext
          if (d.length >= query.fulltextLimit) {
            this.uiService.notificationService.alert(this.uiService.configService.res["msg"]["documentFulltextMaxDocumentLimitReach"], NotificationLevel.Warning);
          }
          return d
        });
      } else {
        url += query.toSQL();
      }
    }
    //return this.http.get<TaskEntity[]>(url).map(d => { return d });

    let result: TaskEntity[] = [];
    result.push(new TaskEntity(
      {
        uuid: 10,
        title: 'Kontrola atributů',
        note: 'Prověďte prosím faktickou kontrolu všech parametrů dokumentu',
        creator: 'pvalenta',
        created: '2019-08-27',
        status: 'Created',
        type: 'Check',
        documentId: '2045a21b-1d9a-4987-885f-56a02c3069c7'
      }
    ));

    return Observable.of(result);
  }

  getTasksSearched(query?: QueryEntity): Observable<TaskEntity[]> {
    ///api/search/fulltext?limit=30&searchKeys=Test&filters=LOWER(barcode) LIKE '%12%',LOWER(documentTypeName) LIKE '%dda%'
    let url = this.tasksSearchUrl;
    if (query) {
      url += query.toSearchQuery();
    }

    return this.http.get<{ foundTaskData: TaskEntity, score: number }[]>(url).map(data => {
      let tasks: TaskEntity[] = data.map(task => {
        task.foundTaskData["score"] = task.score;
        return task.foundTaskData;
      });
      return tasks;
    });
  }

  getAllTaskItems(log: LogEntity): Observable<TaskEntity[]> {
    this.uiService.logService.log(log);
    let url = this.tasksUrl;
    return this.http.get<TaskEntity[]>(url);
  }

  getTaskById(log: LogEntity, id: string): Observable<TaskEntity> {
    this.uiService.logService.log(log);
    let url = this.tasksUrl + "/" + id;
    return this.http.get<TaskEntity>(url);
  }

  getWorkflowTaskCount(log: LogEntity) {
    this.uiService.logService.log(log);
    return this.getAllWorkflows(log).map(wfs => {
      return wfs.length;
    }, error => {
      console.log("getWorkflowTaskCount error: " + this.handleError(error));
      return 0;
    });
  }

  getAllWorkflows(log: LogEntity): Observable<TaskEntity[]> {
    this.uiService.logService.log(log);
    let url = this.workflowListUrl;
    return this.http.get<WorkflowEntity[]>(url).catch(error => {
      console.log("getWorkflowTaskCount error: " + this.handleError(error));
      return [];
    }).map((workflows: WorkflowEntity[]) => {

      let loadedTasks: TaskEntity[] = [];

      workflows.forEach((workflow: WorkflowEntity) => {

        if (workflow.inputData.delegateType == "COSTCENTERS") {
          try {
            this.registerService.getRegisterItemsByType(log, "costcenters")
              .subscribe((costCenters: RegisterEntity[]) => {
                workflow.inputData.delegates = [];
                if (costCenters && (costCenters.length > 0)) {
                  let delegates: string[] = costCenters.map(cc => { return cc.name; });
                  delegates.unshift("");
                  workflow.inputData.delegates = delegates;
                }
              });
          } catch (error) { }
        } else if (workflow.inputData.delegateType == "COSTCENTER_USERS") {
          try {
            let costCenterCode: string = "" + workflow.inputData.delegates;
            this.registerService.getCostCenterGroupUsers(log, costCenterCode, workflow.inputData.userName).subscribe(users => {
              if (users && (users.length > 0)) {
                let delegates: string[] = users;
                delegates.unshift("");
                workflow.inputData.delegates = delegates;
              }
            });
          } catch (error) { }
        } else {
          try {
            if (workflow.inputData.delegates && (workflow.inputData.delegates.length > 0)) {
              let delegatesString: string = "" + workflow.inputData.delegates;
              let delegates: string[] = delegatesString.split(",");
              delegates.unshift("k");
              workflow.inputData.delegates = delegates;
            }
          } catch (error) { }
        }

        try {

          if (workflow.inputData.modifiedProperties && (workflow.inputData.modifiedProperties.length > 0)) {
            let modifiedPropertiesString: string = "" + workflow.inputData.modifiedProperties;
            let modifiedProperties: string[] = modifiedPropertiesString.split(",");
            workflow.inputData.modifiedProperties = modifiedProperties;
          }

        } catch (error) { }

        let containerName = workflow.containerId;
        let workflowType = "Task";
        let workflowTitle = "";
        if (containerName.indexOf("Contract") >= 0) {
          workflowType = "Pracovní proces - Schválení smlouvy";
          workflowTitle = workflow.subject + ((workflow.inputData.documentName != null) ? (" pro dokument '" + workflow.inputData.documentName + "'") : "")
        }
        if (containerName.indexOf("Approval") >= 0) {
          workflowType = "Pracovní proces - Schválení faktury";
          workflowTitle = workflow.subject + ((workflow.inputData.documentName != null) ? (" pro dokument '" + workflow.inputData.documentName + "'") : "")
        }
        if (containerName.indexOf("DocApproval") >= 0) {
          workflowType = "Pracovní proces - Schválení dokumentu";
          workflowTitle = workflow.subject + ((workflow.inputData.documentName != null) ? (" pro dokument '" + workflow.inputData.documentName + "'") : "")
        }
        if (containerName.indexOf("DocFamiliarization") >= 0) {
          workflowType = "Pracovní proces - Seznámení s dokumentem";
          workflowTitle = workflow.subject + ((workflow.inputData.documentName != null) ? (" s dokumentem '" + workflow.inputData.documentName + "'") : "")
        }

        loadedTasks.push(new TaskEntity({
          uuid: workflow.id, title: workflowTitle, note: workflow.description,
          creator: workflow.createdBy, created: workflow.createdOn, status: workflow.status, type: workflowType,
          documentId: workflow.inputData.documentId, taskObject: workflow
        })
        );
      });

      return loadedTasks;
    });
  }

  getDocumentWorkflowImage(log: LogEntity, uuid: string): Observable<string> {
    this.uiService.logService.log(log);
    let url = this.workflowImageUrl.replace("[uuid]", uuid);
    return this.http.get(url, { responseType: 'text' }).map(r => {
      return atob(r);
    });
  }

  getDocumentWorkflowHistory(log: LogEntity, uuid: string): Observable<WorkflowHistoryEntity[]> {
    this.uiService.logService.log(log);
    let url = this.workflowHistoryUrl.replace("[uuid]", uuid);
    return this.http.get(url).map((historyItems: any[]) => {
      let result: WorkflowHistoryEntity[] = [];
      let index = 1;
      historyItems.forEach(historyItem => {
        result.push(new WorkflowHistoryEntity({
          id: index.toString(), name: historyItem["variableName"], description: historyItem["variableName"],
          wfType: "Document approve", status: "Approved", owner: "pvalenta", createdBy: "pvalenta", createdOn: new Date(historyItem["date"])
        }));
        index++;
      });
      return result;
    });
  }

  exportToIsDoc(log: LogEntity, uuid: string): Observable<boolean> {
    this.uiService.logService.log(log);
    let url = this.exportToIsDocUrl.replace("[uuid]", uuid);
    return this.http.get<boolean>(url);
  }

  sendWorkflowResult(log: LogEntity, workflowEntity: WorkflowEntity) {
    this.uiService.logService.log(log);
    return this.http.post(this.workflowSendUrl, workflowEntity);
  }

  startWorkflow(log: LogEntity, workflowEntity: WorkflowStartEntity): Observable<boolean> {
    this.uiService.logService.log(log);
    return this.http.post<boolean>(this.workflowStartUrl, workflowEntity);
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
