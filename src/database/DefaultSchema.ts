import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

/**
 * Defined interface for default schema
 */
export interface IDefaultSchema {
    _id?: ObjectID;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Define global schema for every database modal.
 * Structure follows TypeORM schema defination.
 */
@Entity()
export class DefaultSchema implements IDefaultSchema {
    @ObjectIdColumn()
    // tslint:disable-next-line:variable-name
    public _id: ObjectID;
    @Column()
    public createdAt: Date;
    @Column()
    public updatedAt: Date;
}
