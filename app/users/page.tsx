import { prisma } from '@/lib/prisma';

import styles from './users.module.css';
import Card from '@/app/users/components/Card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users',
  description: 'Users list',
};

const Users = async () => {
  const users = await prisma.user.findMany();

  return (
    <main>
      <ul className={styles.grid}>
        {users.map(user => (
          <Card key={user.id} {...user} />
        ))}
      </ul>
    </main>
  );
};

export default Users;
