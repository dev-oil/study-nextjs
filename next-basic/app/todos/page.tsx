'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { createTodo, getTodos } from '../actions/todo-actions';
import { useState } from 'react';
import { queryClient } from '../config/ReactQueryProvider';

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
      // todosQuery.refetch(); // mutationFn이 성공했을 때 연관된 todosQuery를 다시 불러오도록 (현재 컴포넌트에 존재하는 해당 useQuery 훅만)
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // 위에 refetch랑 같은 기능. 전역적으로 동기화가 필요할 때 이렇게도 가능 (현재 페이지 뿐만 아니라, 다른 페이지/컴포넌트에 존재하는 ['todos'] 쿼리도 모두 invalidate 됨.)
      setTodo('');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div className='min-h-screen relative overflow-hidden'>
      {/* 움직이는 그라데이션 배경 */}
      <div className='absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 animate-gradient-shift'></div>

      {/* 메인 컨테이너 */}
      <div className='relative z-10 container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          {/* 헤더 */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              ✨ 할 일 목록
            </h1>
            <p className='text-gray-600'>오늘도 화이팅! 💪</p>
          </div>

          {/* 투두 입력 폼 */}
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20'>
            <div className='flex gap-3'>
              <input
                type='text'
                placeholder='할 일을 입력하세요...'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyPress={(e) =>
                  e.key === 'Enter' && createTodoMutation.mutate()
                }
                className='flex-1 px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400'
              />
              <button
                onClick={() => createTodoMutation.mutate()}
                disabled={createTodoMutation.isPending}
                className='px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl font-medium hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              >
                {createTodoMutation.isPending ? '등록중...' : '등록'}
              </button>
            </div>
          </div>

          {/* 투두 리스트 */}
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
              📝 할 일 목록
              {todosQuery.data && (
                <span className='text-sm bg-pink-100 text-pink-600 px-2 py-1 rounded-full'>
                  {todosQuery.data.length}개
                </span>
              )}
            </h2>

            {/* 로딩 상태 */}
            {todosQuery.isLoading && (
              <div className='flex items-center justify-center py-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-pink-400'></div>
                <span className='ml-2 text-gray-600'>로딩중...</span>
              </div>
            )}

            {/* 에러 상태 */}
            {todosQuery.isError && (
              <div className='text-center py-8 text-red-500'>
                <div className='text-4xl mb-2'>😵</div>
                <p>오류가 발생했습니다</p>
              </div>
            )}

            {/* 투두 목록 */}
            {todosQuery.data && todosQuery.data.length === 0 && (
              <div className='text-center py-8 text-gray-500'>
                <div className='text-4xl mb-2'>🎉</div>
                <p>할 일이 없습니다! 새로운 할 일을 추가해보세요.</p>
              </div>
            )}

            {todosQuery.data && todosQuery.data.length > 0 && (
              <div className='space-y-3'>
                {todosQuery.data.map((todo, index) => (
                  <div
                    key={todo}
                    className='flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100 hover:shadow-md transition-all duration-200 group'
                  >
                    <div className='w-6 h-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white text-sm font-bold'>
                      {index + 1}
                    </div>
                    <span className='flex-1 text-gray-700 group-hover:text-gray-900 transition-colors'>
                      {todo}
                    </span>
                    <div className='w-2 h-2 rounded-full bg-pink-300 opacity-0 group-hover:opacity-100 transition-opacity'></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 커스텀 CSS */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>
    </div>
  );
}
