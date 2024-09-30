'use client'
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { decryptKey, encryptKey } from '@/lib/utils';

const PasskeyModal = () => {
    const [open, setOpen] = useState(true);
    const [passkey, setPassKey] = useState('');
    const [error, setError] = useState('');
    const path = usePathname();
    const router = useRouter();

    const closeModal = () => {
        setOpen(false);
        router.push('/'); // redirect after closing
    };

    const encryptedKey = typeof window !== 'undefined' ? localStorage.getItem('accesskey') : null;

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey);
        if (path && accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            setOpen(false);
            router.push('/admin');
        } else {
            setOpen(true);
        }
    }, [path, router, encryptedKey]);

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey);
            localStorage.setItem('accesskey', encryptedKey); // Fix here: consistent key
            router.push('/admin');
            setOpen(false);
        } else {
            setError('Wrong passkey');
        }
    };

    return (
        <div>
            <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
                <AlertDialogContent className='shad-alert-dialog'>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='flex items-start justify-between'>
                            Admin access verification
                            <Image
                                src='/assets/icons/close.svg'
                                alt='close'
                                width={20}
                                height={20}
                                onClick={closeModal}
                                className='cursor-pointer'
                            />
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            To access the main page, please enter the passkey
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div>
                        <InputOTP maxLength={6} value={passkey} onChange={(value) => setPassKey(value)}>
                            <InputOTPGroup className='shad-otp'>
                                <InputOTPSlot className='shad-otp-slot' index={0} />
                                <InputOTPSlot className='shad-otp-slot' index={1} />
                                <InputOTPSlot className='shad-otp-slot' index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup className='shad-otp'>
                                <InputOTPSlot className='shad-otp-slot' index={3} />
                                <InputOTPSlot className='shad-otp-slot' index={4} />
                                <InputOTPSlot className='shad-otp-slot' index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        {error && <p className='shad-error text-14-regular mt-4 flex justify-center'>{error}</p>}
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={validatePasskey} className='primary-button w-full'>
                            Enter admin passkey
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default PasskeyModal;
