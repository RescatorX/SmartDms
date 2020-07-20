"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_entity_1 = require("./base.entity");
var TrustedArchiveEntity = /** @class */ (function () {
    function TrustedArchiveEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
        // this.keySearch = new Array(this.name, this.uuid, this.documentTypeCode, this.barcode, this.registrationNumberPartner, this.documentNumber, this.documentNumberInternal, this.creator).join(" ");
    }
    TrustedArchiveEntity.KeyColumn = "uuid";
    return TrustedArchiveEntity;
}());
exports.TrustedArchiveEntity = TrustedArchiveEntity;
//# sourceMappingURL=trusted-archive.entity.js.map