'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo, getTodos } from '../actions/todo-actions';
import { useState } from 'react';

export default function TodosPage() {
  const todosQuery = useQuery({
    queryKey: ['todos'], // 어떤 키 값으로 관리할거냐
    queryFn: () => getTodos(), // 실제로 데이터를 가지고 오는 query 함수
  });

  const [todo, setTodo] = useState('');

  return (
    <div>
      <h2>Todos</h2>

      {/* Todos를 생성하는 부분 */}
      <input
        type='text'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={() => createTodo(todo)}>추가</button>

      {/* Todos를 보여주는 부분 */}
      {todosQuery.isLoading && <div>Loading...</div>}
      {todosQuery.isError && <div>Error</div>}
      <ul>
        {todosQuery.data?.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
