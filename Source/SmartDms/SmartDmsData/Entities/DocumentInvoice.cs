using System;
using System.Collections.Generic;
using System.Text;

using SmartDmsCommon.Extensions;
using SmartDmsData.Entities.Registers;
using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class DocumentInvoice : BaseEntity
    {
        /**
         * Inherited document entity.
         */
        public Document Document { get; set; }

        /**
	     * Type of the invoice (Prijata, Vydana, ...). Invoice.code.
	     */
        public InvoiceTypeRegister InvoiceType { get; set; }

        /**
	     * Supplier.
	     */
        public SubjectRegister Supplier { get; set; }

        /**
	     * Purchaser.
	     */
        public SubjectRegister Purchaser { get; set; }

        /**
	     * Supplier's account.
	     */
        public string SupplierAccount { get; set; }

        /**
	     * Supllier's number of the invoice.
	     */
        public string SupplierInvoiceNumber { get; set; }

        /**
	     * Issue date.
	     */
        public DateTime? IssueDate { get; set; }

        /**
	     * DUZP.
	     */
        public DateTime? DuzpDate { get; set; }

        /**
	     * Due date.
	     */
        public DateTime? DueDate { get; set; }

        /**
	     * Cost center.
	     */
        public CostCenterRegister CostCenter { get; set; }

        /**
	     * Amount with VAT.
	     */
        public decimal AmountWithVAT { get; set; }

        /**
	     * Amount without VAT.
	     */
        public decimal AmountWithoutVAT { get; set; }

        /**
	     * Amount of VAT.
	     */
        public decimal Vat { get; set; }

        /**
	     * Currency.Code.
	     */
        public CurrencyRegister Currency { get; set; }

        /**
	     * Zaklad DPH 0%
	     */
        public decimal Basis0 { get; set; }

        /**
	     * Zaklad DPH 10%
	     */
        public decimal Basis10 { get; set; }

        /**
	     * Zaklad DPH 15%
	     */
        public decimal Basis15 { get; set; }

        /**
	     * Zaklad DPH 21%
	     */
        public decimal Basis21 { get; set; }

        /**
	     * Payment type.
	     */
        public PaymentTypeRegister PaymentType { get; set; }

        /**
	     * Variable symbol.
	     */
        public string VariableSymbol { get; set; }

        /**
	     * Zaokrouhleni.
	     */
        public decimal Rounding { get; set; }

        /**
	     * Constant symbol.
	     */
        public string ConstantSymbol { get; set; }

        /**
	     * Specific symbol.
	     */
        public string SpecificSymbol { get; set; }

        /**
	     * Specific symbol.
	     */
        public string InternalNumber { get; set; }

        /**
	     * Issuer.
	     */
        public User Issuer { get; set; }

        /**
	     * Type of sending - code.
	     */
        public SendingTypeRegister SendingType { get; set; }

        public override string ToString()
        {
            return "DocumentInvoice: [ Id=" + this.Id
                + " ]";
        }
    }
}
