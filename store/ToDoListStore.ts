import { useBaseFetch } from "~/composable/useBaseFetch";
import type { Card, ListItems, CardStatusType } from "~/types";

type RootState = {
    listItems: ListItems;
    dragElement?: Card;
    activeCard?: Card;
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
            activeCard: undefined,
        }) as RootState,
    actions: {
        async getCards() {
            const data = await useBaseFetch("/cards");
            this.listItems = data as ListItems;
        },
        async getCardById(id: string) {
            const data = (await useBaseFetch(`/cards/${id}`)) as Card;
            this.activeCard = data;
        },
        async createCard(params: any) {
            const data = await useBaseFetch(`/cards`, {
                method: "POST",
                body: JSON.stringify(params),
            });
            if (data) {
                const card = data as Card;
                const status = card.status;
                if (status)
                    this.listItems = {
                        ...this.listItems,
                        [status]: {
                            ...this.listItems[status],
                            items: [...this.listItems[status].items, data],
                        },
                    };
            }
        },
        async changeCard(params: Card) {
            const id = params.status
                ? this.dragElement?._id
                : this.activeCard?._id;
            const data = (await useBaseFetch(`/cards/${id}`, {
                method: "PATCH",
                body: JSON.stringify(params),
            })) as Card;
            if (params.status) return this.changeCardsList(params.status);
            if (data) this.changeOneCard(data);
        },
        changeCardsList(key: CardStatusType) {
            this.changeListItems(key);
            this.setDragElement();
        },
        changeOneCard(data: Card) {
            const newItems = this.listItems[data.status].items.map((el) => {
                if (el._id === data._id) return data;
                return el;
            });
            this.listItems = {
                ...this.listItems,
                [data.status]: {
                    ...this.listItems[data.status],
                    items: newItems,
                },
            };
        },
        setDragElement(item?: Card) {
            this.dragElement = item;
        },
        changeListItems(id: CardStatusType) {
            if (!this.dragElement?.status) return;
            const newDeletedItems = this.listItems[
                this.dragElement.status
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
                [this.dragElement?.status]: {
                    ...this.listItems[this.dragElement.status],
                    items: newDeletedItems,
                },
            };
        },
    },
});
