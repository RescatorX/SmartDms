"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_entity_1 = require("./base.entity");
var WorkflowModifiedDocumentPropertiesEntity = /** @class */ (function () {
    function WorkflowModifiedDocumentPropertiesEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
    }
    /* (non-Javadoc)
   * @see java.lang.Object#toString()
   */
    WorkflowModifiedDocumentPropertiesEntity.prototype.toString = function () {
        return "WorkflowModifiedDocumentProperties [name=" + this.name + ", value=" + this.value + "]";
    };
    return WorkflowModifiedDocumentPropertiesEntity;
}());
exports.WorkflowModifiedDocumentPropertiesEntity = WorkflowModifiedDocumentPropertiesEntity;
var WorkflowInputDataEntity = /** @class */ (function () {
    function WorkflowInputDataEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
    }
    /* (non-Javadoc)
   * @see java.lang.Object#toString()
   */
    WorkflowInputDataEntity.prototype.toString = function () {
        return "WorkflowInputData [createdBy=" + this.createdBy + ", taskName=" + this.taskName +
            ", nodeName=" + this.nodeName + ", documentId=" + this.documentId +
            ", skippable=" + this.skippable + ", actorId=" + this.actorId + ", isDocumentEditable=" + this.isDocumentEditable +
            ", userName=" + ((this.userName != null) ? this.userName : "null") +
            ", delegateType=" + ((this.delegateType != null) ? this.delegateType : "null") +
            ", workflowStep=" + ((this.workflowStep != null) ? this.workflowStep : "null") +
            ", documentName=" + ((this.documentName != null) ? this.documentName : "null") +
            ", approved=" + ((this.approved != null) ? this.approved : "null") +
            ", message=" + ((this.message != null) ? this.message : "null") +
            ", modifiedProperties=" + ((this.modifiedProperties != null) ? this.modifiedProperties.join(", ") : "null") +
            ", canDelegate=" + this.canDelegate + ", delegates=" + ((this.delegates != null) ? this.delegates.join(", ") : "null") + "]";
    };
    return WorkflowInputDataEntity;
}());
exports.WorkflowInputDataEntity = WorkflowInputDataEntity;
var WorkflowOutputDataEntity = /** @class */ (function () {
    function WorkflowOutputDataEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
    }
    /* (non-Javadoc)
   * @see java.lang.Object#toString()
   */
    WorkflowOutputDataEntity.prototype.toString = function () {
        return "WorkflowOutputData [assigned=" + ((this.assigned != null) ? this.assigned : "null") +
            ", approved=" + ((this.approved != null) ? this.approved : "null") +
            ", message=" + ((this.message != null) ? this.message : "null") +
            ", delegate=" + ((this.delegate != null) ? this.delegate : "null") +
            ", delegateType=" + ((this.delegateType != null) ? this.delegateType : "null") +
            ", p10User=" + ((this.p10User != null) ? this.p10User : "null") +
            ", currentUser=" + ((this.currentUser != null) ? this.currentUser : "null") +
            ", price=" + ((this.price != null) ? this.price : "null") +
            ", userName=" + ((this.userName != null) ? this.userName : "null") +
            ", modifiedProperties=" + ((this.modifiedProperties != null) ? this.modifiedProperties.join(", ") : "null") + "]";
    };
    return WorkflowOutputDataEntity;
}());
exports.WorkflowOutputDataEntity = WorkflowOutputDataEntity;
var WorkflowEntity = /** @class */ (function () {
    function WorkflowEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
    }
    /* (non-Javadoc)
   * @see java.lang.Object#toString()
   */
    WorkflowEntity.prototype.toString = function () {
        return "Workflow [id=" + this.id + ", name=" + this.name + ", description=" + this.description + ", subject=" + this.subject +
            ", priority=" + this.priority + ", taskType=" + this.taskType + ", formName=" + this.formName + ", status=" + this.status +
            ", actualOwner=" + this.actualOwner + ", createdBy=" + this.createdBy + ", createdOn=" + this.createdOn +
            ", activationTime=" + this.activationTime + ", expirationDate=" + this.expirationDate + ", skippable=" + this.skippable +
            ", workItemId=" + this.workItemId + ", workItemId=" + this.workItemId + ", processInstanceId=" + this.processInstanceId +
            ", parentId=" + this.parentId + ", processId=" + this.processId + ", containerId=" + this.containerId +
            ", slaCompliance=" + this.slaCompliance + ", slaDueDate=" + this.slaDueDate +
            ", potentialOwners=" + ((this.potentialOwners != null) ? this.potentialOwners.join(", ") : "null") +
            ", excludedOwners=" + ((this.excludedOwners != null) ? this.excludedOwners.join(", ") : "null") +
            ", businessAdmins=" + ((this.businessAdmins != null) ? this.businessAdmins.join(", ") : "null") +
            ", inputData=" + ((this.inputData != null) ? this.inputData.toString() : "null") +
            ", outputData=" + ((this.outputData != null) ? this.outputData.toString() : "null") + "]";
    };
    WorkflowEntity.Equals = function (a, b) {
        return a.id == b.id;
    };
    WorkflowEntity.IsExists = function (workflows, workflow) {
        var exists = workflows.findIndex(function (wf) { return wf.id == workflow.id; }) >= 0;
        return exists;
    };
    WorkflowEntity.Add = function (into, from) {
        from.forEach(function (addingItem) {
            if (!WorkflowEntity.IsExists(into, addingItem)) {
                into.push(addingItem);
            }
        });
    };
    return WorkflowEntity;
}());
exports.WorkflowEntity = WorkflowEntity;
//# sourceMappingURL=workflow.entity.js.map