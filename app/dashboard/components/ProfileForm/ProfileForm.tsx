import { getServerSession } from 'next-auth';
import type { User } from '@prisma/client';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

interface IProfileForm {
  user: User;
}

const updateUserData = async (data: FormData) => {
  'use server';
  const session = await getServerSession(authOptions);
  const body = {
    name: data.get('name')?.toString(),
    bio: data.get('bio')?.toString(),
    age: Number(data.get('age')),
    image: data.get('image')?.toString(),
  };
  if (session?.user?.email) {
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: body,
    });
    redirect(`/users/${user.id}`);
  }
};

const ProfileForm = async ({ user }: IProfileForm) => (
  <>
    <h2>Edit your profile</h2>
    <form action={updateUserData}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" defaultValue={user.name ?? ''} />
      <label htmlFor="bio">Bio</label>
      <textarea name="bio" cols={30} rows={30} defaultValue={user.bio ?? ''} />
      <label htmlFor="age">Age</label>
      <input type="text" name="age" defaultValue={user.age ?? 0} />
      <label htmlFor="image">Profile image url</label>
      <input type="text" name="image" defaultValue={user.image ?? ''} />
      <button type="submit">Save</button>
    </form>
  </>
);
export default ProfileForm;
