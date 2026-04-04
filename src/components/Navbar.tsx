import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.navLink}>
        Home
      </Link>
      <Link href="/about" className={styles.navLink}>
        About
      </Link>
    </nav>
  );
};

export default Navbar;
