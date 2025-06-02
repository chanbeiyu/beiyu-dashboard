import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Link from 'next/link';
import { ForgotPasswordForm } from './components/forgot-password-form';

export default function Page() {
  return (
    <Card className='gap-4'>
      <CardHeader>
        <CardTitle className='text-lg tracking-tight'>
          Forgot Password
        </CardTitle>
        <CardDescription>
          Enter your registered email and <br /> we will send you a link to
          reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      <CardFooter>
        <p className='text-muted-foreground px-8 text-center text-sm'>
          Don&#39;t have an account?{' '}
          <Link
            href='/sign-up'
            className='hover:text-primary underline underline-offset-4'
          >
            Sign up
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
