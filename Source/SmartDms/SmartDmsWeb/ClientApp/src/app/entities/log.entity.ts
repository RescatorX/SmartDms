import { LogSeverity, LogType } from "../code/enums";

export class LogEntity {
    title: string;
    source: string[];
    severity: LogSeverity;
    type: LogType;

    get sourceStr(): string {
        return this.source.join(".")
    }

    constructor(title: string, source: string[], severity: LogSeverity, type: LogType) {
        this.title = title;
        this.source = source;
        this.severity = severity;
        this.type = type;
    }
    public static CreateDefault(): LogEntity {
        let log = new LogEntity(undefined, undefined, LogSeverity.Info, LogType.Default);
        return log;
    }

    public static CreateDefaultAction(source: string[]): LogEntity {
        let log = new LogEntity(undefined, source, LogSeverity.Info, LogType.Action);
        return log;
    }

    public static CreateAction(component, source: string | string[]): LogEntity {
        let newSource: string[] = [];
        if (component) {
            newSource.push(component.constructor.name);
        }
        if (source instanceof Array) {
            newSource.push(...source as string[])
        } else {
            newSource.push(source as string);
        }
        // let sourceStr = newSource.join(".");
        let log = LogEntity.CreateDefaultAction(newSource);
        return log;
    }
}
