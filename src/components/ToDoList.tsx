import { useRecoilState, useRecoilValue } from 'recoil';
import CreateToDo from './CreateToDo';
import {
  IToDo,
  categoryListState,
  categoryState,
  toDoSelector,
} from '../atoms';
import ToDo from './ToDo';
import CreateCategory from './CreateCategory';

function ToDoList() {
  const toDos = useRecoilValue<IToDo[]>(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const categoryList = useRecoilValue(categoryListState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  console.log('toDos', toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        {categoryList.map((status, index) => (
          <option key={index} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
      <CreateCategory />
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
