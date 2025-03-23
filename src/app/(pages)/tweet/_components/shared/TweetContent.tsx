import { TweetType } from "@/schemaValidations/tweet.schema";
import { formatTimeFromNow } from "@/utils/formatTimeFromNow";

interface TweetContentProps {
  tweet: TweetType;
}

export const TweetContent: React.FC<TweetContentProps> = ({ tweet }) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span className="font-bold hover:underline cursor-pointer">
            {tweet.user?.username}
          </span>
          <span className="text-gray-500">
            @{tweet.user?.email?.split("@")[0]}
          </span>
          <span className="text-gray-500">
            · {formatTimeFromNow(tweet.created_at)}
          </span>
        </div>
      </div>
      <p className="text-gray-900 mt-1">{tweet.content}</p>
      <div>
        {tweet.hashtags.map((hashtag) => (
          <span
            key={hashtag._id}
            className="mr-2 text-blue-500 hover:underline cursor-pointer text-base"
          >
            #{hashtag.name || ""}
          </span>
        ))}
      </div>
    </div>
  );
};
