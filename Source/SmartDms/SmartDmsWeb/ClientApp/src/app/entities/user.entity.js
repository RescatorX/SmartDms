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
var base_enum_entity_1 = require("./base-enum.entity");
var role_entity_1 = require("./role.entity");
var UserEntity = /** @class */ (function (_super) {
    __extends(UserEntity, _super);
    function UserEntity(obj) {
        var _this = _super.call(this) || this;
        _this.isInicalized = false;
        return _this;
    }
    Object.defineProperty(UserEntity.prototype, "isAdmin", {
        get: function () {
            if (!this.rolesAll) {
                return false;
            }
            var adminRole = this.rolesAll.find(function (r) { return r == role_entity_1.RoleEntityCollection.administrators; });
            return adminRole ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserEntity.prototype, "fullName", {
        get: function () {
            return [this.lastName, this.firstName, this.title].join(" ");
        },
        enumerable: true,
        configurable: true
    });
    UserEntity.Init = function (user) {
        var userEntity = new UserEntity({});
        base_entity_1.BaseEntity.copyProperties(user, userEntity);
        if (userEntity.rolesAll) {
            userEntity.rolesStr = userEntity.rolesAll.join(base_enum_entity_1.BaseEnumEntity.SEPARATOR);
        }
        userEntity.isInicalized = true;
        return userEntity;
    };
    UserEntity.Equals = function (a, b) {
        return a.userName == b.userName;
    };
    return UserEntity;
}(base_enum_entity_1.BaseEnumEntity));
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map