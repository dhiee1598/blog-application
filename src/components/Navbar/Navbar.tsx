import Link from 'next/link';
import styles from './navbarStyle';
import Image from 'next/image';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.navbar}>
      <Link href='/'>
        <h1 className={styles.title}>Blog Mania</h1>
      </Link>

      {session ? (
        <div className={styles.userMenu}>
          <Link href='/profile'>
            <p className={styles.paragraph}>Hi! {session?.user.name}</p>
          </Link>
          <Image
            className={styles.image}
            src={session?.user.image || '/default-img-profile.png'}
            alt='profile pic'
            width={35}
            height={35}
          />
        </div>
      ) : (
        <Link className={styles.link} href='/api/auth/signin'>
          Sign In
        </Link>
      )}
    </div>
  );
};

export default Navbar;
