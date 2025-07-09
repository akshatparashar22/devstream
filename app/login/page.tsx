
import LoginForm from '../ui/components/login-form';
import ThemeSwitcher from '../ui/components/ThemeSwitcher';
import { Suspense } from 'react';
import { sourceCodePro } from '../ui/fonts';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-8 transition-colors">
            <div className="absolute top-4 right-4">
                <ThemeSwitcher />
            </div>
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Link href="/" className="inline-block">
                        <h1 className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${sourceCodePro.className}`}>
                            DevStream
                        </h1>
                    </Link>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Welcome back to DevStream
                    </p>
                </div>
                <Suspense>
                    <LoginForm />
                </Suspense>
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-primary hover:text-primary/80 underline transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}