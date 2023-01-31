import { ButtonColumn, ButtonGroupColumn, ConvertedGridColumn, GridColumn } from "./grid-column";

export class DataGrid {
    constructor(columns: (GridColumn | ButtonColumn | ButtonGroupColumn | ConvertedGridColumn)[]){
        this.gridColumns = columns;
    }

    gridColumns: (GridColumn | ButtonColumn | ButtonGroupColumn | ConvertedGridColumn)[];
}
