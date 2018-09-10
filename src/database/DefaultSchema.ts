import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

export interface IDefaultSchema {
    _id?: ObjectID;
    createdAt?: Date;
    updatedAt?: Date;
}

@Entity()
export class DefaultSchema {
    @ObjectIdColumn()
    // tslint:disable-next-line:variable-name
    public _id: ObjectID;
    @Column()
    public createdAt: Date;
    @Column()
    public updatedAt: Date;
}
