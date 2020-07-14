import { BaseEntity } from "./base.entity";
import { BaseEnumEntity } from "./base-enum.entity";

export class WorkflowResultEntity {

    public uuid: string;
    public userLogin: string;
    public created: string;
    public note: string;
    public result: boolean;
    public documentId: string;
    public processInstanceId: number;
    public workflowName: string;

    constructor(obj: {}) {
        BaseEntity.copyProperties(obj, this);
    }

    /* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
    public toString(): string {
        return "WorkflowResult [uuid=" + this.uuid + ", userLogin=" + this.userLogin + ", created=" + this.created + 
                ", note=" + this.note + ", result=" + this.result + ", documentId=" + this.documentId + 
                ", processInstanceId=" + this.processInstanceId + ", workflowName=" + this.workflowName + "]";
    }

    public static Equals(a: WorkflowResultEntity, b: WorkflowResultEntity): boolean {
        return a.uuid == b.uuid;
    }

    public static IsExists(workflows: WorkflowResultEntity[], workflow: WorkflowResultEntity): boolean {
        let exists: boolean = workflows.findIndex(wf => wf.uuid == workflow.uuid) >= 0;
        return exists;
    }

    public static Add(into: WorkflowResultEntity[], from: WorkflowResultEntity[]) {
        from.forEach(addingItem => {
            if (!WorkflowResultEntity.IsExists(into, addingItem)) {
                into.push(addingItem);
            }
        });
    }
}
