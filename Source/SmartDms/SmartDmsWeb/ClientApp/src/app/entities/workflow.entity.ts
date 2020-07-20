import { BaseEntity } from "./base.entity";
import { BaseEnumEntity } from "./base-enum.entity";

export class WorkflowModifiedDocumentPropertiesEntity {

  public name: string;
  public value: string;

  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
  }

  /* (non-Javadoc)
 * @see java.lang.Object#toString()
 */
  public toString(): string {
    return "WorkflowModifiedDocumentProperties [name=" + this.name + ", value=" + this.value + "]";
  }
}

export class WorkflowInputDataEntity {

  public createdBy: string;
  public taskName: string;
  public nodeName: string;
  public documentId: string;
  public skippable: boolean;
  public actorId?: string;
  public approved?: string;
  public message?: string;
  public isDocumentEditable: boolean;
  public modifiedProperties?: string[];
  public canDelegate?: boolean;
  public delegates: string[];
  public userName?: string;
  public delegateType?: string;
  public workflowStep?: string;
  public documentName?: string;

  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
  }

  /* (non-Javadoc)
 * @see java.lang.Object#toString()
 */
  public toString(): string {
    return "WorkflowInputData [createdBy=" + this.createdBy + ", taskName=" + this.taskName +
      ", nodeName=" + this.nodeName + ", documentId=" + this.documentId +
      ", skippable=" + this.skippable + ", actorId=" + this.actorId + ", isDocumentEditable=" + this.isDocumentEditable +
      ", userName=" + ((this.userName != null) ? this.userName : "null") +
      ", delegateType=" + ((this.delegateType != null) ? this.delegateType : "null") +
      ", workflowStep=" + ((this.workflowStep != null) ? this.workflowStep : "null") +
      ", documentName=" + ((this.documentName != null) ? this.documentName : "null") +
      ", approved=" + ((this.approved != null) ? this.approved : "null") +
      ", message=" + ((this.message != null) ? this.message : "null") +
      ", modifiedProperties=" + ((this.modifiedProperties != null) ? this.modifiedProperties.join(", ") : "null") +
      ", canDelegate=" + this.canDelegate + ", delegates=" + ((this.delegates != null) ? this.delegates.join(", ") : "null") + "]";
  }
}

export class WorkflowOutputDataEntity {

  public assigned?: string;
  public approved?: string;
  public message?: string;
  public delegate?: string;
  public price?: number;
  public modifiedProperties?: string[];
  public userName?: string;
  public delegateType?: string;
  public p10User?: string;
  public currentUser?: string;
  public users?: string;

  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
  }

  /* (non-Javadoc)
 * @see java.lang.Object#toString()
 */
  public toString(): string {
    return "WorkflowOutputData [assigned=" + ((this.assigned != null) ? this.assigned : "null") +
      ", approved=" + ((this.approved != null) ? this.approved : "null") +
      ", message=" + ((this.message != null) ? this.message : "null") +
      ", delegate=" + ((this.delegate != null) ? this.delegate : "null") +
      ", delegateType=" + ((this.delegateType != null) ? this.delegateType : "null") +
      ", p10User=" + ((this.p10User != null) ? this.p10User : "null") +
      ", currentUser=" + ((this.currentUser != null) ? this.currentUser : "null") +
      ", price=" + ((this.price != null) ? this.price : "null") +
      ", userName=" + ((this.userName != null) ? this.userName : "null") +
      ", modifiedProperties=" + ((this.modifiedProperties != null) ? this.modifiedProperties.join(", ") : "null") + "]";
  }
}

export class WorkflowEntity {

  public id: number;
  public name: string;
  public description: string;
  public subject: string;
  public priority: number;
  public taskType: string;
  public formName: string;
  public status: string;
  public actualOwner: string;
  public createdBy: string;
  public createdOn: string;
  public activationTime: string;
  public expirationDate: string;
  public skippable: boolean;
  public workItemId: number;
  public processInstanceId: number;
  public parentId: number;
  public processId: string;
  public containerId: string;
  public slaCompliance: string;
  public slaDueDate: string;
  public potentialOwners: string[];
  public excludedOwners: string[];
  public businessAdmins: string[];
  public inputData: WorkflowInputDataEntity;
  public outputData: WorkflowOutputDataEntity;

  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
  }

  /* (non-Javadoc)
 * @see java.lang.Object#toString()
 */
  public toString(): string {
    return "Workflow [id=" + this.id + ", name=" + this.name + ", description=" + this.description + ", subject=" + this.subject +
      ", priority=" + this.priority + ", taskType=" + this.taskType + ", formName=" + this.formName + ", status=" + this.status +
      ", actualOwner=" + this.actualOwner + ", createdBy=" + this.createdBy + ", createdOn=" + this.createdOn +
      ", activationTime=" + this.activationTime + ", expirationDate=" + this.expirationDate + ", skippable=" + this.skippable +
      ", workItemId=" + this.workItemId + ", workItemId=" + this.workItemId + ", processInstanceId=" + this.processInstanceId +
      ", parentId=" + this.parentId + ", processId=" + this.processId + ", containerId=" + this.containerId +
      ", slaCompliance=" + this.slaCompliance + ", slaDueDate=" + this.slaDueDate +
      ", potentialOwners=" + ((this.potentialOwners != null) ? this.potentialOwners.join(", ") : "null") +
      ", excludedOwners=" + ((this.excludedOwners != null) ? this.excludedOwners.join(", ") : "null") +
      ", businessAdmins=" + ((this.businessAdmins != null) ? this.businessAdmins.join(", ") : "null") +
      ", inputData=" + ((this.inputData != null) ? this.inputData.toString() : "null") +
      ", outputData=" + ((this.outputData != null) ? this.outputData.toString() : "null") + "]";
  }

  public static Equals(a: WorkflowEntity, b: WorkflowEntity): boolean {
    return a.id == b.id;
  }

  public static IsExists(workflows: WorkflowEntity[], workflow: WorkflowEntity): boolean {
    let exists: boolean = workflows.findIndex(wf => wf.id == workflow.id) >= 0;
    return exists;
  }

  public static Add(into: WorkflowEntity[], from: WorkflowEntity[]) {
    from.forEach(addingItem => {
      if (!WorkflowEntity.IsExists(into, addingItem)) {
        into.push(addingItem);
      }
    });
  }
}
