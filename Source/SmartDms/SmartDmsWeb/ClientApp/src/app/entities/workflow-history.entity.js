"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_entity_1 = require("./base.entity");
var WorkflowHistoryEntity = /** @class */ (function () {
    function WorkflowHistoryEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
    }
    /* (non-Javadoc)
   * @see java.lang.Object#toString()
   */
    WorkflowHistoryEntity.prototype.toString = function () {
        return "WorkflowHistory [id=" + this.id + ", name=" + this.name + ", description=" + this.description + ", wfType=" + this.wfType +
            ", status=" + this.status + ", owner=" + this.owner + ", createdBy=" + this.createdBy + ", createdOn=" + this.createdOn + "]";
    };
    WorkflowHistoryEntity.Equals = function (a, b) {
        return a.id == b.id;
    };
    WorkflowHistoryEntity.IsExists = function (workflows, workflow) {
        var exists = workflows.findIndex(function (wf) { return wf.id == workflow.id; }) >= 0;
        return exists;
    };
    WorkflowHistoryEntity.Add = function (into, from) {
        from.forEach(function (addingItem) {
            if (!WorkflowHistoryEntity.IsExists(into, addingItem)) {
                into.push(addingItem);
            }
        });
    };
    return WorkflowHistoryEntity;
}());
exports.WorkflowHistoryEntity = WorkflowHistoryEntity;
//# sourceMappingURL=workflow-history.entity.js.map