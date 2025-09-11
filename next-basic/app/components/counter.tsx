'use client';

import { useAtom } from 'jotai';
import { countAtom } from '../config/atoms';

const Counter = () => {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      <button
        className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all cursor-pointer'
        onClick={() => setCount((c) => c + 1)}
      >
        Count 값 : {count}
      </button>
    </div>
  );
};

export default Counter;
