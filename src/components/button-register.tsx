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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DatePicker from "./DatePicker";

interface DateChangeHandler {
  (type: string, value: string): void;
}

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  confirmPassword: z.string().min(2).max(50),
});

export default function ButtonRegister() {
  const [isFormRegister, setisFormRegister] = useState(false);

  const handleDateChange: DateChangeHandler = (type, value) => {
    console.log(`${type}: ${value}`);
    // Xử lý logic khi ngày tháng năm thay đổi
  };
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <button
        onClick={() => setisFormRegister(true)}
        className="text-center rounded-full bg-blue-500 font-bold text-white  px-4 py-2 text-base h-16 w-full shadow-sm border border-slate-400 hover:bg-blue-600"
      >
        Tạo tài khoản
      </button>

      {isFormRegister ? (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className=" bg-white rounded-xl w-full max-w-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-3 p-3">
              <button
                onClick={() => setisFormRegister(false)}
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
                  <h1 className="font-bold text-2xl">Tạo tài khoản của bạn</h1>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên tài khoản</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập tên tài khoản" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập mật khẩu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nhập lại mật khẩu</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập lại mật khẩu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <span>Ngày sinh</span>
                  <div className="flex">
                    <DatePicker onDateChange={handleDateChange} />
                  </div>
                </form>
              </Form>
              <Button
                className="mt-3 rounded-full font-bold hover:bg-slate-700"
                type="submit"
              >
                Đăng ký
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
