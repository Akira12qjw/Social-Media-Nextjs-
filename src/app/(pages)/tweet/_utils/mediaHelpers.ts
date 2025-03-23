export const getMediaGridLayout = (mediaCount: number): string => {
  switch (mediaCount) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-2";
    case 4:
      return "grid-cols-2";
    default:
      return "grid-cols-2";
  }
};

export const getMediaSize = (mediaCount: number): string => {
  switch (mediaCount) {
    case 1:
      return "w-full h-full";
    case 2:
      return "w-full h-full";
    case 3:
      return "w-full h-full";
    case 4:
      return "w-full h-full";
    default:
      return "w-full h-full";
  }
};
