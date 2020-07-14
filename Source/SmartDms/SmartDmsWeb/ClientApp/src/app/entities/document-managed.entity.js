"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_entity_1 = require("./base.entity");
var document_entity_1 = require("./document.entity");
var DocumentManagedEntity = /** @class */ (function (_super) {
    __extends(DocumentManagedEntity, _super);
    function DocumentManagedEntity(obj) {
        var _this = _super.call(this, obj) || this;
        base_entity_1.BaseEntity.copyProperties(obj, _this);
        return _this;
    }
    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    DocumentManagedEntity.prototype.toString = function () {
        return "DocumentManagedEntity [uuid=" + this.uuid + ", name=" + this.name + ", originalName=" + this.originalName
            + ", documentTypeName=" + this.documentTypeName + ", barcode=" + this.barcode + ", acquisitionDate=" + this.acquisitionDate
            + ", acquirer=" + this.acquirer + ", acquisitionSystem=" + this.acquisitionSystem + ", note=" + this.note
            + ", versionNumber=" + this.versionNumber + ", created=" + this.created.toString() + ", modified=" + this.modified
            + ", deleted=" + this.deleted + ", language=" + this.language + ", creator=" + this.creator + ", modifier=" + this.modifier
            + ", owner=" + this.owner + ", acl=" + this.acl + ", lockOwner=" + this.lockOwner + ", dosExtension=" + this.dosExtension
            + ", contentSize=" + this.contentSize + ", registrationNumberPartner=" + this.registrationNumberPartner
            + ", isPublic=" + this.isPublic + ", kindType=" + ((this.kindType != null) ? this.kindType.code : "NULL")
            + ", documentNumberInternal=" + this.documentNumberInternal + ", parentDocumentId=" + this.parentDocument.uuid + "]";
    };
    DocumentManagedEntity.IsExists = function (documents, document) {
        var exists = documents.findIndex(function (si) { return si.uuid == document.uuid; }) >= 0;
        return exists;
    };
    DocumentManagedEntity.Add = function (into, from) {
        from.forEach(function (addingItem) {
            if (!DocumentManagedEntity.IsExists(into, addingItem)) {
                into.push(addingItem);
            }
        });
    };
    DocumentManagedEntity.Equals = function (a, b) {
        return a.uuid == b.uuid;
    };
    return DocumentManagedEntity;
}(document_entity_1.DocumentEntity));
exports.DocumentManagedEntity = DocumentManagedEntity;
//# sourceMappingURL=document-managed.entity.js.map