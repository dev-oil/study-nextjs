'use server';

import { User } from '@/types/user';

export async function searchUsers(name: string): Promise<User[]> {
  const DB = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'ChaCha' },
  ];

  return DB.filter((user) => user.name.includes(name));
}
