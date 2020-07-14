"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var QueryEntity = /** @class */ (function () {
    function QueryEntity() {
        // sortDest: boolean;
        this.expressions = new Array();
        this.expressionsTranslated = new Array();
        this.expressionsRaw = new Array();
    }
    /**
     * Return query part
     */
    QueryEntity.prototype.toSQL = function () {
        var separator = "&";
        var params = new Array();
        this.offset ? params.push("offset=" + this.offset) : null;
        this.limit ? params.push("limit=" + this.limit) : null;
        // this.sort ? params.push("sort=ORDER BY " + this.sort + " " + this.sortDest ? "DESC" : "ASC") : null;
        this.sort ? params.push("sort=ORDER BY " + this.sort + " " + this.sortDirection) : null;
        if (this.expressions && this.expressions.length > 0) {
            var filterSeparator = " AND ";
            var filter = "filter=WHERE " + this.expressions.join(filterSeparator);
            params.push(filter);
        }
        var query = "";
        if (params.length > 0) {
            query = "?" + params.join(separator);
        }
        return encodeURI(query);
        // return query;
    };
    /**
     * For column filter
     */
    QueryEntity.prototype.getWhere = function (filterInternal) {
        if (filterInternal === void 0) { filterInternal = false; }
        // readonly filterUrl: string="/api/search?hql=SELECT DISTINCT [hbColumnName] FROM DocumentEntity WHERE [where]";
        var params = new Array();
        if (filterInternal) {
            params.push(" WHERE internal=false");
        }
        var filterSeparator = " AND ";
        if (this.expressions && this.expressions.length > 0) {
            var filter = this.expressions.join(filterSeparator);
            params.push(filter);
        }
        return params.join(filterSeparator);
    };
    /**
     * get query params to fulltext request
     * return ?limit=30&searchKeys=Test&filters=LOWER(barcode) LIKE '%12%',LOWER(documentTypeName) LIKE '%dda%'"
    */
    QueryEntity.prototype.toSearchQuery = function () {
        var separator = "&";
        var params = new Array();
        this.offset ? params.push("offset=" + this.offset) : null;
        this.limit ? params.push("limit=" + this.fulltextLimit) : null;
        if (this.searchKeys) {
            params.push("searchKeys=" + this.searchKeys.join(","));
        }
        // if(this.documentIds){
        //     params.push("documentIds=" + this.documentIds.join(","));
        // }
        if (this.expressions && this.expressions.length > 0) {
            params.push("filters=" + this.expressions.join(","));
        }
        var query = "";
        if (params.length > 0) {
            query = "?" + params.join(separator);
        }
        return encodeURI(query);
    };
    /**
     * last implementation - hopefully and finally
     * used in export
        {
            "type": "FLAT",
            "statement":
            {
                "operator": "AND",
                "operands":
                    [
                        { "entityName": "DDA_Documents", "columnName": "name", "operator": "LIKE", "value": "VALUE1" },
                        { "entityName": "DocumentEntity", "columnName": "created", "operator": "<", "value": "22.12.2018" }
                    ]
            }
        }
  
     */
    QueryEntity.prototype.toFilterQuery = function () {
        var filter = {
            "type": "FLAT",
            "statement": {
                "operator": "AND",
                "operands": [
                // { "entityName": "DDA_Documents", "columnName": "name", "operator": "LIKE", "value": "VALUE1" },
                // { "entityName": "DocumentEntity", "columnName": "created", "operator": "<", "value": "22.12.2018" }
                ]
            }
        };
        //chceme vse
        // if (this.offset) {
        //     filter["offset"] = this.offset;
        // }
        // if (this.limit) {
        //     filter["limit"] = this.limit;
        // }
        if (this.sort) {
            filter["sort"] = this.sort + " " + this.sortDirection;
        }
        var statements = __spreadArrays(this.expressionsRaw);
        statements.forEach(function (s) {
            s["entityName"] = "DDA_Documents";
            filter.statement.operands.push(s);
        });
        return filter;
    };
    QueryEntity.prototype.Equals = function (other, includePaging) {
        if (includePaging === void 0) { includePaging = false; }
        if (!other) {
            return false;
        }
        if (this.expressions.length != other.expressions.length) {
            return false;
        }
        if (includePaging && (this.offset != other.offset || this.limit != other.limit)) {
            return false;
        }
        if (JSON.stringify(this.searchKeys) !== JSON.stringify(other.searchKeys)) {
            return false;
        }
        for (var index = 0; index < this.expressions.length; index++) {
            if (this.expressions[index] != other.expressions[index]) {
                return false;
            }
        }
        return true;
    };
    return QueryEntity;
}());
exports.QueryEntity = QueryEntity;
//# sourceMappingURL=query.entity.js.map