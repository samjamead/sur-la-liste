'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';

export default function AddTodo() {
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState('');
  const queryClient = useQueryClient();

  // Mutation function
  const addTodo = async (todoContent: string, todoCategory: string) => {
    const supabase = createClient();
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    const todoHistory = [
      {
        timestamp,
        todo_status: 'To do',
        todo_content: todoContent,
        todo_category: todoCategory,
      },
    ];

    const { error } = await supabase.from('todos').insert({
      todo_content: todoContent,
      todo_category: todoCategory,
      todo_status: 'To do',
      todo_history: todoHistory,
    });

    if (error) throw new Error(error.message);
  };

  const mutation = useMutation({
    mutationFn: ({
      todoContent,
      todoCategory,
    }: {
      todoContent: string;
      todoCategory: string;
    }) => addTodo(todoContent, todoCategory),
    onSuccess: () => {
      setNewTodo('');
      setCategory('');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    mutationKey: ['addTodo'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() && category.trim()) {
      mutation.mutate({ todoContent: newTodo, todoCategory: category });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex justify-start items-center gap-4 text-sm'
    >
      <input
        type='text'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder='Enter new todo'
        className='border p-2 rounded bg-background text-foreground'
      />
      <input
        type='text'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder='Enter category'
        className='border p-2 rounded bg-background text-foreground'
      />
      <button
        type='submit'
        className='bg-blue-500 border border-blue-700 text-white p-2 rounded'
      >
        Add Todo
      </button>
    </form>
  );
}
