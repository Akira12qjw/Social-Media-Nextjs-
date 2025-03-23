import { z } from "zod";

export const formSchemaRegister = z
  .object({
    name: z.string().min(1, "Nhập ký tự 1-100").max(100, "Nhập ký tự 1-100"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Nhập  6-50 ký tự").max(50, "Nhập  6-50 ký tự"),
    confirm_password: z
      .string()
      .min(6, "Nhập  6-50 ký tự")
      .max(50, "Nhập  6-50 ký tự"),
    date_of_birth: z.string(),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirm_password"],
      });
    }
  });

export const formSchemaLogin = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Nhập 6-50 ký tự").max(50, "Nhập 6-50 ký tự"),
});
