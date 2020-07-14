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
var base_enum_entity_1 = require("./base-enum.entity");
var base_entity_1 = require("./base.entity");
var role_entity_1 = require("./role.entity");
var ShreddingFormEntity = /** @class */ (function (_super) {
    __extends(ShreddingFormEntity, _super);
    function ShreddingFormEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.active = false;
        _this.changePassword = false;
        _this.isInicalized = false;
        return _this;
    }
    Object.defineProperty(ShreddingFormEntity.prototype, "isActive", {
        get: function () {
            return this.active;
        },
        set: function (v) {
            this.active = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShreddingFormEntity.prototype, "isChangePassword", {
        get: function () {
            return this.changePassword;
        },
        set: function (v) {
            this.changePassword = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShreddingFormEntity.prototype, "isAdmin", {
        get: function () {
            if (!this.rolesDirect) {
                return false;
            }
            var adminRole = this.rolesDirect.find(function (r) { return r == role_entity_1.RoleEntityCollection.administrators; });
            return adminRole ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShreddingFormEntity.prototype, "fullName", {
        get: function () {
            return [this.surname, this.firstname, this.nameRefine].join(" ");
        },
        enumerable: true,
        configurable: true
    });
    ShreddingFormEntity.Init = function (user) {
        var userEntity = new ShreddingFormEntity();
        base_entity_1.BaseEntity.copyProperties(user, userEntity);
        if (userEntity.rolesDirect) {
            userEntity.rolesStr = userEntity.rolesDirect.join(base_enum_entity_1.BaseEnumEntity.SEPARATOR);
        }
        userEntity.isInicalized = true;
        return userEntity;
    };
    ShreddingFormEntity.Equals = function (a, b) {
        return a.login == b.login;
    };
    return ShreddingFormEntity;
}(base_enum_entity_1.BaseEnumEntity));
exports.ShreddingFormEntity = ShreddingFormEntity;
//# sourceMappingURL=shredding-form.entity.js.map