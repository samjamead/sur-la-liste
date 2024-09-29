'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from './server-actions';
import { NewTodo } from '@/lib/common-types';

export default function AddTodo() {
  const [contentInput, setContentInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, NewTodo>({
    mutationFn: async (newTodo) => await addTodo(newTodo!),
    onSuccess: () => {
      setContentInput('');
      setCategoryInput('');
    },
    mutationKey: ['addTodo'],
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contentInput.trim() && categoryInput.trim()) {
      const newTodo: NewTodo = {
        todo_content: contentInput,
        todo_category: categoryInput,
        todo_status: 'To do',
        todo_history: [
          {
            timestamp: Math.floor(Date.now() / 1000),
            todo_status: 'To do',
            todo_content: contentInput,
            todo_category: categoryInput,
          },
        ],
      };

      mutation.mutate(newTodo);
    }
  };

  return (
    <div className='w-full relative'>
      {mutation.isPending && (
        <div className='w-full absolute top-1/2 p-3 text-sm -translate-y-1/2 rounded border border-blue-700 bg-blue-600/90'>
          <p className='text-center'>Adding todo...</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className='flex justify-start items-center gap-4 text-sm'
      >
        <input
          type='text'
          value={contentInput}
          onChange={(e) => setContentInput(e.target.value)}
          placeholder='Enter new todo'
          className='grow border p-2 rounded bg-background text-foreground'
        />
        <input
          type='text'
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          placeholder='Enter category'
          className='border p-2 rounded bg-background text-foreground'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded disabled:text-foreground/50 disabled:bg-blue-500/20'
          disabled={mutation.isPending}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}
