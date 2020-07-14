"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_entity_1 = require("./base.entity");
var StatChartEntity = /** @class */ (function () {
    function StatChartEntity(obj) {
        base_entity_1.BaseEntity.copyProperties(obj, this);
    }
    /* (non-Javadoc)
   * @see java.lang.Object#toString()
   */
    StatChartEntity.prototype.toString = function () {
        return "StatChart [id=" + this.id + ", type=" + this.type + ", value=" + this.value + ", color=" + this.color + "]";
    };
    StatChartEntity.Equals = function (a, b) {
        return a.id == b.id;
    };
    StatChartEntity.IsExists = function (charts, chart) {
        var exists = charts.findIndex(function (sc) { return sc.id == chart.id; }) >= 0;
        return exists;
    };
    StatChartEntity.Add = function (into, from) {
        from.forEach(function (addingItem) {
            if (!StatChartEntity.IsExists(into, addingItem)) {
                into.push(addingItem);
            }
        });
    };
    return StatChartEntity;
}());
exports.StatChartEntity = StatChartEntity;
//# sourceMappingURL=stat-chart.entity.js.map