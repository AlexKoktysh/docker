import type { ToDoListItem, ToDoListItems } from "~/types";

type RootState = {
    items: ToDoListItems;
    dragElement?: ToDoListItem;
    leavingZone?: string;
};

export const useToDoListStore = defineStore("toDoList", {
    state: () =>
        ({
            items: [
                {
                    name: "Index.toDo",
                    items: [
                        { id: 1, title: "toDo 1" },
                        { id: 2, title: "toDo 2" },
                        { id: 3, title: "toDo 3" },
                    ],
                    id: "dropzone1",
                },
                {
                    name: "Index.inProgress",
                    items: [
                        { id: 4, title: "inProgress 1" },
                        { id: 5, title: "inProgress 2" },
                        { id: 6, title: "inProgress 3" },
                    ],
                    id: "dropzone2",
                },
                {
                    name: "Index.inTest",
                    items: [
                        { id: 7, title: "inTest 1" },
                        { id: 8, title: "inTest 2" },
                        { id: 9, title: "inTest 3" },
                    ],
                    id: "dropzone3",
                },
                {
                    name: "Index.inCompleted",
                    items: [
                        { id: 10, title: "inCompleted 1" },
                        { id: 11, title: "inCompleted 2" },
                        { id: 12, title: "inCompleted 3" },
                    ],
                    id: "dropzone4",
                },
            ],
            dragElement: undefined,
            leavingZone: undefined,
        }) as RootState,
    actions: {
        setDragElement(item?: ToDoListItem) {
            this.dragElement = item;
        },
        setLeavingZone(id?: string) {
            this.leavingZone = id;
        },
        changeListItems(id: string) {
            this.items = this.items.map((el) => {
                let items = el.items;
                if (el.id === id) {
                    items = [...el.items, this.dragElement as ToDoListItem];
                }
                if (el.id === this.leavingZone) {
                    items = el.items.filter(
                        (e) => e.id !== this.dragElement?.id,
                    );
                }
                return {
                    ...el,
                    items,
                };
            });
        },
    },
});
