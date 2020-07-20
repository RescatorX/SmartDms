import { IntegrationSystemEntity } from "./integration-system.entity";
import { UserEntity } from "./user.entity";

export class AuditTrailEntity {

  /**
 * The time at which the audit trail was generated.
 */
  public timeStamp: Date;

	/**
	 * UUID of the audited object.
	 */
  public auditedObjectId: string;

  /**
 * Code of the event.
 */
  public eventCode: string;

	/**
	 * Code of the integration system.
	 */
  public integrationSystem: IntegrationSystemEntity;

	/**
	 * ID of the event source control.
	 */
  public eventControlId: string;

	/**
	 * Snapshot of data just before the event in JSON format.
	 */
  public trackBefore: string;

	/**
	 * Snapshot of data just after the event in JSON format.
	 */
  public trackAfter: string;

	/**
	 * Name of the user whose work caused the event to occur.	
	 */
  public userName: string;

	/**
	 * User whose work caused the event to occur.
	 */
  public user: UserEntity;

	/**
	 * Name of the class of tracked object.
	 */
  public className: string;

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
  public toString(): string {
    return "Contract [timeStamp=" + this.timeStamp + ", auditedObjectId=" + this.auditedObjectId + ", eventCode=" + this.eventCode
      + ", integrationSystem=" + ((this.integrationSystem != null) ? this.integrationSystem.toString() : "null")
      + ", eventControlId=" + this.eventControlId + ", trackBefore=" + this.trackBefore + ", trackAfter=" + this.trackAfter
      + ", userName=" + this.userName + ", user=" + ((this.user != null) ? this.user.toString() : "null") + ", className=" + this.className + "]";
  }
}
