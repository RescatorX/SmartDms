"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_entity_1 = require("./base.entity");
var DocumentDataBoxEntity = /** @class */ (function () {
    function DocumentDataBoxEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
        this.keySearch = new Array(this.nameZfo, this.uuid, this.dmID).join(" ");
    }
    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    DocumentDataBoxEntity.prototype.toString = function () {
        return "DocumentDataBoxEntity [uuid=" + this.uuid + ", nameZfo=" + this.nameZfo + ", dmID" + this.dmID + "]";
    };
    DocumentDataBoxEntity.IsExists = function (documents, document) {
        var exists = documents.findIndex(function (si) { return si.uuid == document.uuid; }) >= 0;
        return exists;
    };
    DocumentDataBoxEntity.Add = function (into, from) {
        from.forEach(function (addingItem) {
            if (!DocumentDataBoxEntity.IsExists(into, addingItem)) {
                into.push(addingItem);
            }
        });
    };
    DocumentDataBoxEntity.Equals = function (a, b) {
        return a.uuid == b.uuid;
    };
    DocumentDataBoxEntity.KeyColumn = "uuid";
    return DocumentDataBoxEntity;
}());
exports.DocumentDataBoxEntity = DocumentDataBoxEntity;
//# sourceMappingURL=document-databox.entity.js.map