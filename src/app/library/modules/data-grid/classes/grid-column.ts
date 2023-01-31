export interface IGridColumn {
    property?: string;
    label?: string;
    cssClass?: string | ((row: any) => string);
}

export interface IButtonColumn extends IGridColumn{
    buttonAction: ((row: any) => void);
}

export interface IGroupedButton {
    buttonAction: ((row: any) => void);
    label?: string;
    cssClass?: string | ((row: any) => string);
}

export interface IConvertedGridColumn extends IGridColumn {
    conversionFunc: ((row: any) => string);
}

export class GridColumn {
    constructor(params: IGridColumn) {
        this.property = params.property;
        this.label = params.label;
        this.cssClass = params.cssClass;
        this.type = GridColumn.name;
    }

    property?: string;
    label?: string;
    cssClass?: string | ((row: any) => string);
    type: string;
}

export class ButtonColumn extends GridColumn {
    constructor(params: IButtonColumn){
        super(params);
        this.buttonAction = params.buttonAction;
        this.type = ButtonColumn.name;
    }
    buttonAction: ((row: any) => void)
}

export class ButtonGroupColumn extends GridColumn {
    constructor(params: IGridColumn, buttons: IGroupedButton[])
    {
        super(params);
        this.buttons = buttons;
        this.type = ButtonGroupColumn.name;
    }

    buttons: IGroupedButton[]
}

export class ConvertedGridColumn extends GridColumn {
    constructor(params: IConvertedGridColumn){
        super(params)
        this.conversionFunc = params.conversionFunc;
        this.type = ConvertedGridColumn.name;
    }

    conversionFunc: ((row: any) => string);
};
