'use client';

import { useEffect, useState } from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`/api/users?name=${'Alice'}`)
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
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
