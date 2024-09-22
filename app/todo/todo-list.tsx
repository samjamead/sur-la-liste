'use client';

import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export default function TodoList() {
  const fetchTodos = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
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
      <div className='animate-in'>
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
        {data.map((todo) => {
          return (
            <li
              key={todo.id}
              className='border rounded-lg p-4 flex flex-col gap-2'
            >
              <div className='flex justify-between items-center gap-4 text-xs font-mono'>
                <p className='px-2 py-0.5 bg-blue-500/50 rounded'>
                  {todo.todo_category}
                </p>
                <p>{todo.todo_status}</p>
              </div>
              {todo.todo_content}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
