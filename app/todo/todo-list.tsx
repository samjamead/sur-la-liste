'use client';

import { useMutationState, useQuery } from '@tanstack/react-query';
import { fetchTodos } from './server-actions';
import { NewTodo } from '@/lib/common-types';
import TodoListItem from './todo-list-item';
import { LoaderIcon } from 'lucide-react';

export default function TodoList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => await fetchTodos(),
    select: (data) =>
      data.sort((a, b) => {
        const statusComparison = b.todo_status.localeCompare(a.todo_status);
        if (statusComparison !== 0) return statusComparison;

        const aDate = new Date(a.edited_at || a.created_at).getTime();
        const bDate = new Date(b.edited_at || b.created_at).getTime();

        return bDate - aDate;
      }),
  });

  const variables = useMutationState({
    filters: { mutationKey: ['addTodo'], status: 'pending' },
    select: (mutation) => mutation.state.variables as NewTodo,
  });

  if (error) {
    return (
      <div className='animate-in'>
        <p>Error fetching todos from the database: {error.message}</p>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className='text-sm animate-in w-full flex border rounded flex-col items-center justify-center gap-4 py-24'>
        <LoaderIcon className='animate-spin h-4 w-4' />
        <p>Fetching the todos!</p>
      </div>
    );

  if (!data)
    return (
      <div className='animate-in'>
        <p>
          Hmm... no todos found. The lazy developers should add an empty state!
        </p>
      </div>
    );

  return (
    <div className='animate-in'>
      <ul className='flex flex-col gap-4'>
        {variables &&
          variables.map((todo) => {
            return <TodoListItem key={todo.todo_content} todo={todo} />;
          })}
        {data.map((todo) => {
          return <TodoListItem key={todo.todo_content} todo={todo} />;
        })}
      </ul>
    </div>
  );
}
