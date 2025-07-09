'use client';

import {
    AtSymbolIcon,
    KeyIcon,
    UserIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/components/button';
import { useActionState, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { lusitana } from '../fonts';

// Mock signup action - replace with your actual implementation
async function signup(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const name = formData.get('name') as string;

    // Basic validation
    if (!email || !password || !confirmPassword || !name) {
        return { message: 'All fields are required' };
    }

    if (password !== confirmPassword) {
        return { message: 'Passwords do not match' };
    }

    if (password.length < 6) {
        return { message: 'Password must be at least 6 characters' };
    }

    // Mock success (in real app, this would call your backend)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock error for demonstration
    if (email === 'taken@example.com') {
        return { message: 'Email is already taken' };
    }

    return { message: 'Account created successfully!', success: true };
}

export default function SignupForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [errorMessage, formAction, isPending] = useActionState(
        signup,
        undefined,
    );
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        
        if (password && confirmPassword) {
            setPasswordMatch(password === confirmPassword);
        }
    };

    return (
        <form action={formAction} onChange={handlePasswordChange} className="space-y-3">
            <div className="flex-1 rounded-lg bg-card border border-border px-6 pb-4 pt-8 shadow-lg">
                <h1 className={`${lusitana.className} mb-3 text-2xl text-foreground`}>
                    Create your account
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-foreground"
                            htmlFor="name"
                        >
                            Full Name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-border bg-background text-foreground py-[9px] pl-10 text-sm outline-2 placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 transition-colors"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                required
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-foreground transition-colors" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-foreground"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-border bg-background text-foreground py-[9px] pl-10 text-sm outline-2 placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 transition-colors"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-foreground transition-colors" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-foreground"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-border bg-background text-foreground py-[9px] pl-10 text-sm outline-2 placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 transition-colors"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-foreground transition-colors" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-foreground"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                className={`peer block w-full rounded-md border py-[9px] pl-10 pr-10 text-sm outline-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-colors ${
                                    passwordMatch 
                                        ? 'border-border bg-background text-foreground focus:border-ring' 
                                        : 'border-destructive bg-destructive/5 text-foreground focus:border-destructive'
                                }`}
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                required
                                minLength={6}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-foreground transition-colors" />
                            {passwordMatch ? (
                                <CheckCircleIcon className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-green-500" />
                            ) : (
                                <ExclamationCircleIcon className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-destructive" />
                            )}
                        </div>
                        {!passwordMatch && (
                            <p className="mt-2 text-xs text-destructive">Passwords do not match</p>
                        )}
                    </div>
                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                <Button className="mt-6 w-full" aria-disabled={isPending || !passwordMatch}>
                    {isPending ? 'Creating account...' : 'Create Account'} 
                    <ArrowRightIcon className="ml-auto h-5 w-5 text-primary-foreground" />
                </Button>
                <div
                    className="flex h-8 items-end space-x-1 mt-4"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <>
                            {errorMessage.success ? (
                                <>
                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                    <p className="text-sm text-green-500">{errorMessage.message}</p>
                                </>
                            ) : (
                                <>
                                    <ExclamationCircleIcon className="h-5 w-5 text-destructive" />
                                    <p className="text-sm text-destructive">{errorMessage.message}</p>
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <a href="/login" className="text-primary hover:text-primary/80 underline transition-colors">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </form>
    );
}
