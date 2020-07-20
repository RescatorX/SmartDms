import { BaseEntity } from "./base.entity";

export class GroupRegisterEntity {
  public name: string;
  public members: string[];

  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
  }
}

export class GroupsRegisterEntity {
  public groups: GroupRegisterEntity[];

  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
  }
}

export class RegisterEntity {

  public active: boolean;
  public code: string;
  public name: string;
  public note: string;

  public regNumber: string;
  public vatNumber: string;

  public mimeType: string;
  public dosExtension: string;

  public imageContent: string;
  public imageMime: string;

  public storageType: number;

  public group: string;

  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
  }

  /* (non-Javadoc)
 * @see java.lang.Object#toString()
 */
  public toString(): string {
    return "Register [active=" + this.active + ", code=" + this.code + ", name=" + this.name + ", note=" + this.note +
      ", regNumber=" + this.regNumber + ", vatNumber=" + this.vatNumber +
      ", mimeType=" + this.mimeType + ", dosExtension=" + this.dosExtension +
      ", imageContent=" + this.imageContent + ", imageMime=" + this.imageMime +
      ", storageType=" + this.storageType + ", group=" + this.group + "]";
  }

  public static Equals(a: RegisterEntity, b: RegisterEntity): boolean {
    return a.code == b.code;
  }
}
