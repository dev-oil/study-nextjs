import Link from 'next/link';

// Link 쓰면 a 태그보다 클라이언트 사이드 라우팅에 도움되고, Next.js에게 URL 프리패칭 힌트를 줘서 성능 향상에 도움됨
export default function Home() {
  return (
    <main>
      HOME
      <Link href='/dashboard'>Go to Dashboard</Link>
    </main>
  );
}
