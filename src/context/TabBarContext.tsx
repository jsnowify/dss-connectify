import { createContext, useContext, useRef } from "react";
import { Animated } from "react-native";

type TabBarContextType = {
  tabBarTranslateY: Animated.Value;
  handleScroll: (event: any) => void;
};

const TabBarContext = createContext<TabBarContextType | null>(null);

const TAB_BAR_HEIGHT = 70;
const SCROLL_THRESHOLD = 10;

export const TabBarProvider = ({ children }: { children: React.ReactNode }) => {
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const accumulatedScroll = useRef(0);
  const isHidden = useRef(false);

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const diff = currentScrollY - lastScrollY.current;
    lastScrollY.current = currentScrollY;

    if (currentScrollY <= 0) {
      accumulatedScroll.current = 0;
      Animated.timing(tabBarTranslateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      isHidden.current = false;
      return;
    }

    accumulatedScroll.current += diff;

    if (accumulatedScroll.current > SCROLL_THRESHOLD && !isHidden.current) {
      isHidden.current = true;
      accumulatedScroll.current = 0;
      Animated.timing(tabBarTranslateY, {
        toValue: TAB_BAR_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }

    if (accumulatedScroll.current < -SCROLL_THRESHOLD && isHidden.current) {
      isHidden.current = false;
      accumulatedScroll.current = 0;
      Animated.timing(tabBarTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <TabBarContext.Provider value={{ tabBarTranslateY, handleScroll }}>
      {children}
    </TabBarContext.Provider>
  );
};

export const useTabBar = () => {
  const context = useContext(TabBarContext);
  if (!context) throw new Error("useTabBar must be used within TabBarProvider");
  return context;
};
