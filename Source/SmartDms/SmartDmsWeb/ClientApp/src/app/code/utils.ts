export class Utils {
    public GetDate(value: string): Date {
        let date = new Date(value);
        return date;
    }

    /**
     * Replace elements in string by object properties.
     * @param str String with replacable elements: {example1}, {example2}
     * @param dict Object: {example1: "test1", example2: "test2"}
     */
    public static Replace(str: string, dict: {}): string {
        Object.keys(dict).forEach(d => {
            str = str.replace("{" + d + "}", dict[d] ? dict[d] : "");
        });
        return str;
    }

    public static FlattenObject(ob): {} {
        var toReturn = {};

        for (var i in ob) {
            if (!ob.hasOwnProperty(i)) continue;

            if ((typeof ob[i]) == 'object') {
                var flatObject = Utils.FlattenObject(ob[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue;

                    toReturn[i + '.' + x] = flatObject[x];
                }
            } else {
                toReturn[i] = ob[i];
            }
        }
        return toReturn;
    };

    public static HashCode(str: string): number {
        var hash = 0, i, chr;
        if (str.length === 0) return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    //not tested, not used
    public static Clone(objToClone): any {
        if (objToClone === undefined) {
            return undefined;
        }
        var cloneObj = new (<any>objToClone.constructor());
        for (var attribut in objToClone) {
            if (typeof this[attribut] === "object") {
                cloneObj[attribut] = Utils.Clone(this);
            } else {
                cloneObj[attribut] = this[attribut];
            }
        }
        return cloneObj;
    }
}