'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoList from './todo-list';
import AddTodo from './add-todo';

export default function TodoPage() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='animate-in flex flex-col gap-4'>
        <AddTodo />
        <TodoList />
      </div>
    </QueryClientProvider>
  );
}
