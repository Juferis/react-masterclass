import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IToDo, categoryListState, toDoState } from '../atoms';

function ToDo({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categoryList = useRecoilValue(categoryListState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos: IToDo[]) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newToDo = { text, id, category: name };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categoryList.map((status, index) => {
        if (category !== status) {
          return (
            <button key={index} name={status} onClick={onClick}>
              {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
            </button>
          );
        }
        return null;
      })}
    </li>
  );
}

export default ToDo;
