import { createContext, Dispatch, SetStateAction, use, useState } from "react";

type HomePageContextProps = {
  visibleMainSections: {
    entrySection: boolean;
    phase1Section: boolean;
  };
  setVisibleMainSectionsFn: Dispatch<
    SetStateAction<{
      entrySection: boolean;
      phase1Section: boolean;
    }>
  >;
  isShowingLoadingPage: boolean;
  setShowLoadingPageFn: Dispatch<SetStateAction<boolean>>;
};

export const HomePageContext = createContext<HomePageContextProps>({
  visibleMainSections: {
    entrySection: true,
    phase1Section: false,
  },
  setVisibleMainSectionsFn: () => {},
  isShowingLoadingPage: true,
  setShowLoadingPageFn: () => {},
});

export const useHomePageContext = () => use(HomePageContext);
