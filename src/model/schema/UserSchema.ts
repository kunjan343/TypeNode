import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface IUser {
    _id?: string;
    username: string;
    password: string;
}

/**
 * TypeORM Schema Config
 */
@Entity('users')
export class UserSchema implements IUser {
    @PrimaryColumn()
    // tslint:disable-next-line:variable-name
    public _id?: string;
    @Column()
    public username: string;
    @Column()
    public password: string;
}
