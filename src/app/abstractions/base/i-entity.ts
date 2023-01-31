export interface IEntity {
    id?: number;
    createdDateUtc: Date;
    updatedDateUtc?: Date;
    createdBy: string;
    updatedBy?: string;
}
