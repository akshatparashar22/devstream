import SignupForm from '@/app/ui/components/signup-form';
import ThemeSwitcher from '@/app/ui/components/ThemeSwitcher';
import { sourceCodePro } from '@/app/ui/fonts';
import Link from 'next/link';

export default function SignupPage() {
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
                        Join DevStream to create your professional timeline
                    </p>
                </div>
                <SignupForm />
                <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                        By creating an account, you agree to our{' '}
                        <a href="/terms" className="text-primary hover:text-primary/80 underline transition-colors">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/privacy" className="text-primary hover:text-primary/80 underline transition-colors">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
