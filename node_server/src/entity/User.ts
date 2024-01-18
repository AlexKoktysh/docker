import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn("uuid")
    id: number;

    @Column("string")
    firstName: string;

    @Column("string")
    lastName: string;
}
