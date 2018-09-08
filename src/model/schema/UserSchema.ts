import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface AddressDTO {
    _id?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

/**
 * TypeORM Schema Config
 */
@Entity('address')
export class AddressDbSchema implements AddressDTO {
    @PrimaryColumn()
    // tslint:disable-next-line:variable-name
    public _id?: string;
    @Column()
    public address1: string;
    @Column()
    public address2?: string;
    @Column()
    public city: string;
    @Column()
    public state: string;
    @Column()
    public zip: string;
    @Column()
    public country: string;
}
