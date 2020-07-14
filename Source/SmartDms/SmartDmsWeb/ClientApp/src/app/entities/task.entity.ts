import { BaseEntity } from "./base.entity";
import { BaseEnumEntity } from "./base-enum.entity";

export class TaskEntity {

  public uuid: string;
  public title: string;
  public note: string;
  public creator: string;
  public created: string;
  public status: string;
  public type: string;
  public documentId: string;
  public taskObject: any;

  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
  }

  /* (non-Javadoc)
 * @see java.lang.Object#toString()
 */
  public toString(): string {
    return "Task [uuid=" + this.uuid + ", title=" + this.title + ", note=" + this.note + ", creator=" + this.creator +
      ", created=" + this.created + ", status=" + this.status + ", type=" + this.type + ", documentId=" + this.documentId + "]";
  }

  public static Equals(a: TaskEntity, b: TaskEntity): boolean {
    return a.uuid == b.uuid;
  }

  public static IsExists(tasks: TaskEntity[], task: TaskEntity): boolean {
    let exists: boolean = tasks.findIndex(si => si.uuid == task.uuid) >= 0;
    return exists;
  }

  public static Add(into: TaskEntity[], from: TaskEntity[]) {
    from.forEach(addingItem => {
      if (!TaskEntity.IsExists(into, addingItem)) {
        into.push(addingItem);
      }
    });
  }
}
