export type CardStatusType =
    | "TO_DO"
    | "IN_PROGRESS"
    | "IN_TEST"
    | "IN_COMPLETED";

export type Card = {
    _id?: string;
    title?: string;
    description?: string;
    status?: CardStatusType;
};
export type ToDoListItems = Array<{
    name: string;
    items: Card[];
    id: string;
    status: CardStatusType;
}>;
