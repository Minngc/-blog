import Link from "next/link";

const TopNav = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">Ming's Blog</Link>
            </li>
            <li>
              <Link href="/about">about</Link>
            </li>
            <li>
              <Link href="/links">link</Link>
            </li>
            <li>
              <Link href="/articles">articles</Link>
            </li>
            <li>
              <Link href="/other">others</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default TopNav;
