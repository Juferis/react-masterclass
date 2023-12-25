import { useSetRecoilState } from 'recoil';
import { IToDo, ToDoStatus, toDoState } from '../atoms';

function ToDo({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos: IToDo[]) => {
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newToDo = { text, id, category: name as ToDoStatus };
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
      {category !== ToDoStatus.TO_DO && (
        <button name={ToDoStatus.TO_DO} onClick={onClick}>
          ToDo
        </button>
      )}
      {category !== ToDoStatus.DONE && (
        <button name={ToDoStatus.DONE} onClick={onClick}>
          Done
        </button>
      )}
      {category !== ToDoStatus.DOING && (
        <button name={ToDoStatus.DOING} onClick={onClick}>
          Doing
        </button>
      )}
    </li>
  );
}

export default ToDo;
