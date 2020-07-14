"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_entity_1 = require("./base.entity");
var TaskEntity = /** @class */ (function () {
    function TaskEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
    }
    /* (non-Javadoc)
   * @see java.lang.Object#toString()
   */
    TaskEntity.prototype.toString = function () {
        return "Task [uuid=" + this.uuid + ", title=" + this.title + ", note=" + this.note + ", creator=" + this.creator +
            ", created=" + this.created + ", status=" + this.status + ", type=" + this.type + ", documentId=" + this.documentId + "]";
    };
    TaskEntity.Equals = function (a, b) {
        return a.uuid == b.uuid;
    };
    TaskEntity.IsExists = function (tasks, task) {
        var exists = tasks.findIndex(function (si) { return si.uuid == task.uuid; }) >= 0;
        return exists;
    };
    TaskEntity.Add = function (into, from) {
        from.forEach(function (addingItem) {
            if (!TaskEntity.IsExists(into, addingItem)) {
                into.push(addingItem);
            }
        });
    };
    return TaskEntity;
}());
exports.TaskEntity = TaskEntity;
//# sourceMappingURL=task.entity.js.map