import { BaseEntity } from "./base.entity";
import { BaseEnumEntity } from "./base-enum.entity";

export class WorkflowStartEntity {

    public documentId: string;
    public documentName: string;
    public documentType: string;
    public remarker: string;
    public approver: string;
    public garant: string;
    public approved: string;
    public userName: string;
    public count: number;
    public workflowType: string;

    constructor(obj: {}) {
        BaseEntity.copyProperties(obj, this);
    }

    /* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
    public toString(): string {
        return "WorkflowStart [documentId=" + this.documentId + ", documentName=" + this.documentName + ", documentType=" + this.documentType +
                ", remarker=" + this.remarker + ", approver=" + this.approver + ", garant=" + this.garant +
                ", approved=" + this.approved + ", workFlowType=" + this.workflowType + "]";
    }

    public static Equals(a: WorkflowStartEntity, b: WorkflowStartEntity): boolean {
        return a.documentId == b.documentId;
    }

    public static IsExists(workflows: WorkflowStartEntity[], workflow: WorkflowStartEntity): boolean {
        let exists: boolean = workflows.findIndex(wf => wf.documentId == workflow.documentId) >= 0;
        return exists;
    }

    public static Add(into: WorkflowStartEntity[], from: WorkflowStartEntity[]) {
        from.forEach(addingItem => {
            if (!WorkflowStartEntity.IsExists(into, addingItem)) {
                into.push(addingItem);
            }
        });
    }
}
