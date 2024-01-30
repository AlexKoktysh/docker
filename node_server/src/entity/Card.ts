import { Entity, ObjectIdColumn, Column, ObjectId } from "typeorm";
import { CardStatus } from "../types/enums";

@Entity()
export class Card {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column("string")
    title: string;

    @Column("string")
    description: string;

    @Column({
        type: String,
        enum: Object.values(CardStatus),
        default: CardStatus.TO_DO,
    })
    status: CardStatus;

    @Column("string")
    assignUser: string;
}
