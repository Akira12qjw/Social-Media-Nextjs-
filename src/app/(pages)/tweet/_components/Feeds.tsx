/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";

import { TweetType } from "@/schemaValidations/tweet.schema";
import Interract from "@/app/(pages)/tweet/_components/interract";
import SelectedTweet from "@/app/(pages)/tweet/_components/selectedTweet";
import MediaGrid from "@/app/(pages)/tweet/_components/renderMediaGrid";
import Loading from "../../../../components/Loading";
export default function Feeds({
  tweetData,
  loading,
}: {
  tweetData: TweetType[];
  loading: boolean;
}) {
  const [selectedTweet, setSelectedTweet] = useState<TweetType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (tweet: TweetType, initialImageIndex: number = 0) => {
    setSelectedTweet(tweet);
    setCurrentImageIndex(initialImageIndex);
  };

  const closeModal = () => {
    setSelectedTweet(null);
    setCurrentImageIndex(0);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedTweet && currentImageIndex < selectedTweet.medias.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedTweet && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-5">
        <Loading />
      </div>
    );
  }
  return (
    <>
      {tweetData.map((tweet) => (
        <div
          key={tweet._id}
          className="flex flex-row pt-3 border-r border-gray-200"
        >
          <div className="flex flex-col flex-grow-0 mr-2">
            <Image
              src={
                tweet.user.avatar ||
                "https://res.cloudinary.com/dwyvtyasp/image/upload/v1734597632/xgkaepsmtzdf25tqtzsi.png"
              }
              alt="avatar"
              className="w-14 h-14 rounded-full min-w-14"
              width={50}
              height={50}
              priority={true}
            />
          </div>
          <div className="flex flex-grow flex-col pb-3">
            <div className="mb-1 cursor-pointer font-bold">
              <h1 className="w-full text-xl hover:underline">
                {tweet.user.username}
              </h1>
            </div>
            <div>
              <p className="text-base">{tweet.content || ""}</p>
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
            <div className="my-2">
              <MediaGrid
                medias={tweet.medias}
                onImageClick={(index) => openModal(tweet, index)}
              />
            </div>
            {/* Tương tác */}
            <div className="w-full flex justify-between">
              <Interract tweet={tweet} />
            </div>
          </div>
        </div>
      ))}
      <SelectedTweet
        selectedTweet={selectedTweet}
        closeModal={closeModal}
        nextImage={nextImage}
        previousImage={previousImage}
        currentImageIndex={currentImageIndex}
      />
    </>
  );
}
