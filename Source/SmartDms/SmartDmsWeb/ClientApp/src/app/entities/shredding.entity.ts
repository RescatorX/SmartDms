import { BaseEntity } from "./base.entity";
import { BaseEnumCollectionEntity, BaseEnumEntity } from "./base-enum.entity";

export class ShreddingEntity extends BaseEnumEntity {

  private _created: string;
  private _creatorId: string;
  private _creatorName: string;
  private _planned: string;
  private _stateCode: string;
  private _stateName: string;
  private _typeCode: string;
  private _typeName: string;
  private _uuid: string;
  private _name: string;
  private _filter: string;

  setData(request: any) {
    this._created = request.created;
    this._creatorId = request.creatorId;
    this._creatorName = request.creatorName;
    this._planned = request.planned;
    this._stateCode = request.stateCode;
    this._stateName = request.stateName;
    this._typeCode = request.typeCode;
    this._typeName = request.typeName;
    this._uuid = request.uuid;
    this._name = request.name;
    this._filter = request.filter;
  }


  get created(): string {
    return this._created;
  }

  set created(value: string) {
    this._created = value;
  }

  get creatorId(): string {
    return this._creatorId;
  }

  set creatorId(value: string) {
    this._creatorId = value;
  }

  get creatorName(): string {
    return this._creatorName;
  }

  set creatorName(value: string) {
    this._creatorName = value;
  }

  get planned(): string {
    return this._planned;
  }

  set planned(value: string) {
    this._planned = value;
  }

  get stateCode(): string {
    return this._stateCode;
  }

  set stateCode(value: string) {
    this._stateCode = value;
  }

  get stateName(): string {
    return this._stateName;
  }

  set stateName(value: string) {
    this._stateName = value;
  }

  get typeCode(): string {
    return this._typeCode;
  }

  set typeCode(value: string) {
    this._typeCode = value;
  }

  get typeName(): string {
    return this._typeName;
  }

  set typeName(value: string) {
    this._typeName = value;
  }

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get filter(): string {
    return this._filter;
  }

  set filter(value: string) {
    this._filter = value;
  }
}

export class ShreddingEntityCollection extends BaseEnumCollectionEntity {

}
