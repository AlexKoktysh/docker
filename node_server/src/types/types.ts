import { Card } from "../entity/Card";

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
