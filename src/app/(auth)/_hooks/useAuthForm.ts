import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formSchemaLogin,
  formSchemaRegister,
} from "@/schemaValidations/auth.schema";
import * as z from "zod";

export type LoginFormData = z.infer<typeof formSchemaLogin>;
export type RegisterFormData = z.infer<typeof formSchemaRegister>;

export function useLoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  return form;
}

export function useRegisterForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchemaRegister),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      date_of_birth: "",
    },
    mode: "onSubmit",
  });

  return form;
}
