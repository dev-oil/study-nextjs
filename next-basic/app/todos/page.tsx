'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo, getTodos } from '../actions/todo-actions';
import { useState } from 'react';
import { create } from 'domain';

export default function TodosPage() {
  const [todo, setTodo] = useState('');

  // useQuery는 데이터를 가져온다
  const todosQuery = useQuery({
    queryKey: ['todos'], // 어떤 키 값으로 관리할거냐
    queryFn: () => getTodos(), // 실제로 데이터를 가지고 오는 query 함수
  });

  // useMutation은 데이터를 바꾼다
  // create delete update
  const createTodoMutation = useMutation({
    mutationFn: async () => {
      if (todo === '') throw new Error('할 일을 입력하세요');
      return createTodo(todo);
    },
    onSuccess: (TODOS) => {
      todosQuery.refetch(); // mutationFn이 성공했을 때 연관된 todosQuery를 다시 불러오도록
      setTodo('');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div>
      <h2>Todos</h2>

      {/* Todos를 생성하는 부분 */}
      <input
        type='text'
        placeholder='할 일을 입력하세요'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={() => createTodoMutation.mutate()}>
        {createTodoMutation.isPending ? '등록중...' : '등록'}
      </button>

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
