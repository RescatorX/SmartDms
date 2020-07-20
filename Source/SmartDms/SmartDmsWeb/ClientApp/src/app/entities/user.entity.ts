import { BaseEntity } from "./base.entity";
import { BaseEnumEntity } from "./base-enum.entity";
import { RoleEntityCollection, RoleEntity } from "./role.entity";
import { extend } from "webdriver-js-extender";

export interface IUser {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    rolesAll: string[];
}

export class UserEntity extends BaseEnumEntity implements IUser {

    public id: string;
    public title: string;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public rolesAll: string[];
    public rolesStr: string;
    public isChangePassword: boolean;

    constructor(obj: {}) {
        super();
    }

    isInicalized: boolean = false;

    get isAdmin(): boolean {
        if (!this.rolesAll) {
            return false;
        }
        let adminRole = this.rolesAll.find(r => r == RoleEntityCollection.administrators);
        return adminRole ? true : false;
    }

    get fullName(): string {
        return [this.lastName, this.firstName, this.title].join(" ");
    }

    public static Init(user): UserEntity {
        let userEntity = new UserEntity({});
        BaseEntity.copyProperties(user, userEntity);
        if (userEntity.rolesAll) {
            userEntity.rolesStr = userEntity.rolesAll.join(BaseEnumEntity.SEPARATOR);
        }
        userEntity.isInicalized = true;
        return userEntity;
    }

    public static Equals(a: UserEntity, b: UserEntity): boolean {
        return a.userName == b.userName;
    }
}
