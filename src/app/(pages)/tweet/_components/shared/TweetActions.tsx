import { TweetType } from "@/schemaValidations/tweet.schema";
import { motion } from "framer-motion";

interface TweetActionsProps {
  tweet: TweetType;
  onLike: (tweetId: string) => Promise<void>;
  likedTweets: Record<string, boolean>;
  likeCounts: Record<string, number>;
  loadingLikes: Record<string, boolean>;
}

export const TweetActions: React.FC<TweetActionsProps> = ({
  tweet,
  onLike,
  likedTweets,
  likeCounts,
}) => {
  return (
    <div className="flex justify-between mt-3 text-gray-500">
      <div className="flex items-center space-x-1">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
          <g>
            <path
              fill="currentColor"
              d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
            />
          </g>
        </svg>
        <span>{tweet.comment_count || 0}</span>
      </div>
      <div className="flex items-center space-x-1">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
          <g>
            <path
              fill="currentColor"
              d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
            />
          </g>
        </svg>
        <span>{tweet.retweet_count || 0}</span>
      </div>
      <div
        className={`flex items-center space-x-1 cursor-pointer group ${
          likedTweets[tweet._id] ? "text-[#f91880]" : "hover:text-[#f91880]"
        }`}
        onClick={() => onLike(tweet._id)}
      >
        <motion.div
          key={likedTweets[tweet._id] ? "liked" : "not-liked"}
          animate={{
            scale: likedTweets[tweet._id] ? [1, 1.3, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
            <g>
              <path
                fill="currentColor"
                d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09A4.498 4.498 0 0 0 7.697 5.5c-1.243 0-2.5.188-3.44 2.128C1.313 9.78 1.5 11 1.5 12.5c0 2.25.179 3.25 1.045 4.5.455 1.25 1.179 2.25 2.006 3.31 3.736 4.24 5.653 6.54 6.139 8.52.485 1.98.485 3.08.485 4.59h1.5c0-1.51 0-2.61.485-4.59.486-1.98 2.403-4.28 6.139-8.52.827-1.06 1.551-2.06 2.006-3.31C22.321 15.75 22.5 14.75 22.5 12.5c0-1.5-.187-2.72-.857-3.872C20.697 5.688 19.44 5.5 18.197 5.5h-1.5Z"
              />
            </g>
          </svg>
        </motion.div>
        <span>{likeCounts[tweet._id] || 0}</span>
      </div>
    </div>
  );
};
