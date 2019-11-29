using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

using SmartDmsCommon.Extensions;
using SmartDmsData.Entities.Registers;
using SmartDmsData.Enums;

namespace SmartDmsData.Entities
{
    public class DocumentManaged
    {
        [ForeignKey(nameof(Document))]
        public string Id { get; set; } // PK and FK pointing to Document

        /**
         * Inherited document entity.
         */
        public Document Document { get; set; }

        /**
	     * isPublic flag to present release workflow result.
	     */
        public bool IsPublic { get; set; }

        /**
	     * Specific kind type of the document.
	     */
        public KindTypeRegister KindType { get; set; }

        public override string ToString()
        {
            return "DocumentManaged: [ Id=" + this.Id
                + " ]";
        }
    }
}
