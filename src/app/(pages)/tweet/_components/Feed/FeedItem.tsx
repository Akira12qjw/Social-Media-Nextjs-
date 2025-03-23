import { TweetType } from "@/schemaValidations/tweet.schema";
import { TweetAvatar } from "../shared/TweetAvatar";
import { TweetContent } from "../shared/TweetContent";
import { TweetMedia } from "../shared/TweetMedia";
import { TweetActions } from "../shared/TweetActions";

interface FeedItemProps {
  tweet: TweetType;
  onLike: (tweetId: string) => Promise<void>;
  onImageClick: (tweet: TweetType, index: number) => void;
  likedTweets: Record<string, boolean>;
  likeCounts: Record<string, number>;
  loadingLikes: Record<string, boolean>;
}

export const FeedItem: React.FC<FeedItemProps> = ({
  tweet,
  onLike,
  onImageClick,
  likedTweets,
  likeCounts,
  loadingLikes,
}) => {
  return (
    <div className="p-4 border-b border-gray-200 w-[650px]">
      <div className="flex space-x-3">
        <TweetAvatar user={tweet.user} />
        <div className="flex-1">
          <TweetContent tweet={tweet} />
          <TweetMedia
            medias={tweet.medias}
            onImageClick={(index) => onImageClick(tweet, index)}
          />
          <TweetActions
            tweet={tweet}
            onLike={onLike}
            likedTweets={likedTweets}
            likeCounts={likeCounts}
            loadingLikes={loadingLikes}
          />
        </div>
      </div>
    </div>
  );
};
