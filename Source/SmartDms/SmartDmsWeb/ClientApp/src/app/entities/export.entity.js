"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var selection_grid_mode_1 = require("../code/enums/selection-grid-mode");
var base_entity_1 = require("./base.entity");
var ExportEntity = /** @class */ (function () {
    function ExportEntity() {
        this.typeOfExportedObject = "DOC:DDA_DOC"; // "DOCUMENT", //DOC:DOC
        this.formatOfArchive = "ZIP"; //"TEXT"
    }
    Object.defineProperty(ExportEntity.prototype, "totalSizeMB", {
        get: function () {
            return Math.round(this.totalSize / 1024 / 1024 * 100) / 100;
        },
        enumerable: true,
        configurable: true
    });
    ExportEntity.prototype.toRequest = function () {
        var exportEntityForServer = {
            typeOfExportedObject: this.typeOfExportedObject,
            formatOfArchive: this.formatOfArchive,
            selectionMode: this.selectionMode,
            type: this.type
        };
        switch (this.selectionMode) {
            case selection_grid_mode_1.SelectionGridMode.All: {
                // exportEntityForServer["filter"] = this.query.toFilterQuery();
                exportEntityForServer["filter"] = JSON.stringify(this.query.toFilterQuery());
                break;
            }
            case selection_grid_mode_1.SelectionGridMode.AllWithExclude: {
                exportEntityForServer["filter"] = JSON.stringify(this.query.toFilterQuery());
                // exportEntityForServer["filter"] = this.query.toFilterQuery();
                exportEntityForServer["idsOfExcludedObjects"] = this.notSelectedDocuments.map(function (d) { return d.uuid; });
                break;
            }
            case selection_grid_mode_1.SelectionGridMode.Some: {
                exportEntityForServer["idsOfIncludedObjects"] = this.selectedDocuments.map(function (d) { return d.uuid; });
                break;
            }
        }
        return exportEntityForServer;
    };
    ExportEntity.prototype.setFromResponse = function (response) {
        base_entity_1.BaseEntity.copyProperties(response, this);
        //...
    };
    ExportEntity.prototype.toStartExport = function () {
        var startEntity = this.toRequest();
        startEntity["exportName"] = this.batchName;
        return startEntity;
    };
    return ExportEntity;
}());
exports.ExportEntity = ExportEntity;
//# sourceMappingURL=export.entity.js.map