'use client'
import { logout } from '@/app/actions';
import GridLoader from '@/components/icons/grid';
import { useUserStore } from '@/store/user';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {
    const router = useRouter();
    const { clearUser } = useUserStore(state => ({
        clearUser: state.clearUser,
    }))

    useEffect(() => {
        const delay = 2000;
        const timer = setTimeout(async () => {
            const success = await logout();
            if (success) {
                clearUser();
                router.replace('/');
            }
        }, delay);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='flex justify-center items-center h-screen w-full'>
            <div className='flex flex-col gap-4'>
                <GridLoader />
                <h1 className='text-[#0066FF] font-bold'>Logging out</h1>
            </div>
        </div >
    );
}
