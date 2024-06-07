'use client'
import GridLoader from '@/components/icons/grid';
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
            if (isAuth) {
                router.replace('/dashboard');
            }else{
              router.replace("/auth")
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [isAuth, router]);

    return (
        <div className='flex justify-center items-center h-screen w-full'>
        <div className='flex flex-col gap-4'>
            <GridLoader />
            <h1 className='text-[#0066FF] font-bold'>Redirecting...</h1>
        </div>
    </div >
    );
}
