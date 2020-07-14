"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_types_1 = require("../code/data-types");
var GridColumn = /** @class */ (function () {
    /**
     *
     */
    function GridColumn(option) {
        this.prop = option.prop;
        this.type = data_types_1.DataTypes.default;
        if (option.type) {
            this.type = option.type;
        }
        this.hbNameKey = option.hbNameKey;
        this.hbNameValue = option.hbNameValue;
        this.table = this.table;
    }
    Object.defineProperty(GridColumn.prototype, "nameToQuery", {
        get: function () {
            return this.hbNameKey;
        },
        enumerable: true,
        configurable: true
    });
    GridColumn.prototype.extendColumnWithProps = function (column) {
        var _this = this;
        if (column) {
            Object.keys(column).filter(function (key) { return column[key]; }).forEach(function (key) {
                _this[key] = column[key];
            });
        }
    };
    GridColumn.prototype.equals = function (other) {
        if (!other) {
            return false;
        }
        if (this === other) {
            return true;
        }
        return (this.prop == other.prop);
    };
    return GridColumn;
}());
exports.GridColumn = GridColumn;
//# sourceMappingURL=grid-column.js.map