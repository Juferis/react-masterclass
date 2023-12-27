import { atom, selector } from 'recoil';

export const categoryList: string[] = ['TO_DO', 'DOING', 'DONE'];

const getLocalStorageCategory = () => {
    const categoryData = localStorage.getItem('toDoCategory');

    if (!categoryData) {
        return categoryList; // If no data in local storage, return default category list
    }

    try {
        const parsedData = JSON.parse(categoryData);
        return Array.isArray(parsedData) ? parsedData : categoryList;
    } catch (error) {
        return categoryList;
    }
};
export const categoryListState = atom<string[]>({
    key: "categoryList",
    default: getLocalStorageCategory(),
})

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

const getCategory = () => {

}

export interface IToDo {
    text: string;
    id: number;
    category: string;
}

// export enum ToDoStatus {
//     TO_DO = 'TO_DO',
//     DOING = 'DOING',
//     DONE = 'DONE',
// }