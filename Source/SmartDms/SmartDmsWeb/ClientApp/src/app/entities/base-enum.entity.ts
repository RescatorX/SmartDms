import { BaseEntity } from "./base.entity";

export class BaseEnumEntity {
    public static SEPARATOR: string = ";";
    // public readonly SEPARATOR: string = ";";

    public key: any;
    public value: string;
    public data: any;

    public constructor(key: any = undefined, value: string = undefined) {
        this.value = value;
        this.key = key;
        this.data = {};
    }

    public isKeyNumber(key = this.key): boolean {
        let isKeyNumber = typeof (key) == "number";// || !isNaN(Number(key));
        return isKeyNumber;
    }
    public isKeyBool(key = this.key): boolean {
        let isKeyBool = typeof (key) == "boolean";
        return isKeyBool;
    }

    public isEqual(someKey: any, enableMultipleKey: boolean = false): boolean {
        if (enableMultipleKey) {
            //binarni AND
            if (this.isKeyNumber(someKey)) {
                var numberKey: number = Number(someKey);
                var isEqual = (((this.key as number) & numberKey) > 0);
                return isEqual;
            } else if (typeof (someKey) == "string") {
                var stringKey: string = BaseEnumEntity.SEPARATOR + (someKey as string) + BaseEnumEntity.SEPARATOR;
                var isEqual = stringKey.indexOf(this.key as string) >= 0;
                return isEqual;
            }
        } else {
            var isEqual = this.key == someKey; //ok also for bool
            return isEqual;
        }
    }
}

export class BaseEnumCollectionEntityConfig {
    public enableMultipleKey?: boolean = false;
    public keyProperty?: string = "code";
    public valueProperty?: string = "value";
    public dataProperty?: string = "data";
}

export class BaseEnumCollectionEntity {

    public entities: BaseEnumEntity[] = [];
    // public enableMultipleKey: boolean = false;
    public config: BaseEnumCollectionEntityConfig = new BaseEnumCollectionEntityConfig;

    //by the first entity.key detect if key is number
    public isKeyNumber(): boolean {
        if (this.entities.length > 0) {
            let isKeyNumber = this.entities[0].isKeyNumber();
            return isKeyNumber
        }
        return undefined;
    }
    //by the first entity.key detect if key is number
    public isKeyBool(): boolean {
        if (this.entities.length > 0) {
            let isKeyBool = this.entities[0].isKeyBool();
            return isKeyBool
        }
        return undefined;
    }

    /**
     * 
     * @param collection default is {code, value}
     * @param config 
     */
    public constructor(collection?: {}[], config: BaseEnumCollectionEntityConfig = new BaseEnumCollectionEntityConfig()) {
        this.config = config;
        if (collection) {
            collection.forEach(i => {
                this.add(i);
            });
        }
    }

    public getByKey(key: any): BaseEnumEntity[] {
        return this.entities.filter(e => e.isEqual(key, this.config.enableMultipleKey));
    }

    public getByKeyFirst(key: any): BaseEnumEntity {
        return this.entities.find(e => e.isEqual(key, this.config.enableMultipleKey));
    }

    public getByValue(value: string): BaseEnumEntity[] {
        return this.entities.filter(e => e.value == value);
    }

    public ensureByValueFirst(value: string): BaseEnumEntity {
        var item = this.entities.find(e => e.value == value);
        if (item != undefined) {
            item = new BaseEnumEntity(null, value);
            this.entities.push(item);
        }
        return item;
    }

    public add(i: {}): BaseEnumEntity {
        let initEntity = new BaseEnumEntity(i[this.config.keyProperty], i[this.config.valueProperty]);
        if (this.config.dataProperty == "this") {
            initEntity.data = i;
            Object.entries(i).forEach(e => {
                initEntity[e[0]] = e[1];
            });
        } else if (i[this.config.dataProperty]) {
            initEntity.data = i[this.config.dataProperty];
        }
        this.entities.push(initEntity);
        return initEntity;
    }


    public serializeAnswerValue() {
        if (this.isKeyNumber()) {
            var newanswerKeyNumber: number = undefined;
            this.entities.filter(e => e.data && e.data.isActive).forEach(e => {
                newanswerKeyNumber = newanswerKeyNumber | Number(e.key);
            });
            return newanswerKeyNumber;
        } else if (this.isKeyBool()) {
            let answer = this.entities.find(e => e.data && e.data.isActive);
            return answer ? answer.key : undefined;
        } else {
            var newanswerKey: string = "";
            this.entities.filter(e => e.data && e.data.isActive).forEach(e => {
                newanswerKey += this.config.enableMultipleKey ? (BaseEnumEntity.SEPARATOR + e.key + BaseEnumEntity.SEPARATOR) : e.key;
            });
            return newanswerKey;
        }
    }

    public get length(): number {
        return this.entities.length;
    }


    /**
     * Update entity in local collection
     * @param newEntity Entity to update
     * @param keyValue Entity key to update. It's not set, key will be taken from newEntity[this.config.keyProperty]
     */
    public updateEntity(newEntity: BaseEntity, keyValue?): BaseEnumEntity {
        if (!keyValue) {
            keyValue = newEntity[this.config.keyProperty];
        }
        let updatedEntity = this.getByKeyFirst(keyValue);
        BaseEntity.copyProperties(newEntity, updatedEntity);
        return updatedEntity;
    }

    // public addToKey(answer, key: T) {

    //     //when questin is multiple there will be syntax: ";answer1;;answer2;"
    //     //when questin isnot multiple there will be syntax: "answer1"
    //     //when qusetion key is number, there will be logical and of answers 3 = 1,2
    //     if (this.isTNumber()) {
    //     } else {
    //         var answerValueWithAddedKey: number;
    //         var newanswerKey = this.enableMultipleKey ? (BaseEnumEntity.SEPARATOR + answer.key + BaseEnumEntity.SEPARATOR) : answer.key;
    //         if (answer.data.isActive) {
    //             answerValueWithAddedKey = this.question.answerValue + newanswerKey; //doesn't make a sens when notMultiSect, but this is solved below
    //         } else {
    //             this.question.answerValue = this.question.answerValue.toString().replace(newanswerKey, "");
    //         }
    //     }
    // }

}