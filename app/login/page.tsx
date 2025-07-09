
import LoginForm from '../ui/components/login-form';
import { Suspense } from 'react';
import { sourceCodePro } from '../ui/fonts';

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <h1 className={`text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${sourceCodePro.className}`}>
                    DevStream
                </h1>
                <div className="w-32 text-white md:w-36">
                    Login
                </div>
                <Suspense>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
    );
}