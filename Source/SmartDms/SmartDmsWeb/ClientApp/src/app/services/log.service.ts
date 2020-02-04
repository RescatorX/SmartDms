import { Injectable } from "@angular/core";
import { LogEntity } from "../entities/log.entity";
import { LogType } from "../code/enums/log-type";

@Injectable()
export class LogService {

    logCollection: LogEntity[] = new Array();
    // tmpLogCollection: LogEntity[] = new Array();
    actionLogCollection: LogEntity[] = new Array();

    log(log: LogEntity) {
        this.logCollection.push(log);
        // this.tmpLogCollection.push(log);
        if (log.type == LogType.Action) {
            this.actionLogCollection.push(log);
        }
        //console.log(log);
    }

    logAction(component, source: string | string[]) {
        let log = LogEntity.CreateAction(component, source);
        this.log(log);
    }

    // getLastLog(): LogEntity {
    //     let log = this.tmpLogCollection.pop();
    //     return log;
    // }
    getLastActionLog(): LogEntity {
        let log = this.actionLogCollection.pop();
        return log;
    }

}