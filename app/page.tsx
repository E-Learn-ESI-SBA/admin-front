'use client'
import { useUserStore } from '@/store/user';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {
    const router = useRouter();
    const { isAuth } = useUserStore(state => ({
        isAuth: state.isAuth,
    }))

    useEffect(() => {
        const delay = 2000;
        const timer = setTimeout(async () => {
            console.log(isAuth)
            if (isAuth) {
                router.replace('/dashboard');
            }else{
              router.replace("/auth")
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [isAuth, router]);

    return (
        <div>
            <p>Redirecting...</p>
        </div>
    );
}
