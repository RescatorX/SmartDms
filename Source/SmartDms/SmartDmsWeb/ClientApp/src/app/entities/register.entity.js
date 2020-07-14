"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_entity_1 = require("./base.entity");
var GroupRegisterEntity = /** @class */ (function () {
    function GroupRegisterEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
    }
    return GroupRegisterEntity;
}());
exports.GroupRegisterEntity = GroupRegisterEntity;
var GroupsRegisterEntity = /** @class */ (function () {
    function GroupsRegisterEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
    }
    return GroupsRegisterEntity;
}());
exports.GroupsRegisterEntity = GroupsRegisterEntity;
var RegisterEntity = /** @class */ (function () {
    function RegisterEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
    }
    /* (non-Javadoc)
   * @see java.lang.Object#toString()
   */
    RegisterEntity.prototype.toString = function () {
        return "Register [active=" + this.active + ", code=" + this.code + ", name=" + this.name + ", note=" + this.note +
            ", regNumber=" + this.regNumber + ", vatNumber=" + this.vatNumber +
            ", mimeType=" + this.mimeType + ", dosExtension=" + this.dosExtension +
            ", imageContent=" + this.imageContent + ", imageMime=" + this.imageMime +
            ", storageType=" + this.storageType + ", group=" + this.group + "]";
    };
    RegisterEntity.Equals = function (a, b) {
        return a.code == b.code;
    };
    return RegisterEntity;
}());
exports.RegisterEntity = RegisterEntity;
//# sourceMappingURL=register.entity.js.map