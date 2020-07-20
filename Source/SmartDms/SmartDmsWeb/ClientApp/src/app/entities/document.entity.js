"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_entity_1 = require("./base.entity");
var DocumentType;
(function (DocumentType) {
    DocumentType[DocumentType["Common"] = 0] = "Common";
    DocumentType[DocumentType["Attachment"] = 1] = "Attachment";
})(DocumentType = exports.DocumentType || (exports.DocumentType = {}));
var DocumentEntity = /** @class */ (function () {
    function DocumentEntity(obj) {
        this.documentType = DocumentType.Common;
        /**
         * Indicates whether the document is deleted (in the litter bin).
         */
        this.deleted = false;
        base_entity_1.BaseEntity.copyProperties(obj, this);
        this.keySearch = new Array(this.name, this.uuid, this.documentTypeCode, this.barcode, this.registrationNumberPartner, this.documentNumber, this.documentNumberInternal, this.creator).join(" ");
    }
    DocumentEntity.defaultDuration = 5;
    DocumentEntity.KeyColumn = "uuid";
    return DocumentEntity;
}());
exports.DocumentEntity = DocumentEntity;
//# sourceMappingURL=document.entity.js.map