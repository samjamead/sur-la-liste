export interface NewTodo {
  todo_content: string;
  todo_category: string;
  todo_status: string;
  todo_history: Array<{
    [key: string]: string | number;
  }>;
}

export interface Todo extends NewTodo {
  id: number;
  created_at: string | null;
  edited_at: string | null;
}
