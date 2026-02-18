'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

export default function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      router.replace('/mydashboard');
    }
  }, [router]);

  return <>{children}</>;
}