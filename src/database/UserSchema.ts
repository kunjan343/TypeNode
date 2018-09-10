import { Column, Entity } from 'typeorm';
import { DefaultSchema, IDefaultSchema } from './DefaultSchema';

export interface IUser extends IDefaultSchema {
    username: string;
    password: string;
}

/**
 * TypeORM Schema Config
 */
@Entity('users')
export class UserSchema extends DefaultSchema implements IUser {
    @Column()
    public username: string;
    @Column()
    public password: string;
}
