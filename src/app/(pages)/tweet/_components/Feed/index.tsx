import { TweetType } from "@/schemaValidations/tweet.schema";
import { FeedItem } from "./FeedItem";
import { useTweet } from "../../_hooks/useTweet";
import { useTweetActions } from "../../_hooks/useTweetActions";
import { useInfiniteScroll } from "../../_hooks/useInfiniteScroll";
import { TweetModal } from "../TweetModal";

interface FeedProps {
  tweetData: TweetType[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const Feed: React.FC<FeedProps> = ({
  tweetData,
  loading,
  hasMore,
  onLoadMore,
}) => {
  const {
    selectedTweet,
    currentImageIndex,
    handleImageClick,
    handleCloseModal,
    handleNextImage,
    handlePreviousImage,
  } = useTweet();
  const { likedTweets, likeCounts, loadingLikes, handleLike } =
    useTweetActions();
  const { loadingRef } = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore,
  });

  return (
    <div>
      {tweetData.map((tweet, index) => (
        <FeedItem
          key={`${tweet._id}-${index}`}
          tweet={tweet}
          onLike={handleLike}
          onImageClick={handleImageClick}
          likedTweets={likedTweets}
          likeCounts={likeCounts}
          loadingLikes={loadingLikes}
        />
      ))}
      {loading && (
        <div ref={loadingRef} className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      <TweetModal
        tweet={selectedTweet}
        currentIndex={currentImageIndex}
        onClose={handleCloseModal}
        onNext={handleNextImage}
        onPrevious={handlePreviousImage}
      />
    </div>
  );
};
