export abstract class BaseEntity {

    public constructor() {
    }

    public static EntityReplacer(key, value) {
        if (key == 'id') return undefined;
        if (key == 'ID') return undefined;
        if (key[0] == '_') return undefined;
        return value;
    }

    public static copyProperties(source, destination, overwrite = true) {
        for (var key in source) {
            // let desc = Object.getOwnPropertyDescriptor(destination, key);
            try {
                if (overwrite || destination[key] === undefined) {
                    destination[key] = source[key];
                }
            } catch{ }//sry for that. property could be readonly/only getter and its hard to acces all CLASS properties.
        }
    }

    public static isEmpty(str): boolean {
        var isNullOrEmpty: boolean = str == undefined || str == null || str == "";
        return isNullOrEmpty;
    }
    public static isNotEmpty(str): boolean {
        return !BaseEntity.isEmpty(str);
    }
}
