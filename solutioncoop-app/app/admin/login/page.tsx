'use client';
import dynamic from 'next/dynamic';

// ssr: false phải nằm trong 'use client' component
const LoginClient = dynamic(() => import('./LoginClient'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '100vh', background: '#fff' }} />,
});

export default function LoginPage() {
  return <LoginClient />;
}
