import { BaseEnumEntity, BaseEnumCollectionEntity } from "./base-enum.entity";
import { Utils } from "../code/utils";
import { BaseEntity } from "./base.entity";
import { RoleEntityCollection } from "./role.entity";

export class ShreddingFormEntity extends BaseEnumEntity {

  active: boolean = false;

  public get isActive(): boolean {
    return this.active;
  }
  public set isActive(v: boolean) {
    this.active = v
  }


  changePassword: boolean = false;
  public get isChangePassword(): boolean {
    return this.changePassword;
  }
  public set isChangePassword(v: boolean) {
    this.changePassword = v;
  }

  documentType: string;
  shreddingChar: string;
  owner: string;
  partner: string;
  docDateFrom: string;
  docDateTo: string;
  createdFrom: string;
  createdTo: string;
  queueId: string;
  queueTypeCode: string;


  creatorId: string;
  creatorName: string;
  created: string;
  planned: string;
  stateCode: string;
  stateName: string;
  typeCode: string;
  typeName: string;
  uuid: string;

  email: string;
  firstname: string;
  login: string;
  name: string;
  nameRefine: string;
  note: string;
  rolesDirect: string[];
  rolesAll: string[];
  surname: string;
  type: number;
  rolesStr: string;
  password: string;

  isInicalized: boolean = false;

  get isAdmin(): boolean {
    if (!this.rolesDirect) {
      return false;
    }
    let adminRole = this.rolesDirect.find(r => r == RoleEntityCollection.administrators);
    return adminRole ? true : false;
  }

  get fullName(): string {
    return [this.surname, this.firstname, this.nameRefine].join(" ");
  }

  public static Init(user): ShreddingFormEntity {
    let userEntity = new ShreddingFormEntity();
    BaseEntity.copyProperties(user, userEntity);
    if (userEntity.rolesDirect) {
      userEntity.rolesStr = userEntity.rolesDirect.join(BaseEnumEntity.SEPARATOR);
    }
    userEntity.isInicalized = true;
    return userEntity;
  }

  public static Equals(a: ShreddingFormEntity, b: ShreddingFormEntity): boolean {
    return a.login == b.login;
  }
}
