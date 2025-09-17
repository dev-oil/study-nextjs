import { NextResponse } from 'next/server';

// 브라우저에 어떤 개인정보 노출 위험 없이 모두 api 화를 시킬 수 있다는 것이 큰 장점
// http://localhost:3000/api/users

const DB = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'ChaCha' },
];

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const name = searchParams.get('name') ?? '';

  return NextResponse.json({
    users: DB.filter((user) => user.name.includes(name)),
  });
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
