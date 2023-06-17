import { prisma } from '@/lib/prisma';

import styles from './users.module.css';
import Card from '@/app/users/components/Card';

const Users = async () => {
  const users = await prisma.user.findMany();

  return (
    <ul className={styles.grid}>
      {users.map(user => (
        <Card key={user.id} {...user} />
      ))}
    </ul>
  );
};

export default Users;