import { BaseEntity } from "./base.entity";
import { DocumentEntity } from "./document.entity";

export class DocumentDataBoxEntity {

  public static readonly KeyColumn = "uuid";

	/**
     * A unique UUID of the document instance.
     */
  public uuid: string;

  public dmAcceptanceTime: Date;

  public dmPersonalDelivery: boolean;

  public dmAnnotation: string;

  public dmID: string;

  public dmRecipientAddress: string;

  public dbIDRecipient: string;

  public dmRecipientIdent: string;

  public dmRecipientRefNumber: string;

  public dmRecipient: string;

  public dmSenderAddress: string;

  public dbIDSender: string;

  public dmSenderIdent: string;

  public dmSenderRefNumber: string;

  public dmSender: string;

  public dmToHands: string;

  public assignedTo: string;

  public created: Date;

  public pathZfo: string;

  public nameZfo: string;

  public categoryMail: string;

  /**
   * Content encoded under Base64 encoding.
   */
  public content: string;

  /**
   * Content size in bytes.
   */
  public contentSize: number;

  public keySearch: string;

  /**
 * Nadrazeny dokument.
 * Dokument, k nemuz je tento logicky pripojen.
 */
  public parentDocument: DocumentEntity;

	/**
	 * Seznam podrazenych dokumentu.
	 * Seznam dokumentu, ktere jsou k tomuto loginky pripojeny.
	 */
  public documents: DocumentEntity[];

  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
    this.keySearch = new Array(this.nameZfo, this.uuid, this.dmID).join(" ");
  }

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
  public toString(): string {
    return "DocumentDataBoxEntity [uuid=" + this.uuid + ", nameZfo=" + this.nameZfo + ", dmID" + this.dmID + "]";
  }

  public static IsExists(documents: DocumentDataBoxEntity[], document: DocumentDataBoxEntity): boolean {
    let exists: boolean = documents.findIndex(si => si.uuid == document.uuid) >= 0;
    return exists;
  }

  public static Add(into: DocumentDataBoxEntity[], from: DocumentDataBoxEntity[]) {
    from.forEach(addingItem => {
      if (!DocumentDataBoxEntity.IsExists(into, addingItem)) {
        into.push(addingItem);
      }
    });
  }

  public static Equals(a: DocumentDataBoxEntity, b: DocumentDataBoxEntity): boolean {
    return a.uuid == b.uuid;
  }
}
