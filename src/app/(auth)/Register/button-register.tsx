/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaRegister } from "@/schemaValidations/auth.schema";
import { debounce } from "lodash";
import { toast } from "sonner";
import RegisterFormModal from "./_components/RegisterFormModal";

type FormData = z.infer<typeof formSchemaRegister>;

interface DateOfBirth {
  day: string;
  month: string;
  year: string;
}

export default function ButtonRegister() {
  const [isFormRegister, setIsFormRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<DateOfBirth>({
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
    mode: "onSubmit",
  });

  const handleDateChange = useCallback(
    debounce((type: string, value: string) => {
      setDateOfBirth((prev) => ({
        ...prev,
        [type.toLowerCase()]: value,
      }));
    }, 300),
    []
  );

  const validateDateOfBirth = useCallback(() => {
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

    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    if (age < 13) {
      throw new Error("Bạn phải từ 13 tuổi trở lên");
    }

    return date;
  }, [dateOfBirth]);

  const formatDate = useMemo(
    () =>
      (date: DateOfBirth): string => {
        const { year, month, day } = date;
        const formattedMonth = month.padStart(2, "0");
        const formattedDay = day.padStart(2, "0");
        return `${year}-${formattedMonth}-${formattedDay}`;
      },
    []
  );

  const handleClose = useCallback(() => {
    setIsFormRegister(false);
    form.reset();
    setDateOfBirth({ day: "", month: "", year: "" });
    setError("");
  }, [form]);

  const verifyEmail = async (email_verify_token: string) => {
    try {
      const response = await fetch("http://localhost:4000/users/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_verify_token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Email verification failed");
      }

      // Store tokens in localStorage
      localStorage.setItem("access_token", data.result.access_token);
      localStorage.setItem("refresh_token", data.result.refresh_token);

      toast.success("Email verified successfully!");
      return data;
    } catch (error) {
      console.error("Email verification error:", error);
      toast.error("Email verification failed");
      throw error;
    }
  };

  const onSubmit = useCallback(
    async (data: FormData) => {
      console.log("Form submitted with data:", data);
      try {
        setIsLoading(true);
        setError("");

        let birthDate;
        try {
          birthDate = validateDateOfBirth();
          console.log("Birth date validated:", birthDate);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
            setIsLoading(false);
            return;
          }
        }

        if (!birthDate) {
          setError("Ngày sinh không hợp lệ");
          setIsLoading(false);
          return;
        }

        const formattedDate = formatDate(dateOfBirth);
        console.log("Formatted date:", formattedDate);

        const requestData = {
          ...data,
          date_of_birth: formattedDate,
        };

        console.log("Sending request with data:", requestData);

        const response = await fetch("http://localhost:4000/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const responseData = await response.json();
        console.log("Response from server:", responseData);

        if (!response.ok) {
          if (responseData.errors?.email?.msg) {
            setError(responseData.errors.email.msg);
          } else if (responseData.message) {
            setError(responseData.message);
          } else {
            setError("Đăng ký thất bại");
          }
          return;
        }

        // Extract email_verify_token from response
        const { email_verify_token } = responseData;

        if (email_verify_token) {
          // Automatically verify email
          await verifyEmail(email_verify_token);
        }

        handleClose();
        toast.success("Đăng ký thành công!");
      } catch (error) {
        console.error("Registration error:", error);
        setError(error instanceof Error ? error.message : "Đã xảy ra lỗi");
      } finally {
        setIsLoading(false);
      }
    },
    [dateOfBirth, formatDate, handleClose, validateDateOfBirth]
  );

  return (
    <div className="w-full">
      <Button
        onClick={() => setIsFormRegister(true)}
        className="w-full h-16 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold"
      >
        Tạo tài khoản
      </Button>

      {isFormRegister && (
        <RegisterFormModal
          form={form}
          onSubmit={onSubmit}
          onClose={handleClose}
          isLoading={isLoading}
          error={error}
          handleDateChange={handleDateChange}
        />
      )}
    </div>
  );
}
