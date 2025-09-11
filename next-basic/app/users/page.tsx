'use client';

import { useEffect, useState } from 'react';
import { searchUsers } from '../actions/user-actions';
import { User } from '@/types/user';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  // server action
  // /api/search-users 같은 API 라우트를 따로 구현하지 않아도 됨
  // Next.js가 빌드 시 server action을 자동으로 API endpoint로 매핑해 주기 때문에, 클라이언트 코드에서 searchUsers('Alice')를 호출하면 네트워크 요청을 통해 서버 쪽 함수가 실행
  useEffect(() => {
    searchUsers('Alice').then((data) => setUsers(data));
  }, []);

  return (
    <section>
      <h2>Users</h2>

      {users.map((user) => (
        <div key={user.id}>
          {user.id} : {user.name}
        </div>
      ))}
    </section>
  );
};

export default UsersPage;
