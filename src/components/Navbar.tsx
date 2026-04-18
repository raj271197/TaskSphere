import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Navbar.module.css';

const navigation = [
  { href: '/', label: 'Dashboard' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <header className={styles.shell}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.brand}>
          <span>TS</span>
          TaskSphere
        </Link>

        <div className={styles.links}>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${router.pathname === item.href ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
