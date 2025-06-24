'use client';

import Link from 'next/link';
import logo from '@/assets/icons/logo.svg';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './loginValidation';
import { loginUser } from '@/services/Auth';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accept, setAccept] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirectPath');
  const router = useRouter();
  const { setIsLoading } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        form.reset();

        if (redirect) {
          router.push(redirect);
        } else {
          router.push('/');
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg flex-grow bg-white border p-6 lg:p-8 rounded-[12px]">
      <div className="flex items-center space-x-4 border-b mb-4 pb-3">
        <Link href="/">
          <Image src={logo} alt="Logo" width="80" height="80" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-500">
            Enter your email address to login!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-[#0F0E0E]">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    value={field.value || ''}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-3 relative">
                <FormLabel className="text-[#0F0E0E]">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      value={field.value || ''}
                      className="bg-white pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute cursor-pointer right-2 rounded-full top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center mt-8 mb-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                onClick={() => setAccept((prev) => !prev)}
                id="terms"
                className="cursor-pointer"
              />
              <Label className="text-sm" htmlFor="terms">
                Remember Me
              </Label>
            </div>
            <span className="text-gray-500 text-sm">Forgot your password?</span>
          </div>
          <Button
            disabled={accept === false}
            type="submit"
            className="w-full mt-2 cursor-pointer"
          >
            {isSubmitting ? 'Logging...' : 'Login'}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-500 text-center mt-5">
        Do not have any account?{' '}
        <Link href="/register" className="text-primary font-medium">
          Please Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
