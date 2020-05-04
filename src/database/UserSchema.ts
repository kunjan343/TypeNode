import {Column, Entity} from 'typeorm';
import {DefaultSchema, IDefaultSchema} from './DefaultSchema';

/**
 * Defined interface for user schema
 */
export interface IUser extends IDefaultSchema {
    username: string;
    password: string;
}

/**
 * Define global schema for every database modal
 * It inherits default schema to add global fields.
 */
@Entity('users')
export class UserSchema extends DefaultSchema implements IUser {
    @Column('text', {unique: true})
    public username: string;
    @Column()
    public password: string;
}
