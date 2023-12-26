import { atom, selector } from 'recoil';

export const categoryState = atom({
    key: "category",
    default: "TO_DO",
})

export const toDoState = atom<IToDo[]>({
    key: 'toDo',
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
})

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