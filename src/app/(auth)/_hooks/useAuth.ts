import { useState, useCallback } from "react";
import { toast } from "sonner";
import { LoginFormData, RegisterFormData } from "./useAuthForm";
import { loginUser, registerUser, logoutUser } from "../_utils/authApi";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const register = useCallback(async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError("");

      await registerUser(data);
      toast.success("Đăng ký thành công. Vui lòng đăng nhập!");
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Đã xảy ra lỗi";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError("");

      await loginUser(data);
      toast.success("Đăng nhập thành công!");
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Đã xảy ra lỗi";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      await logoutUser();
      toast.success("Đăng xuất thành công!");
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Đã xảy ra lỗi";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    register,
    login,
    logout,
  };
}
