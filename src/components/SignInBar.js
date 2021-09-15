import Link from 'next/link';

export default function SignInBar() {
  return (
    <div className="user_access">
      <Link href="/signin">
        <a>
          Sign In
        </a>
      </Link>
      {' / '}
      <Link href="/register">
        <a>
          Register
        </a>
      </Link>
    </div>
  )
}