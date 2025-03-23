import Image from "next/image";
import { TweetType } from "@/schemaValidations/tweet.schema";
import { getMediaGridLayout } from "../../_utils/mediaHelpers";

interface TweetMediaProps {
  medias: TweetType["medias"];
  onImageClick: (index: number) => void;
}

export const TweetMedia: React.FC<TweetMediaProps> = ({
  medias,
  onImageClick,
}) => {
  if (!medias || medias.length === 0) return null;

  const gridLayout = getMediaGridLayout(medias.length);

  return (
    <div className={`mt-3 grid ${gridLayout} gap-1`}>
      {medias.map((media, index) => (
        <div
          key={media._id}
          className="relative aspect-square cursor-pointer"
          onClick={() => onImageClick(index)}
        >
          <Image
            src={media.url}
            alt={`Media ${index + 1}`}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
};
