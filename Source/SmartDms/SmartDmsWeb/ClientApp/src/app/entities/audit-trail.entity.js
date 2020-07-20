"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuditTrailEntity = /** @class */ (function () {
    function AuditTrailEntity() {
    }
    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    AuditTrailEntity.prototype.toString = function () {
        return "Contract [timeStamp=" + this.timeStamp + ", auditedObjectId=" + this.auditedObjectId + ", eventCode=" + this.eventCode
            + ", integrationSystem=" + ((this.integrationSystem != null) ? this.integrationSystem.toString() : "null")
            + ", eventControlId=" + this.eventControlId + ", trackBefore=" + this.trackBefore + ", trackAfter=" + this.trackAfter
            + ", userName=" + this.userName + ", user=" + ((this.user != null) ? this.user.toString() : "null") + ", className=" + this.className + "]";
    };
    return AuditTrailEntity;
}());
exports.AuditTrailEntity = AuditTrailEntity;
//# sourceMappingURL=audit-trail.entity.js.map