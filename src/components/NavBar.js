import Link from 'next/link';

export default function NavBar() {
  return (
    <div className="container">
      <div className="nav">
        <Link href="/">
          <a className="nav_link">
            Item Watch
          </a>
        </Link>
        <Link href="/blog">
          <a className="nav_link">
            Blog
          </a>
        </Link>
        <Link href="/faq">
          <a className="nav_link">
            FAQ
          </a>
        </Link>
        <Link href="/contact">
          <a className="nav_link">
            Contact
          </a>
        </Link>
      </div>
    </div>
  )
}