import { Metadata } from 'next';
import Link from 'next/link';
import Counter from './components/counter';
import Counter2 from './components/counter-2';

// Link 쓰면 a 태그보다 클라이언트 사이드 라우팅에 도움되고, Next.js에게 URL 프리패칭 힌트를 줘서 성능 향상에 도움됨

// metadata -> SEO 정의하는 방식
export const metadata: Metadata = {
  title: 'Next.js Tutorial',
  description: 'Next.js 튜토리얼 배우기',
};

export default function Home() {
  return (
    <main>
      HOME
      <Link href='/dashboard'>Go to Dashboard</Link>
      <Counter />
      <Counter2 />
    </main>
  );
}
