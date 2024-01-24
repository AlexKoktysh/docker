import type { Card, ListItems } from "~/types";

type RootState = {
    listItems: ListItems;
    dragElement?: Card;
    apiBaseUrl: string;
};

export const useToDoListStore = defineStore("toDoList", {
    state: () =>
        ({
            listItems: {
                TO_DO: {
                    name: "Index.toDo",
                    items: [],
                    id: "dropzone1",
                },
                IN_PROGRESS: {
                    name: "Index.inProgress",
                    items: [],
                    id: "dropzone2",
                },
                IN_TEST: {
                    name: "Index.inTest",
                    items: [],
                    id: "dropzone3",
                },
                IN_COMPLETED: {
                    name: "Index.inCompleted",
                    items: [],
                    id: "dropzone4",
                },
            },
            dragElement: undefined,
            apiBaseUrl: useRuntimeConfig().public.apiBase,
        }) as RootState,
    actions: {
        async getCards() {
            const response: ListItems = await (
                await fetch(`${this.apiBaseUrl}/cards`)
            ).json();
            this.listItems = response;
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
        async changeCard(
            data: Card,
            key: "TO_DO" | "IN_PROGRESS" | "IN_TEST" | "IN_COMPLETED",
        ) {
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
        setDragElement(item?: Card) {
            this.dragElement = item;
        },
        changeListItems(
            id: "TO_DO" | "IN_PROGRESS" | "IN_TEST" | "IN_COMPLETED",
        ) {
            const newDeletedItems = this.listItems[
                this.dragElement?.status as
                    | "TO_DO"
                    | "IN_PROGRESS"
                    | "IN_TEST"
                    | "IN_COMPLETED"
            ].items.filter((el) => el._id !== this.dragElement?._id);
            this.listItems = {
                ...this.listItems,
                [id]: {
                    ...this.listItems[id],
                    items: [
                        ...this.listItems[id].items,
                        {
                            ...this.dragElement,
                            status: id,
                        },
                    ],
                },
                [this.dragElement?.status as
                    | "TO_DO"
                    | "IN_PROGRESS"
                    | "IN_TEST"
                    | "IN_COMPLETED"]: {
                    ...this.listItems[
                        this.dragElement?.status as
                            | "TO_DO"
                            | "IN_PROGRESS"
                            | "IN_TEST"
                            | "IN_COMPLETED"
                    ],
                    items: newDeletedItems,
                },
            };
        },
    },
});
