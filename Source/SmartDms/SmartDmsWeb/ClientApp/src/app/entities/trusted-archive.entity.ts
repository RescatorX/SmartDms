import { BaseEntity } from "./base.entity";

export class TrustedArchiveEntity {

  public static readonly KeyColumn = "uuid";

	/**
     * A unique UUID of the trusted archive record instance.
     */
  public uuid: string;

  /**
   * Time when the trusted archive record has been created.
   */
  public created: Date;

  /**
   * The name of archiving system.
   */
  public creatingSystemName: string;

  /**
   * The name of account which created record.
   */
  public creatorName: string;

  public documentId: string;

  public documentStateInTA: number;

  public documentStorageName: string;

  public locationName: string;

  public stampTime: Date;

  public stampTimeExp: Date;

  public stamped: boolean;

  public taDocId: string;


  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
    // this.keySearch = new Array(this.name, this.uuid, this.documentTypeCode, this.barcode, this.registrationNumberPartner, this.documentNumber, this.documentNumberInternal, this.creator).join(" ");
  }

  //     public Document(uuid, firstVersionUuid, name, originalName, documentType,
  //         barcode, acquisitionDate, acquirer, acquisitionSystem,
  //         note, versionNumber, versionLabel, created, modified,
  //         deleted, language, creator, modifier, owner, acl, lockOwner, lifecycle,
  //         lifecycleState, content, format, dosExtension, contentSize,
  //         registrationNumberPartner, documentNumberInternal) {
  //         this.uuid = uuid;
  //         this.name = name;
  //         this.originalName = originalName;
  //         this.documentType = documentType;
  //         this.barcode = barcode;
  //         this.acquisitionDate = acquisitionDate;
  //         this.acquirer = acquirer;
  //         this.acquisitionSystem = acquisitionSystem;
  //         this.note = note;
  //         this.versionNumber = versionNumber;
  //         this.created = created;
  //         this.modified = modified;
  //         this.deleted = deleted;
  //         this.language = language;
  //         this.creator = creator;
  //         this.modifier = modifier;
  //         this.owner = owner;
  //         this.acl = acl;
  //         this.lockOwner = lockOwner;
  //         this.content = content;
  //         this.format = format;
  //         this.dosExtension = dosExtension;
  //         this.contentSize = contentSize;
  //         this.registrationNumberPartner = registrationNumber;
  //         this.documentNumberInternal = documentNumberInternal;
  //     }
  // */

  // 	/* (non-Javadoc)
  // 	 * @see java.lang.Object#toString()
  // 	 */
  //     public toString(): string {
  //         return "Document [uuid=" + this.uuid + ", name=" + this.name + ", originalName=" + this.originalName
  //             + ", documentTypeName=" + this.documentTypeName + ", barcode=" + this.barcode + ", acquisitionDate=" + this.acquisitionDate + ", acquirer=" + this.acquirer
  //             + ", acquisitionSystem=" + this.acquisitionSystem + ", note=" + this.note + ", versionNumber=" + this.versionNumber + ", created=" + this.created.toString() + ", modified=" + this.modified + ", deleted=" + this.deleted + ", language=" + this.language + ", creator="
  //             + this.creator + ", modifier=" + this.modifier + ", owner=" + this.owner + ", acl=" + this.acl + ", lockOwner=" + this.lockOwner + ", dosExtension=" + this.dosExtension
  //             + ", contentSize=" + this.contentSize + ", registrationNumberPartner=" + this.registrationNumberPartner + ", documentNumberInternal=" + this.documentNumberInternal + "]";
  //     }


  //     public static IsExists(documents: DocumentEntity[], document: DocumentEntity): boolean {
  //         let exists: boolean = documents.findIndex(si => si.uuid == document.uuid) >= 0;
  //         return exists;
  //     }

  //     public static Add(into: DocumentEntity[], from: DocumentEntity[]) {
  //         from.forEach(addingItem => {
  //             if (!DocumentEntity.IsExists(into, addingItem)) {
  //                 into.push(addingItem);
  //             }
  //         });
  //     }

  //     public static Equals(a: DocumentEntity, b: DocumentEntity): boolean {
  //         return a.uuid == b.uuid;
  //     }
}
