import { BaseEntity } from "./base.entity";
import { BaseEnumCollectionEntity, BaseEnumEntity } from "./base-enum.entity";

export class ShreddingItemEntity extends BaseEnumEntity {
  created: boolean;
  creatorId: string;
  creatorName: string;
  planned: string;
  stateCode: string;
  stateName: string;
  typeCode: string;
  typeName: string;
  uuid: string;
}

export class ShreddingItemEntityCollection extends BaseEnumCollectionEntity {
}
