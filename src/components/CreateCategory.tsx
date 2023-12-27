import { useForm } from 'react-hook-form';
import { categoryList, categoryListState } from '../atoms';
import { useSetRecoilState } from 'recoil';

function CreateCategory() {
  const setCategory = useSetRecoilState(categoryListState);
  const { register, handleSubmit, setValue } = useForm();
  const handleValid = ({ category }: any) => {
    setCategory((oldCategoryList: string[]) => {
      const newCategory: string[] = [category, ...oldCategoryList];
      localStorage.setItem('toDoCategory', JSON.stringify(newCategory));
      return newCategory;
    });
    setValue('category', '');
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('category', {
          required: 'Please write a Category',
        })}
        placeholder="Write a Category"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;
