import { atom, selector } from 'recoil';

export const categoryState = atom({
    key: "category",
    default: "TO_DO",
})

const getLocalStorageData = () => {
    const toDoData = localStorage.getItem('toDo');

    if (!toDoData) {
        return [];
    }

    try {
        const parsedData = JSON.parse(toDoData);
        return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
        return [];
    }
};

export const toDoState = atom<IToDo[]>({
    key: 'toDo',
    default: getLocalStorageData(),
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