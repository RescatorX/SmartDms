"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.GetDate = function (value) {
        var date = new Date(value);
        return date;
    };
    /**
     * Replace elements in string by object properties.
     * @param str String with replacable elements: {example1}, {example2}
     * @param dict Object: {example1: "test1", example2: "test2"}
     */
    Utils.Replace = function (str, dict) {
        Object.keys(dict).forEach(function (d) {
            str = str.replace("{" + d + "}", dict[d] ? dict[d] : "");
        });
        return str;
    };
    Utils.FlattenObject = function (ob) {
        var toReturn = {};
        for (var i in ob) {
            //if (!ob.hasOwnProperty(i)) continue;
            if ((typeof ob[i]) == 'object') {
                var flatObject = Utils.FlattenObject(ob[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x))
                        continue;
                    toReturn[i + '.' + x] = flatObject[x];
                }
            }
            else {
                toReturn[i] = ob[i];
            }
        }
        return toReturn;
    };
    ;
    Utils.HashCode = function (str) {
        var hash = 0, i, chr;
        if (str.length === 0)
            return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
    ;
    //not tested, not used
    Utils.Clone = function (objToClone) {
        if (objToClone === undefined) {
            return undefined;
        }
        var cloneObj = new (objToClone.constructor());
        for (var attribut in objToClone) {
            if (typeof this[attribut] === "object") {
                cloneObj[attribut] = Utils.Clone(this);
            }
            else {
                cloneObj[attribut] = this[attribut];
            }
        }
        return cloneObj;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map