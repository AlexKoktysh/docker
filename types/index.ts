export type ToDoListItem = {
    id: number;
    title: string;
};
export type ToDoListItems = Array<{
    name: string;
    items: ToDoListItem[];
    id: string;
}>;
