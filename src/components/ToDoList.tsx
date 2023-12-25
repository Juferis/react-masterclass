import { useRecoilValue } from 'recoil';
import CreateToDo from './createToDo';
import { toDoState } from '../atoms';
import ToDo from './ToDo';

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          // <ToDo text={toDo.text} category={toDo.category} id={toDo.id} /> 이 내용이 아래 코드로 끝난다.
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
