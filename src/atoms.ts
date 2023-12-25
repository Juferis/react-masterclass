import { atom } from 'recoil';

export const toDoState = atom<IToDo[]>({
    key: 'toDo',
    default: [],
});

export interface IToDo {
    text: string;
    id: number;
    category: ToDoStatus;
}

export enum ToDoStatus {
    TO_DO = 'TO_DO',
    DOING = 'DOING',
    DONE = 'DONE',
}