import { BaseEntity } from "./base.entity";
import { DocumentEntity } from "./document.entity";
import { RegisterEntity } from "./register.entity";

export class DocumentManagedEntity extends DocumentEntity {

  /**
 * isPublic flag to present release workflow result.
 */
  public isPublic: boolean;

  /**
 * isPublic flag to present release workflow result.
 */
  public kindType: RegisterEntity;

  constructor(obj: {}) {
    super(obj);
    BaseEntity.copyProperties(obj, this);
  }

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
  public toString(): string {
    return "DocumentManagedEntity [uuid=" + this.uuid + ", name=" + this.name + ", originalName=" + this.originalName
      + ", documentTypeName=" + this.documentTypeName + ", barcode=" + this.barcode + ", acquisitionDate=" + this.acquisitionDate
      + ", acquirer=" + this.acquirer + ", acquisitionSystem=" + this.acquisitionSystem + ", note=" + this.note
      + ", versionNumber=" + this.versionNumber + ", created=" + this.created.toString() + ", modified=" + this.modified
      + ", deleted=" + this.deleted + ", language=" + this.language + ", creator=" + this.creator + ", modifier=" + this.modifier
      + ", owner=" + this.owner + ", acl=" + this.acl + ", lockOwner=" + this.lockOwner + ", dosExtension=" + this.dosExtension
      + ", contentSize=" + this.contentSize + ", registrationNumberPartner=" + this.registrationNumberPartner
      + ", isPublic=" + this.isPublic + ", kindType=" + ((this.kindType != null) ? this.kindType.code : "NULL")
      + ", documentNumberInternal=" + this.documentNumberInternal + ", parentDocumentId=" + this.parentDocument.uuid + "]";
  }

  public static IsExists(documents: DocumentManagedEntity[], document: DocumentManagedEntity): boolean {
    let exists: boolean = documents.findIndex(si => si.uuid == document.uuid) >= 0;
    return exists;
  }

  public static Add(into: DocumentManagedEntity[], from: DocumentManagedEntity[]) {
    from.forEach(addingItem => {
      if (!DocumentManagedEntity.IsExists(into, addingItem)) {
        into.push(addingItem);
      }
    });
  }

  public static Equals(a: DocumentManagedEntity, b: DocumentManagedEntity): boolean {
    return a.uuid == b.uuid;
  }
}
