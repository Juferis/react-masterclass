import { useRecoilState, useRecoilValue } from 'recoil';
import CreateToDo from './createToDo';
import { IToDo, ToDoStatus, categoryState, toDoSelector } from '../atoms';
import ToDo from './ToDo';

function ToDoList() {
  const toDos = useRecoilValue<IToDo[]>(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  console.log('toDos', toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={ToDoStatus.TO_DO}>To Do</option>
        <option value={ToDoStatus.DOING}>Doing</option>
        <option value={ToDoStatus.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
