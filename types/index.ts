export type CardStatusType =
    | "TO_DO"
    | "IN_PROGRESS"
    | "IN_TEST"
    | "IN_COMPLETED";

export type MethodAPI = "GET" | "POST" | "PATCH" | "DELETE";

export type Card = {
    _id?: string;
    title?: string;
    description?: string;
    status: CardStatusType;
};
export type ListItems = {
    TO_DO: {
        name: "Index.toDo";
        id: "dropzone1";
        items: Card[];
    };
    IN_PROGRESS: {
        name: "Index.inProgress";
        id: "dropzone2";
        items: Card[];
    };
    IN_TEST: {
        name: "Index.inTest";
        id: "dropzone3";
        items: Card[];
    };
    IN_COMPLETED: {
        name: "Index.inCompleted";
        id: "dropzone4";
        items: Card[];
    };
};

export type User = {
    firstName?: string;
    lastName?: string;
    email: string;
};
