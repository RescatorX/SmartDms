import { BaseEntity } from "./base.entity";

export class StatChartEntity {

  public id: number;
  public type: string;
  public value: number;
  public color: string;

  constructor(obj: {}) {
    BaseEntity.copyProperties(obj, this);
  }

  /* (non-Javadoc)
 * @see java.lang.Object#toString()
 */
  public toString(): string {
    return "StatChart [id=" + this.id + ", type=" + this.type + ", value=" + this.value + ", color=" + this.color + "]";
  }

  public static Equals(a: StatChartEntity, b: StatChartEntity): boolean {
    return a.id == b.id;
  }

  public static IsExists(charts: StatChartEntity[], chart: StatChartEntity): boolean {
    let exists: boolean = charts.findIndex(sc => sc.id == chart.id) >= 0;
    return exists;
  }

  public static Add(into: StatChartEntity[], from: StatChartEntity[]) {
    from.forEach(addingItem => {
      if (!StatChartEntity.IsExists(into, addingItem)) {
        into.push(addingItem);
      }
    });
  }
}
