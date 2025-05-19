"use client";

import { useEffect, useState } from "react";
import { useAudio } from "@/providers/AudioProvider";
import { HomePageContext } from "./context";
import { SOUND_PATHS } from "@/data/sound-paths";
import { motion, AnimatePresence } from "framer-motion";
import LoadingPage from "./_features/loading-page/LoadingPage";
import SpeakerControl from "@/components/SpeakerControl";
import EntrySection from "./_features/main-page/components/EntrySection";
import Phase1Section from "./_features/main-page/components/Phase1Section";
import Phase2Section from "./_features/main-page/components/Phase2Section";
import useSmoothScroll from "@/hooks/useSmoothScroll";
import Phase3Section from "./_features/main-page/components/Phase3Section";
import EndSection from "./_features/main-page/components/EndSection";

export default function Home() {
  const [showLoadingPage, setShowLoadingPage] = useState(true);
  const [visibleMainSections, setVisibleMainSections] = useState({
    entrySection: true,
    phase1Section: false,
  });
  const { addSound, preloadAllSounds } = useAudio();
  const lenis = useSmoothScroll();

  useEffect(() => {
    setInterval(() => {
      lenis?.resize();
    }, 2000);
  }, []);

  useEffect(() => {
    addSound("entry-section", SOUND_PATHS.HAO_KHI_VIET_NAM);
    addSound("phase-1-section", SOUND_PATHS.BAN_TIN_CHIEN_THANG);
    addSound("phase-2-section", SOUND_PATHS.MOT_VONG_VIET_NAM);

    // Preload all sounds before playing
    preloadAllSounds();
  }, []);

  return (
    <HomePageContext
      value={{
        visibleMainSections,
        setVisibleMainSectionsFn: setVisibleMainSections,
        isShowingLoadingPage: showLoadingPage,
        setShowLoadingPageFn: setShowLoadingPage,
      }}
    >
      <div className="relative size-full">
        {/* Show loading page */}
        {showLoadingPage && (
          <div className="absolute top-0 z-[100] size-full">
            <LoadingPage />
          </div>
        )}
        {/* Show main's sections */}
        <div className="absolute top-0 z-[99] size-full">
          <AnimatePresence mode="wait">
            {/* Show Entry Section */}
            {visibleMainSections.entrySection && (
              <motion.div
                key="entrySection"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <EntrySection />
              </motion.div>
            )}

            {/* Show Phase 1 Section (30/4/1975)*/}
            {visibleMainSections.phase1Section && (
              <motion.div key="phase-1-section" className="size-fit">
                <Phase1Section />
              </motion.div>
            )}

            {/* Show Phase 2 Section (30/4/2025)*/}
            {visibleMainSections.phase1Section && (
              <motion.div
                key="phase-2-section"
                className="relative z-[300] size-auto"
              >
                <Phase2Section />
              </motion.div>
            )}

            {/* Show Phase 2 Section (30/4/2025)*/}
            {visibleMainSections.phase1Section && (
              <motion.div
                key="phase-3-section"
                className="relative z-[250] size-auto"
              >
                <Phase3Section />
              </motion.div>
            )}

            {/* Show End Section*/}
            {visibleMainSections.phase1Section && (
              <motion.div
                key="end-section"
                className="relative z-[240] size-auto"
              >
                <EndSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Show speaker control */}
        <div className="fixed top-10 right-10 z-[100]">
          <SpeakerControl />
        </div>
      </div>
    </HomePageContext>
  );
}
