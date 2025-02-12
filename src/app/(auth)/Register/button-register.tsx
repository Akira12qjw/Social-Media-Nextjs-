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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "./_components/DatePicker";
import { toast } from "@/hooks/use-toast";
import { formSchemaRegister } from "@/schemaValidations/auth.schema";
import PasswordInput from "../../../components/PasswordInput";

type FormData = z.infer<typeof formSchemaRegister>;

export default function ButtonRegister() {
  const [isFormRegister, setIsFormRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState({
    day: "",
    month: "",
    year: "",
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchemaRegister),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const handleDateChange = (type: string, value: string) => {
    setDateOfBirth((prev) => ({
      ...prev,
      [type.toLowerCase()]: value,
    }));
  };

  const validateDateOfBirth = () => {
    if (!dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year) {
      throw new Error("Vui lòng chọn ngày sinh");
    }

    const date = new Date(
      parseInt(dateOfBirth.year),
      parseInt(dateOfBirth.month) - 1,
      parseInt(dateOfBirth.day)
    );

    if (isNaN(date.getTime())) {
      throw new Error("Ngày sinh không hợp lệ");
    }

    // Check if user is at least 13 years old
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    if (age < 13) {
      throw new Error("Bạn phải từ 13 tuổi trở lên");
    }

    return true;
  };

  const formatDate = (date: typeof dateOfBirth): string => {
    const { year, month, day } = date;
    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError("");

      // Validate date of birth
      validateDateOfBirth();

      const formattedDate = formatDate(dateOfBirth);

      const response = await fetch("http://localhost:4000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          confirm_password: data.confirm_password,
          date_of_birth: formattedDate,
        }),
      });
      console.log("response", response);
      console.log("formattedDate ", formattedDate);
      const responseData = await response.json();
      console.log("responseData", responseData);
      if (!response.ok) {
        throw new Error(responseData.errors.email.msg || "Đăng ký thất bại");
      }

      setIsFormRegister(false);
      form.reset();
      setDateOfBirth({ day: "", month: "", year: "" });
      toast({
        title: "Đăng ký thành công. Vui lòng đăng nhập !",
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        onClick={() => setIsFormRegister(true)}
        className="w-full h-16 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold"
      >
        Tạo tài khoản
      </Button>

      {isFormRegister && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-xl w-full max-w-md p-5">
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={() => setIsFormRegister(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <span>✕</span>
              </button>
              <div>
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div className="w-8" />
            </div>

            {error && (
              <div className=" p-3 bg-red-100 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <h1 className="font-bold text-2xl">Tạo tài khoản của bạn</h1>

                <FormField
                  control={form.control}
                  name="name"
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
                    <PasswordInput
                      form={form}
                      field={field}
                      name="password"
                      label="Nhập mật khẩu"
                      placeholder="Nhập mật khẩu"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <PasswordInput
                      form={form}
                      field={field}
                      name="confirm_password"
                      label="Nhập lại mật khẩu"
                      placeholder="Nhập lại mật khẩu"
                    />
                  )}
                />

                <div>
                  <span className="block ">Ngày sinh</span>
                  <DatePicker onDateChange={handleDateChange} />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full font-bold hover:bg-slate-700 mt-5"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
