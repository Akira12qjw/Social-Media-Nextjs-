import Image from "next/image";
import { UserType } from "@/schemaValidations/user.schema";

interface TweetAvatarProps {
  user: UserType;
}

export const TweetAvatar: React.FC<TweetAvatarProps> = ({ user }) => {
  return (
    <div className="flex-shrink-0">
      <Image
        src={
          user.avatar ||
          "https://res.cloudinary.com/dwyvtyasp/image/upload/v1734597632/xgkaepsmtzdf25tqtzsi.png"
        }
        alt="avatar"
        className="w-14 h-14 rounded-full min-w-14"
        width={50}
        height={50}
        priority={true}
      />
    </div>
  );
};
