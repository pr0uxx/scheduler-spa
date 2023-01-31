import { IEntity } from "../base/i-entity";

export interface IDepartment extends IEntity {
    name: string;
    companyId: number;
}
