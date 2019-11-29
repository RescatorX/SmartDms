using System;
using System.Collections.Generic;
using System.Text;

namespace SmartDmsData.Entities.Registers
{
    public class LanguageRegister : BaseRegister
    {
        public string ImageContent { get; set; }
        public string ImageMime { get; set; }

        public override string ToString()
        {
            return "LanguageRegister: [ Id=" + this.Id
                + ", Active=" + this.Active
                + ", Code=" + this.Code
                + ", Name=" + this.Name
                + ", Note=" + this.Note
                + ", ImageContent=" + this.ImageContent
                + ", ImageMime=" + this.ImageMime
                + " ]";
        }
    }
}
