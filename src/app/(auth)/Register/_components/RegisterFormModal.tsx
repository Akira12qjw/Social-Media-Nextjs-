import React from "react";
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
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { formSchemaRegister } from "@/schemaValidations/auth.schema";
import PasswordInput from "@/components/PasswordInput";
import DatePicker from "./DatePicker";

type FormData = z.infer<typeof formSchemaRegister>;

interface RegisterFormModalProps {
  form: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
  error: string;
  handleDateChange: (type: string, value: string) => void;
}

export default function RegisterFormModal({
  form,
  onSubmit,
  onClose,
  isLoading,
  error,
  handleDateChange,
}: RegisterFormModalProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      const values = form.getValues();
      console.log("Form values before validation:", values);

      // Trigger validation for all fields
      const isValid = await form.trigger();
      console.log("Form validation result:", isValid);

      if (isValid) {
        // Get the current form values after validation
        const currentValues = form.getValues();
        console.log("Form values after validation:", currentValues);

        await onSubmit(currentValues);
      } else {
        console.log("Form validation errors:", form.formState.errors);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-5 my-4">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={onClose}
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
          <div className="p-3 bg-red-100 text-red-600 rounded-lg mb-4">
            {error}
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="space-y-3 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2"
          >
            <h1 className="font-bold text-2xl">Tạo tài khoản của bạn</h1>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên tài khoản</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập tên tài khoản"
                      {...field}
                      autoComplete="username"
                      className="ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none"
                    />
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
                    <Input
                      placeholder="Nhập email"
                      autoComplete="email"
                      className="ring-offset-background focus-visible:ring-sky-500 focus-visible:ring-2 focus-visible:outline-none"
                      {...field}
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

            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày sinh</FormLabel>
                  <FormControl>
                    <DatePicker
                      onDateChange={(type, value) => {
                        handleDateChange(type, value);
                        // Update form field value when date changes
                        if (type === "year") {
                          const date = `${value}-${
                            field.value?.split("-")[1] || "01"
                          }-${field.value?.split("-")[2] || "01"}`;
                          field.onChange(date);
                        } else if (type === "month") {
                          const date = `${
                            field.value?.split("-")[0] || "2000"
                          }-${value.padStart(2, "0")}-${
                            field.value?.split("-")[2] || "01"
                          }`;
                          field.onChange(date);
                        } else if (type === "day") {
                          const date = `${
                            field.value?.split("-")[0] || "2000"
                          }-${
                            field.value?.split("-")[1] || "01"
                          }-${value.padStart(2, "0")}`;
                          field.onChange(date);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
  );
}
