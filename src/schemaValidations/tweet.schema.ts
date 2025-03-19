import z from "zod";
export const hashtagSchema = z.object({
  _id: z.string(),
  name: z.string(),
  created_at: z.string(), // ISO date format.
});

export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  verify: z.number(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  username: z.string(),
  avatar: z.string().optional(),
  cover_photo: z.string().optional(),
});
export const tweetSchema = z.object({
  _id: z.string(),
  user_id: z.string(),
  type: z.number(),
  audience: z.number(),
  content: z.string(),
  parent_id: z.string().nullable(),
  hashtags: z.array(hashtagSchema),
  mentions: z.array(z.any()), // Adjust based on structure if needed.
  medias: z.array(z.any()), // Adjust based on structure if needed.
  guest_views: z.number(),
  user_views: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  user: userSchema,
  bookmarks: z.number(),
  likes: z.number(),
  retweet_count: z.number(),
  comment_count: z.number(),
  quote_count: z.number(),
  is_liked: z.boolean().optional(),
});

export const tweetListSchema = z.object({
  message: z.string(),
  result: z.object({
    tweets: z.array(tweetSchema),
    limit: z.number(),
    page: z.number(),
    total_page: z.number(),
  }),
});
export type TweetType = z.infer<typeof tweetSchema>;
export type TweetListResType = z.infer<typeof tweetListSchema>;
