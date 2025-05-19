import { useAudio } from "@/providers/AudioProvider";
import React from "react";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";

function SpeakerControl() {
  const { toggleMute, isMuted } = useAudio();

  const handleToggleMute = () => {
    toggleMute && toggleMute();
  };

  return (
    <div
      onClick={handleToggleMute}
      className="relative flex cursor-pointer items-center justify-center rounded-full border-2 p-3"
    >
      {isMuted ? (
        <GoMute className="text-lg text-black" onClick={toggleMute} />
      ) : (
        <GoUnmute className="text-lg text-black" onClick={toggleMute} />
      )}
    </div>
  );
}

export default SpeakerControl;
