import { useMediaQuery } from "react-responsive";

export const useScreenSizes = () => {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 768 });
  const isMediumDevices = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280, maxWidth: 1535 });
  const isBigScreen = useMediaQuery({ minWidth: 1536 });

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isBigScreen,
    isMediumDevices,
    isLargeScreen,
  };
};
