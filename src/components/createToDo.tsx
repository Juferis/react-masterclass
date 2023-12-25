import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { IToDo, ToDoStatus, toDoState } from '../atoms';

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos: IToDo[]) => [
      { text: toDo, id: Date.now(), category: ToDoStatus.TO_DO },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: 'Please write a To Do',
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;

interface IForm {
  toDo: string;
}
