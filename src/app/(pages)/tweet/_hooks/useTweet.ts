import { useState, useCallback } from "react";
import { TweetType } from "@/schemaValidations/tweet.schema";

export const useTweet = () => {
  const [selectedTweet, setSelectedTweet] = useState<TweetType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = useCallback((tweet: TweetType, index: number) => {
    setSelectedTweet(tweet);
    setCurrentImageIndex(index);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTweet(null);
    setCurrentImageIndex(0);
  }, []);

  const handleNextImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (
        selectedTweet &&
        currentImageIndex < selectedTweet.medias.length - 1
      ) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    },
    [selectedTweet, currentImageIndex]
  );

  const handlePreviousImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (selectedTweet && currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      }
    },
    [selectedTweet, currentImageIndex]
  );

  return {
    selectedTweet,
    currentImageIndex,
    handleImageClick,
    handleCloseModal,
    handleNextImage,
    handlePreviousImage,
  };
};
