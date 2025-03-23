import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { LoginFormData, RegisterFormData } from "../_hooks/useAuthForm";

type FormData = LoginFormData | RegisterFormData;

interface AuthFormProps {
  form: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => Promise<void>;
  children: React.ReactNode;
  error?: string;
}

export default function AuthForm({
  form,
  onSubmit,
  children,
  error,
}: AuthFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const values = form.getValues();
      const isValid = await form.trigger();

      if (isValid) {
        await onSubmit(values);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="w-full max-w-md p-5 bg-white rounded-xl">
      {error && (
        <div className="p-3 mb-4 bg-red-100 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-3">
          {children}
        </form>
      </Form>
    </div>
  );
}

export function AuthFormField({
  form,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
}: {
  form: UseFormReturn<FormData>;
  name: keyof FormData;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              className="ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
