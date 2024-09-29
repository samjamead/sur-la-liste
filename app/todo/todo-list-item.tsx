'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeTodo } from './server-actions';
import { NewTodo, Todo } from '@/lib/common-types';
import { useState } from 'react';

export const TodoListItem = ({ todo }: { todo: Todo | NewTodo }) => {
  const isTodo = 'id' in todo;

  const [isComplete, setIsComplete] = useState(
    todo.todo_status === 'Done' ?? false,
  );

  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, Todo>({
    mutationFn: async (todo) => await completeTodo(todo!),
    mutationKey: ['completeTodo'],
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <li
      className={`p-4 grid grid-cols-[20%,auto,20%,6%] items-baseline text-sm border rounded-lg ${
        isComplete ? 'text-foreground/50' : ''
      }`}
    >
      <p className='text-xs font-mono'>
        {todo.todo_status.toLocaleLowerCase()}
      </p>

      <p>{todo.todo_content}</p>

      <div className='pr-4'>
        <p className='rounded-lg text-xs font-mono px-2 py-1 text-center bg-blue-300/30'>
          {todo.todo_category.toLocaleLowerCase()}
        </p>
      </div>

      <div className='w-max text-center'>
        {isTodo && (
          <label className='p-4'>
            <input
              onChange={async () => {
                setIsComplete((prev) => !prev);
                if (isTodo) {
                  mutation.mutate(todo);
                }
              }}
              type='checkbox'
              checked={isComplete}
            />
          </label>
        )}
      </div>
    </li>
  );
};

export default TodoListItem;
