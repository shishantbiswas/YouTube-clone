"use client";
import Hls from "hls.js";
import React, { useEffect, useRef } from "react";

export function HlsPlayer({ url }: { url: string }) {
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (Hls.isSupported() && player.current) {
      let hls = new Hls();
     
      hls.loadSource(url)
      hls.attachMedia(player.current);

    }
  }, [player, url]);

  return (
    <div className="p-4 pb-0">
      <div className=" md:h-[450px] lg:h-[600px]">
        <video
        autoPlay
          className="h-full w-full rounded-lg"
          crossOrigin="anonymous"
          controls
          ref={player}
        ></video>
      </div>
    </div>
  );
}
