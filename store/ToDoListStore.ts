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
            const data = await useBaseFetch(`/cards/${this.activeCard?._id}`, {
                method: "PATCH",
                body: JSON.stringify(params),
            });
            debugger;
        },
        async changeCardsList(params: Card, key: CardStatusType) {
            const data = (await useBaseFetch(
                `/cards/${this.dragElement?._id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify(params),
                },
            )) as { status: string };
            if (data.status === "success") {
                this.changeListItems(key);
                this.setDragElement();
                return;
            }
            this.setDragElement();
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
