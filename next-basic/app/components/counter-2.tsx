'use client';

import { useAtomValue } from 'jotai';
import { countAtom } from '../config/atoms';

const Counter2 = () => {
  const count = useAtomValue(countAtom);

  return <div>전역 상태관리가 되는 중... Count 값 : {count}</div>;
};

export default Counter2;
