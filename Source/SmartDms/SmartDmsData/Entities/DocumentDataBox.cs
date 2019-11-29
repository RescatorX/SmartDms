using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

using SmartDmsCommon.Extensions;
using SmartDmsData.Entities.Registers;
using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class DocumentDataBox
    {
        [ForeignKey(nameof(Document))]
        public string Id { get; set; } // PK and FK pointing to Document

        /**
         * Inherited document entity.
         */
        public Document Document { get; set; }

        public DateTime? DmAcceptanceTime { get; set; }

        public bool? DmPersonalDelivery { get; set; }

        public string DmAnnotation { get; set; }

        public string DmID { get; set; }

        public string DmRecipientAddress { get; set; }

        public string DbIDRecipient { get; set; }

        public string DmRecipientIdent { get; set; }

        public string DmRecipientRefNumber { get; set; }

        public string DmRecipient { get; set; }

        public string DmSenderAddress { get; set; }

        public string DbIDSender { get; set; }

        public string DmSenderIdent { get; set; }

        public string DmSenderRefNumber { get; set; }

        public string DmSender { get; set; }

        public string DmToHands { get; set; }

        public string AassignedTo { get; set; }

        public DateTime? Created { get; set; }

        public string PathZfo { get; set; }

        public string NameZfo { get; set; }

        public string CategoryMail { get; set; }

        public override string ToString()
        {
            return "DocumentDataBox: [ Id=" + this.Id
                + " ]";
        }
    }
}
