using System;
using System.Collections.Generic;
using System.Text;

using SmartDmsCommon.Extensions;
using SmartDmsData.Entities.Registers;
using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class DocumentContract : BaseEntity
    {
        /**
         * Inherited document entity.
         */
        public Document Document { get; set; }

        /**
         * Contract number.
         */
        public string ContractNumber { get; set; }

        /**
         * Index (order number) of the contract to create a contract number.
         */
        public decimal Index { get; set; }

        /**
         * Record type (Druh záznamu).
         * Pro generování čísel smluv, S Smlouva O Objednávka.
         */
        public string RecordType { get; set; }

        /**
         * Position (Postavení).
         * Výběr z hodnot D – Dodavatel, O - Odběratel , X – Nevyplněno. Výchozí hodnota je „O - Odběratel“.
         */
        public string Position { get; set; }

        /**
         * Contract type (Typ smlouvy).
         * Výběr z číselníku typů smluv.
         */
        public ContractTypeRegister ContractType { get; set; }

        /**
         * Organizational unit (Organizační jednotka).
         * Z číselníku organizačních jednotek, pro řízení oprávnění na záznam.
         */
        public OrgUnitRegister OrgUnit { get; set; }

        /**
         * Order (Zakázka).
         */
        public string Order { get; set; }

        /**
         * Subject (Předmět smlouvy).
         * Jednořádkové textové pole.	
         */
        public string SubjectOfContract { get; set; }
	
	    /**
	     * Contract partners (Smluvní partneři).
	     * Našeptá nad polem název a IČ, minimálně 3 znaky. Po výběru zobrazuje Název: IČ. Lze vložit více subjektů.
	     */
	    public SubjectRegister[] ContractPartners { get; set; }

        /**
         * Contract date (Datum uzavření).
         */
        public DateTime? ContractDate { get; set; }

        /**
         * Valid from (Platnost od).
         */
        public DateTime? ValidFrom { get; set; }

        /**
         * Valid to (Platnost do).
         */
        public DateTime? ValidTo { get; set; }

        /**
         * Validity type (Typ platnosti).
         * Výběr z číselníku typů platnosti.
         */
        public ContractValidityTypeRegister ContractValidityType { get; set; }

        /**
         * Due date (Termín plnění).
         */
        public DateTime? DueDate { get; set; }

        /**
         * Warranty to (Záruka do).
         */
        public DateTime? WarrantyTo { get; set; }

        /**
         * Warranty note (Poznámka k záruce).
         */
        public string WarrantyNote { get; set; }

        /**
         * Payment (Plnění).
         */
        public decimal Payment { get; set; }

        /**
         * Currency (Měna).
         * Výběr z číselníku měn
         */
        public CurrencyRegister Currency { get; set; }

        /**
         * VAT type (DPH).
         * Výběr hodnot	Hodnoty „s DPH“ a „bez DPH“ ve vztahu k částce v poli „Plnění“.
         */
        public string VatType { get; set; }

        /**
         * Garant
         * Určení věcně odpovědného zaměstance.
         */
        public User Garant { get; set; }

        /**
         * Year of origin (Rok vzniku).
         * Slouží pro vytvoření čísla smlouvy, lze změnit pro založení smlouvy zpětně.
         */
        public int OriginYear { get; set; }

        /**
         * Extraordinary notification date (Mimořádná notifikace).
         * Lze využít pro odeslání upozornění v zadaný den.
         */
        public DateTime? ExtraordinaryNotification { get; set; }

        /**
         * Send to ISRS (Odeslat do ISRS).	
         */
        public bool SendToISRS { get; set; }

        /**
         * Historical contract (Historická smlouva).
         * Umožní vložit původní číslo smlouvy a negenerovat z číselné řady.
         */
        public bool HistoricalContract { get; set; }

        /**
         * Attachment incremental version.
         */
        public int Version { get; set; }

        /**
         * Pripominkovatel
         * Určení věcně odpovědného zaměstance za pripominkovani WF.
         */
        public User Remarker { get; set; }

        /**
         * Schvalovatel
         * Určení věcně odpovědného zaměstance za schvalovani WF.
         */
        public User Approver { get; set; }

        public override string ToString()
        {
            return "DocumentContract: [ Id=" + this.Id
                + " ]";
        }
    }
}
