import { BaseEntity } from "./base.entity";
import { BaseEnumCollectionEntity, BaseEnumEntity } from "./base-enum.entity";

export class RoleEntity extends BaseEnumEntity {
    active: boolean;
    email: string;
    membersAll: string[];
    membersDirect: string[];
    name: string;
    note: string;
    parentRolesAll: string[];
    parentRolesDirect: string[];
    uuid: string;
}

export class RoleEntityCollection extends BaseEnumCollectionEntity {

    // shreddingOperators
    public static readonly administrators: string = "administrators";
    public static readonly docManagers: string = "docManagers";
    public static readonly shreddingOperator: string = "shreddingOperators";
    public static readonly shreddingManager: string = "shreddingManagers";
}
