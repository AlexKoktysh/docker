import { Entity, Column, ObjectIdColumn, ObjectId } from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({
        type: String,
        default: "",
    })
    firstName: string;

    @Column({
        type: String,
        default: "",
    })
    lastName: string;

    @Column("string")
    email: string;

    @Column("string")
    password: string;
}
