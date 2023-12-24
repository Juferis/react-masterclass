import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// function ToDoList() {
//   const [toDo, setValue] = useState('');
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setValue(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log('value!', toDo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  // watch: form의 값들을 주시한다.
  const { register, watch } = useForm();
  console.log('watch', watch());
  return (
    <div>
      <form>
        <input {...register('toDo')} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
