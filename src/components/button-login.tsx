"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormTypeLogin } from "@/hooks/useFormLogin";
import { formSchemaLogin } from "@/schemaValidations/auth.schema";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function ButtonLogin() {
  const [isFormLogin, setisFormLogin] = useState(false);
  const [isloading, setLoading] = useState(false);
  const { replace } = useRouter();
  // 1. Define your form.
  const form = useForm<FormTypeLogin>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(value: FormTypeLogin) {
    setLoading(true);
    const { email, password } = value;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.ok) {
      setLoading(false);
      replace("/home");
    }
    if (result?.error) {
      setLoading(false);
      alert("Login failed. Try again.");
    }
  }

  return (
    <>
      <button
        onClick={() => setisFormLogin(true)}
        className="mt-5 text-center rounded-full bg-white font-bold text-blue-600 px-4 py-2 text-base h-16 w-full shadow-sm border border-slate-400 hover:bg-gray-50"
      >
        Đăng nhập
      </button>

      {isFormLogin ? (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className=" bg-white rounded-xl w-full max-w-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-3 p-3">
              <button
                onClick={() => setisFormLogin(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <span className="text-lg">✕</span>
              </button>
              <div>
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div className="w-8"></div>
            </div>

            {/* Content */}
            <div className="flex flex-col p-5">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <h1 className="font-bold text-2xl">Đăng nhập</h1>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nhập mật khẩu</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập mật khẩu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="mt-3 w-full rounded-full font-bold hover:bg-slate-700"
                    type="submit"
                  >
                    {isloading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                </form>
              </Form>

              <Button
                className="mt-5 rounded-full font-bold bg-white hover:bg-slate-100 text-black border-2"
                type="submit"
              >
                Quên mật khẩu ?
              </Button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
