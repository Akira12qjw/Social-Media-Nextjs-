import z from "zod";

export const AccountSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  date_of_birth: z.string().or(z.date()),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
  verify: z.number(),
  twitter_circle: z.array(z.string()), // Sửa thành array of strings
  bio: z.string(),
  location: z.string(),
  website: z.string(),
  username: z.string(),
  avatar: z.string(),
  cover_photo: z.string(),
});

// Schema response khớp với API response
export const profileRes = z.object({
  message: z.string(),
  result: AccountSchema,
});

export type AccountType = z.infer<typeof AccountSchema>;
export type ProfileResType = z.infer<typeof profileRes>;
