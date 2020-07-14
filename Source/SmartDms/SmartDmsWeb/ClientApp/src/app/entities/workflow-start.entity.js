"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_entity_1 = require("./base.entity");
var WorkflowStartEntity = /** @class */ (function () {
    function WorkflowStartEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
    }
    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    WorkflowStartEntity.prototype.toString = function () {
        return "WorkflowStart [documentId=" + this.documentId + ", documentName=" + this.documentName + ", documentType=" + this.documentType +
            ", remarker=" + this.remarker + ", approver=" + this.approver + ", garant=" + this.garant +
            ", approved=" + this.approved + ", workFlowType=" + this.workflowType + "]";
    };
    WorkflowStartEntity.Equals = function (a, b) {
        return a.documentId == b.documentId;
    };
    WorkflowStartEntity.IsExists = function (workflows, workflow) {
        var exists = workflows.findIndex(function (wf) { return wf.documentId == workflow.documentId; }) >= 0;
        return exists;
    };
    WorkflowStartEntity.Add = function (into, from) {
        from.forEach(function (addingItem) {
            if (!WorkflowStartEntity.IsExists(into, addingItem)) {
                into.push(addingItem);
            }
        });
    };
    return WorkflowStartEntity;
}());
exports.WorkflowStartEntity = WorkflowStartEntity;
//# sourceMappingURL=workflow-start.entity.js.map