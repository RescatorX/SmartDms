import { BaseEntity } from "./base.entity";
import { DocumentEntity } from "./document.entity";
import { UserEntity } from "./user.entity";
import { RegisterEntity } from "./register.entity";

export class DocumentContractEntity extends DocumentEntity {

  /**
	 * Contract number.
	 */
  public contractNumber: string;

	/**
	 * Index (order number) of the contract to create a contract number.
	 */
  public index: number;

  /**
 * Record type (Druh záznamu).
 * Pro generování čísel smluv, S Smlouva O Objednávka.
 */
  public recordType: string;

	/**
	 * Position (Postavení).
	 * Výběr z hodnot D – Dodavatel, O - Odběratel , X – Nevyplněno. Výchozí hodnota je „O - Odběratel“.
	 */
  public position: string;

	/**
	 * Contract type (Typ smlouvy).
	 * Výběr z číselníku typů smluv.
	 */
  public contractType: RegisterEntity;

	/**
	 * Organizational unit (Organizační jednotka).
	 * Z číselníku organizačních jednotek, pro řízení oprávnění na záznam.
	 */
  public orgUnit: RegisterEntity;

	/**
	 * Order (Zakázka).
	 */
  public order: string;

	/**
	 * Subject (Předmět smlouvy).
	 * Jednořádkové textové pole.	
	 */
  public subjectOfContract: string;

	/**
	 * Contract partners (Smluvní partneři).
	 * Našeptá nad polem název a IČ, minimálně 3 znaky. Po výběru zobrazuje Název: IČ. Lze vložit více subjektů.
	 */
  public contractPartners: RegisterEntity[];

	/**
	 * Contract date (Datum uzavření).
	 */
  public contractDate: string;

	/**
	 * Valid from (Platnost od).
	 */
  public validFrom: string;

	/**
	 * Valid to (Platnost do).
	 */
  public validTo: string;

	/**
	 * Validity type (Typ platnosti).
	 * Výběr z číselníku typů platnosti.
	 */
  public contractValidityType: RegisterEntity;

	/**
	 * Due date (Termín plnění).
	 */
  public dueDate: string;

	/**
	 * Warranty to (Záruka do).
	 */
  public warrantyTo: string;

	/**
	 * Warranty note (Poznámka k záruce).
	 */
  public warrantyNote: string;

	/**
	 * Payment (Plnění).
	 */
  public payment: number;

	/**
	 * Currency (Měna).
	 * Výběr z číselníku měn
	 */
  public currency: RegisterEntity;

	/**
	 * VAT type (DPH).
	 * Výběr hodnot	Hodnoty „s DPH“ a „bez DPH“ ve vztahu k částce v poli „Plnění“.
	 */
  public vatType: string;

	/**
	 * Garant
	 * Určení věcně odpovědného zaměstance.
	 */
  public garant: UserEntity;

	/**
	 * Year of origin (Rok vzniku).
	 * Slouží pro vytvoření čísla smlouvy, lze změnit pro založení smlouvy zpětně.
	 */
  public originYear: number;

	/**
	 * Extraordinary notification date (Mimořádná notifikace).
	 * Lze využít pro odeslání upozornění v zadaný den.
	 */
  public extraordinaryNotification: string;

	/**
	 * Send to ISRS (Odeslat do ISRS).	
	 */
  public sendToISRS: boolean;

	/**
	 * Historical contract (Historická smlouva).
	 * Umožní vložit původní číslo smlouvy a negenerovat z číselné řady.
	 */
  public historicalContract: boolean;

	/**
	 * Attachment incremental version.
	 */
  public version: number;

	/**
	 * Pripominkovatel
	 * Určení věcně odpovědného zaměstance za pripominkovani WF.
	 */
  public remarker: UserEntity;

	/**
	 * Schvalovatel
	 * Určení věcně odpovědného zaměstance za schvalovani WF.
	 */
  public approver: UserEntity;

  constructor(obj: {}) {
    super(obj);
    BaseEntity.copyProperties(obj, this);
  }

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
  public toString(): string {
    return "DocumentContract [uuid=" + this.uuid + ", name=" + this.name + ", originalName=" + this.originalName
      + ", documentTypeName=" + this.documentTypeName + ", barcode=" + this.barcode + ", acquisitionDate=" + this.acquisitionDate + ", acquirer=" + this.acquirer
      + ", acquisitionSystem=" + this.acquisitionSystem + ", note=" + this.note + ", versionNumber=" + this.versionNumber + ", created=" + this.created.toString()
      + ", modified=" + this.modified + ", deleted=" + this.deleted + ", language=" + this.language + ", creator=" + this.creator + ", modifier=" + this.modifier
      + ", owner=" + this.owner + ", acl=" + this.acl + ", lockOwner=" + this.lockOwner + ", dosExtension=" + this.dosExtension
      + ", contentSize=" + this.contentSize + ", registrationNumberPartner=" + this.registrationNumberPartner + ", documentNumberInternal=" + this.documentNumberInternal
      + "]";
  }

  public static IsExists(documents: DocumentContractEntity[], document: DocumentContractEntity): boolean {
    let exists: boolean = documents.findIndex(si => si.uuid == document.uuid) >= 0;
    return exists;
  }

  public static Add(into: DocumentContractEntity[], from: DocumentContractEntity[]) {
    from.forEach(addingItem => {
      if (!DocumentContractEntity.IsExists(into, addingItem)) {
        into.push(addingItem);
      }
    });
  }

  public static Equals(a: DocumentContractEntity, b: DocumentContractEntity): boolean {
    return a.uuid == b.uuid;
  }
}
