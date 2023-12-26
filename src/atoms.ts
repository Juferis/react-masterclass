import { atom, selector } from 'recoil';

export const toDoState = atom<IToDo[]>({
    key: 'toDo',
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        return [
            toDos.filter((todo) => todo.category === ToDoStatus.TO_DO),
            toDos.filter((todo) => todo.category === ToDoStatus.DOING),
            toDos.filter((todo) => todo.category === ToDoStatus.DONE),
        ];
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