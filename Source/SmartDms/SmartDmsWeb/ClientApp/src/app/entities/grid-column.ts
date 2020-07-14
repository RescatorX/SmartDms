import { DataTypes } from "../code/data-types";

export class GridColumn {
  prop: string;
  type: DataTypes;
  hbNameKey: string;
  hbNameValue: string;
  table: string;

  get nameToQuery() {
    return this.hbNameKey;
  }
  /**
   *
   */
  public constructor(option: { prop?: string, type?: DataTypes, hbNameKey?: string, hbNameValue?: string, table?: string }) {
    this.prop = option.prop;
    this.type = DataTypes.default;
    if (option.type) {
      this.type = option.type;
    }
    this.hbNameKey = option.hbNameKey;
    this.hbNameValue = option.hbNameValue;
    this.table = this.table;
  }

  public extendColumnWithProps(column: GridColumn) {
    if (column) {
      Object.keys(column).filter(key => column[key]).forEach(key => {
        this[key] = column[key];
      });
    }
  }

  public equals(other: GridColumn): boolean {
    if (!other) {
      return false;
    }
    if (this === other) {
      return true;
    }

    return (this.prop == other.prop);
  }
}
