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
var ShreddingEntity = /** @class */ (function (_super) {
    __extends(ShreddingEntity, _super);
    function ShreddingEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShreddingEntity.prototype.setData = function (request) {
        this._created = request.created;
        this._creatorId = request.creatorId;
        this._creatorName = request.creatorName;
        this._planned = request.planned;
        this._stateCode = request.stateCode;
        this._stateName = request.stateName;
        this._typeCode = request.typeCode;
        this._typeName = request.typeName;
        this._uuid = request.uuid;
        this._name = request.name;
        this._filter = request.filter;
    };
    Object.defineProperty(ShreddingEntity.prototype, "created", {
        get: function () {
            return this._created;
        },
        set: function (value) {
            this._created = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShreddingEntity.prototype, "creatorId", {
        get: function () {
            return this._creatorId;
        },
        set: function (value) {
            this._creatorId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShreddingEntity.prototype, "creatorName", {
        get: function () {
            return this._creatorName;
        },
        set: function (value) {
            this._creatorName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShreddingEntity.prototype, "planned", {
        get: function () {
            return this._planned;
        },
        set: function (value) {
            this._planned = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShreddingEntity.prototype, "stateCode", {
        get: function () {
            return this._stateCode;
        },
        set: function (value) {
            this._stateCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShreddingEntity.prototype, "stateName", {
        get: function () {
            return this._stateName;
        },
        set: function (value) {
            this._stateName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShreddingEntity.prototype, "typeCode", {
        get: function () {
            return this._typeCode;
        },
        set: function (value) {
            this._typeCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShreddingEntity.prototype, "typeName", {
        get: function () {
            return this._typeName;
        },
        set: function (value) {
            this._typeName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShreddingEntity.prototype, "uuid", {
        get: function () {
            return this._uuid;
        },
        set: function (value) {
            this._uuid = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShreddingEntity.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShreddingEntity.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        set: function (value) {
            this._filter = value;
        },
        enumerable: true,
        configurable: true
    });
    return ShreddingEntity;
}(base_enum_entity_1.BaseEnumEntity));
exports.ShreddingEntity = ShreddingEntity;
var ShreddingEntityCollection = /** @class */ (function (_super) {
    __extends(ShreddingEntityCollection, _super);
    function ShreddingEntityCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ShreddingEntityCollection;
}(base_enum_entity_1.BaseEnumCollectionEntity));
exports.ShreddingEntityCollection = ShreddingEntityCollection;
//# sourceMappingURL=shredding.entity.js.map