'use server';

import { NewTodo, Todo } from '@/lib/common-types';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export const fetchTodos = async () => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

export const addTodo = async (todo: NewTodo) => {
  const { error } = await supabase.from('todos').insert(todo);
  if (error) throw new Error(error.message);
};

export const completeTodo = async (todo: Todo) => {
  const { todo_status, todo_history, ...rest } = todo;
  const newStatus = todo_status === 'To do' ? 'Done' : 'To do';
  const updatedHistory = [
    ...todo_history,
    {
      timestamp: Math.floor(Date.now() / 1000),
      todo_status: newStatus,
      todo_content: todo.todo_content,
      todo_category: todo.todo_category,
    },
  ];

  const { error } = await supabase
    .from('todos')
    .upsert(
      {
        ...rest,
        todo_status: newStatus,
        todo_history: updatedHistory,
        edited_at: new Date().toISOString(),
      },
      { onConflict: 'id' },
    )
    .select();
  if (error) throw new Error(error.message);
};

export const editTodo = async (todo: Todo) => {
  const response = await supabase
    .from('todos')
    .upsert(todo, { onConflict: 'id' })
    .select();

  return response;
};
