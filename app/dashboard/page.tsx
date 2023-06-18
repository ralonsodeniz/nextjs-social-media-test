import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import ProfileForm from '@/app/dashboard/components/ProfileForm';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || undefined },
  });
  if (!session) redirect('/api/auth/signin');
  if (!user) redirect('/api/auth/signout');

  return (
    <main>
      <h1>Dashboard</h1>
      <ProfileForm user={user} />
    </main>
  );
};

export default Dashboard;
