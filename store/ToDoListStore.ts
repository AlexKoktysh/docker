import type { Card, ToDoListItems } from "~/types";

type RootState = {
    items: ToDoListItems;
    dragElement?: Card;
    leavingZone?: string;
    apiBaseUrl: string;
    toDoCards: Card[];
    inProgressCards: Card[];
    inTestCards: Card[];
    inCompletedCards: Card[];
};

export const useToDoListStore = defineStore("toDoList", {
    state: () =>
        ({
            items: [
                {
                    name: "Index.toDo",
                    items: [],
                    id: "dropzone1",
                    satus: "TO_DO",
                },
                {
                    name: "Index.inProgress",
                    items: [],
                    id: "dropzone2",
                    status: "IN_PROGRESS",
                },
                {
                    name: "Index.inTest",
                    items: [],
                    id: "dropzone3",
                    status: "IN_TEST",
                },
                {
                    name: "Index.inCompleted",
                    items: [],
                    id: "dropzone4",
                    status: "IN_COMPLETED",
                },
            ],
            dragElement: undefined,
            leavingZone: undefined,
            apiBaseUrl: useRuntimeConfig().public.apiBase,
            toDoCards: [],
            inProgressCards: [],
            inTestCards: [],
            inCompletedCards: [],
        }) as RootState,
    actions: {
        async getCards() {
            const response: Card[] = await (
                await fetch(`${this.apiBaseUrl}/cards`)
            ).json();
            this.toDoCards = response.filter((el) => el.status === "TO_DO");
            this.inProgressCards = response.filter(
                (el) => el.status === "IN_PROGRESS",
            );
            this.inTestCards = response.filter((el) => el.status === "IN_TEST");
            this.inCompletedCards = response.filter(
                (el) => el.status === "IN_COMPLETED",
            );
            // this.items = [
            //     {
            //         name: "Index.toDo",
            //         items: toDoCards,
            //         id: "dropzone1",
            //         status: "TO_DO",
            //     },
            //     {
            //         name: "Index.inProgress",
            //         items: inProgressCards,
            //         id: "dropzone2",
            //         status: "IN_PROGRESS",
            //     },
            //     {
            //         name: "Index.inTest",
            //         items: inTestCards,
            //         id: "dropzone3",
            //         status: "IN_TEST",
            //     },
            //     {
            //         name: "Index.inCompleted",
            //         items: inCompletedCards,
            //         id: "dropzone4",
            //         status: "IN_COMPLETED",
            //     },
            // ];
        },
        async createCard(data: any) {
            const res = await (
                await fetch(`${this.apiBaseUrl}/cards`, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            ).json();
        },
        async changeCard(data: Card, key: string) {
            const res: { status: "success" | "error" } = await (
                await fetch(
                    `${this.apiBaseUrl}/cards/${this.dragElement?._id}`,
                    {
                        method: "PATCH",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                )
            ).json();
            if (res.status === "success") {
                this.changeListItems(key);
                this.setDragElement();
                return;
            }
            this.setDragElement();
        },
        setDragElement(item?: Card, parentId?: string) {
            this.dragElement = item;
            this.setLeavingZone(parentId);
        },
        setLeavingZone(id?: string) {
            this.leavingZone = id;
        },
        changeListItems(id: string) {
            this.items = this.items.map((el) => {
                let items = el.items;
                if (el.id === id) {
                    items = [...el.items, this.dragElement as Card];
                }
                if (el.id === this.leavingZone) {
                    items = el.items.filter(
                        (e) => e._id !== this.dragElement?._id,
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
