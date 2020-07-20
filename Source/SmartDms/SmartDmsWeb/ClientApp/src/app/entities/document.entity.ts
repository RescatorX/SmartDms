import { BaseEntity } from "./base.entity";

export enum DocumentType {
  Common,
  Attachment
}

export class DocumentEntity {

  public static readonly defaultDuration: number = 5;

  public documentType: DocumentType = DocumentType.Common;

  public static readonly KeyColumn = "uuid";

	/**
     * A unique UUID of the document instance.
     */
  public uuid: string;

  /**
   * Name the document.
   */
  public name: string;

  /**
   * Original name of the document (the name under which the document's content was inserted).
   */
  public originalName: string;

  /**
   * Type of the document
   */
  public documentTypeName: string;
  public documentTypeCode: string;

  /**
 * Barcode.
 */
  public barcode: string;

	/**
	 * Date of acquisition.
	 */

  public acquisitionDate: Date;

	/**
	 * Who acquired the document into the system (who scanned, ...).
	 */
  public acquirer: string;

	/**
	 * Where the document was acquired into the system (scanner ID, ...).
	 */
  public acquisitionSystem: string;

  /**
   * Note.
   */
  public note: string;

  /**
   * Version number of the document.
   */
  public versionNumber: Number;

  /**
   * Time when the document has been created.
   */
  public created: Date;

  /**
   * Who created this document.
   */
  public creator: string;

  /**
   * Last time when the document has been modified.
   */
  public modified: Date;

  /**
   * Who last modified this document.
   */
  public modifier: string;

  /**
   * Indicates whether the document is deleted (in the litter bin).
   */
  public deleted: Boolean = false;

  /**
   * Language of the document.
   */
  public language: string;

  /**
   * Who owns this document.
   */
  public owner: string;

  /**
 * Who is intended to solve this document within its approval. It can be either the user or the role.  
 */
  public solver: string;

	/**
	 * Former solvers - only users, roles are not allowed here.
	 */
  public formerSolvers: string[];

  /**
   * ACL of this document.
   */
  public acl: string;

  /**
   * If filled, then the document is locked and here is the user who has this document reserved.
   */
  public lockOwner: string;

  /**
  * Date and time when the document has been locked last time.
  */
  public locked: Date;

  /**
   * Content encoded under Base64 encoding.
   */
  public content: string;

  /**
   * Code of the format. See kmc_format.code.
   */
  public format: string;

  /**
   * DOS Extension of the primary rendition.
   */
  public dosExtension: string;

  /**
   * Content size in bytes.
   */
  public contentSize: number;

  /**
   * Registration (company) number.
   */
  public registrationNumberOwner: string;

  /**
  * Partner's registration (company) number of the partner.
  */
  public registrationNumberPartner: string;

  /**
 * Internal number of the document.
 */
  public documentNumber: string;

  /**
 * Internal number of the document.
 */
  public documentNumberInternal: string;

	/**
	 * Document date.
	 */
  public documentDate: Date;

  public keySearch: string;

  public taMethod: string;

  public taState: string;

  public workflowType: string;

  public workflowState: string;

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

  /**
   * Priznak, zda se jedna o novou verzi smlouvy (true) nebo o prilohu smlouvy (false).
   */
  public candidate?: boolean;

  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
    this.keySearch = new Array(this.name, this.uuid, this.documentTypeCode, this.barcode, this.registrationNumberPartner, this.documentNumber, this.documentNumberInternal, this.creator).join(" ");
  }
}
