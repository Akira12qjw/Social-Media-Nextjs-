/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";

interface MediaGridProps {
  medias: any[];
  onImageClick: (index: number) => void;
}

const MediaGrid: React.FC<MediaGridProps> = ({ medias, onImageClick }) => {
  if (!medias || medias.length === 0) return null;

  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-2",
    4: "grid-cols-2",
  };

  return (
    <div
      className={`grid gap-1 transition-all ${
        gridClasses[Math.min(4, medias.length) as keyof typeof gridClasses]
      }`}
    >
      {medias
        .map((media, index) => {
          const isThirdInThree = medias.length === 3 && index === 2;
          const gridSpan = isThirdInThree ? "col-span-2" : "";
          const isFirstImage = index === 0;

          return (
            <div
              key={index}
              className={`relative ${gridSpan} ${
                medias.length > 1 ? "aspect-square" : ""
              } overflow-hidden rounded-lg ${
                media.type === 0 ? "cursor-pointer" : ""
              }`}
              onClick={() => {
                if (media.type === 0) {
                  onImageClick(index);
                }
              }}
            >
              {media.type === 0 ? (
                medias.length === 1 ? (
                  <Image
                    src={media.url || ""}
                    alt="Content"
                    className="object-contain w-min h-auto"
                    width={500}
                    height={200}
                    priority={isFirstImage}
                    loading={isFirstImage ? "eager" : "lazy"}
                    sizes="(max-width: 168px) 100vw, 50vw"
                  />
                ) : (
                  <Image
                    src={media.url || ""}
                    alt="Content"
                    className="object-cover w-full h-full"
                    width={200}
                    height={200}
                    priority={isFirstImage}
                    loading={isFirstImage ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )
              ) : media.type === 1 ? (
                <video
                  controls
                  className="w-full h-full object-cover"
                  preload={isFirstImage ? "auto" : "none"}
                >
                  <source src={media.url || ""} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}

              {/* Overlay for 4+ images */}
              {medias.length > 4 && index === 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    +{medias.length - 4}
                  </span>
                </div>
              )}
            </div>
          );
        })
        .slice(0, 4)}
    </div>
  );
};

export default MediaGrid;
