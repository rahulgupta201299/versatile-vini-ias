import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h2>Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
