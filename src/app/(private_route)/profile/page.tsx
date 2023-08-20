'use client';
import { signOut } from 'next-auth/react';

const ProfilePage = () => {
  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default ProfilePage;
