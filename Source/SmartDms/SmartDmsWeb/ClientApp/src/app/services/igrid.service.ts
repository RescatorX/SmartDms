import { Observable } from "rxjs/Observable";
import { QueryEntity } from "../entities/query.entity";
import { GridColumn } from "../entities/grid-column";

export interface IGridService {
  getValuesFromColumn(column: GridColumn, query?: QueryEntity): Observable<{ key, value }[]>;
}
