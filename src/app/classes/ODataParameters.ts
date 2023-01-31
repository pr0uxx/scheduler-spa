export class ODataParameters {
  filter?: ODataFilter[];
  select?: string[];
  orderBy?: ODataOrder[];
  top: number = 100;
  skip: number = 0;

  public buildQueryString(): string {
    const str = [
      `${this.filter ? this.buildFilterString() : ''}`,
      `${this.select ? this.buildSelectString() : ''}`,
      `${this.orderBy ? this.buildOrderString() : ''}`,
      `$skip=${this.skip}`,
      `$top=${this.top}`
    ].reduce((l, r) => {
      if (r.length > 0) {
        return l + `${l.length > 0 ? `&${r}` : r}`;
      }
      return l;
    });

    return '?' + str;
  }

  private buildSelectString() {
    return `$select=${this.select?.join(',')}`;
  }

  private buildOrderString() {
    return `$orderby=${this.orderBy?.map(x => `${x.property} ${x.type}`).join(',')}`;
  }


  private buildFilterString(): string {
    if (!this.filter || this.filter.length == 0) return '';

    return this.filter.map((x, index) => {
      if (index > 0 && !x.operatorPrefix) throw new Error("Only first element in array can have undefined operator prefix");
      let str: string = '';
      if (x.searchOperator === 'eq' || x.searchOperator == 'ne') {
        str += `${x.operatorPrefix ?? ''} (${x.searchOperator} ${x.searchFor})`;
      } else {
        str += `${x.operatorPrefix ?? ''} ${x.searchOperator}(${x.propName},${x.propType === 'string' ? `'${x.searchFor}'` : x.searchFor})`;
      }
      return "$filter=" + str;
    }).join(' ');
  }
}

export class ODataFilter {
  constructor(
    propName: string,
    propType: 'string' | 'other',
    searchFor: string,
    searchOperator: 'eq' | 'ne' | 'contains' | 'startswith' | 'endswith',
    operatorPrefix?: 'AND' | 'OR'
  ) {
    this.propName = propName;
    this.propType = propType;
    this.searchFor = searchFor;
    this.searchOperator = searchOperator;
    this.operatorPrefix = operatorPrefix;
  }

  propName: string;
  propType: 'string' | 'other';
  searchFor: string;
  searchOperator: 'eq' | 'ne' | 'contains' | 'startswith' | 'endswith';
  operatorPrefix?: 'AND' | 'OR';

}

export class ODataOrder {
  constructor(property: string, type: 'asc' | 'desc') {
    this.property = property;
    this.type = type;
  }

  property: string;
  type: 'asc' | 'desc';
}
