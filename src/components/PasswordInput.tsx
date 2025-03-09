import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { UseFormReturn, ControllerRenderProps } from "react-hook-form";

interface PasswordInputProps {
  form: UseFormReturn<any>;
  field: ControllerRenderProps<any, any>;
  name: string;
  label: string;
  placeholder: string;
}

export default function PasswordInput({
  form,
  field,
  name,
  label,
  placeholder,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getAutoCompleteValue = () => {
    switch (name) {
      case "password":
        return "current-password";
      case "confirm_password":
        return "new-password";
      default:
        return "off";
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                {...field}
                autoComplete={getAutoCompleteValue()}
              />
            </FormControl>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
