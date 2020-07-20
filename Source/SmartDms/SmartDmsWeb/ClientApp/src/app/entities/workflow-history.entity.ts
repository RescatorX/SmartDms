import { BaseEntity } from "./base.entity";
import { BaseEnumEntity } from "./base-enum.entity";

export class WorkflowHistoryEntity {

  public id: number;
  public name: string;
  public description: string;
  public wfType: string;
  public status: string;
  public owner: string;
  public createdBy: string;
  public createdOn: string;

  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
  }

  /* (non-Javadoc)
 * @see java.lang.Object#toString()
 */
  public toString(): string {
    return "WorkflowHistory [id=" + this.id + ", name=" + this.name + ", description=" + this.description + ", wfType=" + this.wfType +
      ", status=" + this.status + ", owner=" + this.owner + ", createdBy=" + this.createdBy + ", createdOn=" + this.createdOn + "]";
  }

  public static Equals(a: WorkflowHistoryEntity, b: WorkflowHistoryEntity): boolean {
    return a.id == b.id;
  }

  public static IsExists(workflows: WorkflowHistoryEntity[], workflow: WorkflowHistoryEntity): boolean {
    let exists: boolean = workflows.findIndex(wf => wf.id == workflow.id) >= 0;
    return exists;
  }

  public static Add(into: WorkflowHistoryEntity[], from: WorkflowHistoryEntity[]) {
    from.forEach(addingItem => {
      if (!WorkflowHistoryEntity.IsExists(into, addingItem)) {
        into.push(addingItem);
      }
    });
  }
}
