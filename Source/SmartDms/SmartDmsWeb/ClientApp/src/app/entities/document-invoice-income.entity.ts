import { BaseEntity } from "./base.entity";
import { DocumentEntity } from "./document.entity";
import { RegisterEntity } from "./register.entity";

export class DocumentInvoiceIncomeEntity extends DocumentEntity {

  /**
   * Type of the invoice (Prijata, Vydana, ...). Invoice.code.
   */
    public invoiceType: RegisterEntity;

	  /**
	   * Supplier.
	   */
    public supplier: RegisterEntity;

    /**
   * Purchaser.
   */
    public purchaser: RegisterEntity;

	  /**
	   * Supplier's account.
	   */
    public supplierAccount: string;

	  /**
	   * Supllier's number of the invoice.
	   */
    public supplierInvoiceNumber: string;

	  /**
	   * Issue date.
	   */
    public issueDate: string;

	  /**
	   * DUZP.
	   */
    public duzpDate: string;

	  /**
	   * Due date.
	   */
    public dueDate: string;

	  /**
	   * Cost center.
	   */
    public costCenter: RegisterEntity;

	  /**
	   * Amount with VAT.
	   */
    public amountWithVAT: string;

	  /**
	   * Amount without VAT.
	   */
    public amountWithoutVAT: string;

	  /**
	   * Amount of VAT.
	   */
    public vat: string;

	  /**
	   * Currency.Code.
	   */
    public currency: RegisterEntity;

	  /**
	   * Zaklad DPH 0%
	   */
    public basis0: string;

	  /**
	   * Zaklad DPH 10%
	   */
    public basis10: string;

	  /**
	   * Zaklad DPH 15%
	   */
    public basis15: string;

	  /**
	   * Zaklad DPH 21%
	   */
    public basis21: string;

	  /**
	   * Payment type.
	   */
    public paymentType: RegisterEntity;

	  /**
	   * Variable symbol.
	   */
    public variableSymbol: string;

	  /**
	   * Zaokrouhleni.
	   */
    public rounding: string;

	  /**
	   * Constant symbol.
	   */
    public constantSymbol: string;

	  /**
	   * Specific symbol.
	   */
    public specificSymbol: string;

	  /**
	   * Specific symbol.
	   */
    public internalNumber: string;

	  /**
	   * Specific symbol.
	   */
    public issuer: string;

	  /**
	   * Type of sending - code.
	   */
    public sendingType: RegisterEntity;

    constructor(obj: {}) {
        super(obj);
        BaseEntity.copyProperties(obj, this);
    }

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
    public toString(): string {
        return "DocumentInvoiceIncome [uuid=" + this.uuid + ", name=" + this.name + ", originalName=" + this.originalName
            + ", documentTypeName=" + this.documentTypeName + ", barcode=" + this.barcode + ", acquisitionDate=" + this.acquisitionDate + ", acquirer=" + this.acquirer
            + ", acquisitionSystem=" + this.acquisitionSystem + ", note=" + this.note + ", versionNumber=" + this.versionNumber + ", created=" + this.created.toString() + ", modified=" + this.modified + ", deleted=" + this.deleted + ", language=" + this.language + ", creator="
            + this.creator + ", modifier=" + this.modifier + ", owner=" + this.owner + ", acl=" + this.acl + ", lockOwner=" + this.lockOwner + ", dosExtension=" + this.dosExtension
            + ", contentSize=" + this.contentSize + ", registrationNumberPartner=" + this.registrationNumberPartner + ", documentNumberInternal=" + this.documentNumberInternal
            + "]";
    }

    public static IsExists(documents: DocumentInvoiceIncomeEntity[], document: DocumentInvoiceIncomeEntity): boolean {
        let exists: boolean = documents.findIndex(si => si.uuid == document.uuid) >= 0;
        return exists;
    }

    public static Add(into: DocumentInvoiceIncomeEntity[], from: DocumentInvoiceIncomeEntity[]) {
        from.forEach(addingItem => {
          if (!DocumentInvoiceIncomeEntity.IsExists(into, addingItem)) {
                into.push(addingItem);
            }
        });
    }

    public static Equals(a: DocumentInvoiceIncomeEntity, b: DocumentInvoiceIncomeEntity): boolean {
        return a.uuid == b.uuid;
    }
}
