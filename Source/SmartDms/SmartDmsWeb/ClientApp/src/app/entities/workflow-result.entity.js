"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_entity_1 = require("./base.entity");
var WorkflowResultEntity = /** @class */ (function () {
    function WorkflowResultEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
    }
    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    WorkflowResultEntity.prototype.toString = function () {
        return "WorkflowResult [uuid=" + this.uuid + ", userLogin=" + this.userLogin + ", created=" + this.created +
            ", note=" + this.note + ", result=" + this.result + ", documentId=" + this.documentId +
            ", processInstanceId=" + this.processInstanceId + ", workflowName=" + this.workflowName + "]";
    };
    WorkflowResultEntity.Equals = function (a, b) {
        return a.uuid == b.uuid;
    };
    WorkflowResultEntity.IsExists = function (workflows, workflow) {
        var exists = workflows.findIndex(function (wf) { return wf.uuid == workflow.uuid; }) >= 0;
        return exists;
    };
    WorkflowResultEntity.Add = function (into, from) {
        from.forEach(function (addingItem) {
            if (!WorkflowResultEntity.IsExists(into, addingItem)) {
                into.push(addingItem);
            }
        });
    };
    return WorkflowResultEntity;
}());
exports.WorkflowResultEntity = WorkflowResultEntity;
//# sourceMappingURL=workflow-result.entity.js.map