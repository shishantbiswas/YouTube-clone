"use client";
import Hls from "hls.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { FullscreenIcon, LoaderIcon, PauseIcon, PlayIcon, Volume2Icon, VolumeXIcon } from "lucide-react";

export function HlsPlayer({
  videoSource,
  thumbnailSource
}: {
  videoSource: string,
  thumbnailSource: string
}) {

  const player = useRef<HTMLVideoElement>(null);


  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState([0, 0]);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>();
  const [duration, setDuration] = useState<[number, number]>([0, 0]);
  const [durationSec, setDurationSec] = useState<number>();
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)


  useEffect(() => {
    if (Hls.isSupported() && player.current) {
      const hls = new Hls();

      hls.loadSource(videoSource)
      hls.attachMedia(player.current);

      player.current.addEventListener('canplaythrough', () => {
        setLoading(false)
        if (player.current) {
          setIsPlaying(true)
          player.current.play();
        }
      });

      return () => {
        if (player.current) {
          player.current.addEventListener('canplaythrough', () => {
            setLoading(false)
            if (player.current) {
              setIsPlaying(true)
              player.current.play();
            }
          });
        }
        hls.destroy()
      }
    }
  }, [player, videoSource]);


  const tooglePlayPause = useCallback(() => {
    if (player.current) {
      if (isPlaying) {
        player.current.pause();
      } else {
        player.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [player, isPlaying])

  const toogleMute = useCallback(() => {
    if (player.current) {
      if (isMuted) {
        player.current.muted = false
        setIsMuted(false)
      } else {
        player.current.muted = true
        setIsMuted(true)
      }
    }
  }, [isMuted, player])

  const toggleFullscreen = useCallback(() => {
    if (player.current) {
      if (!document.fullscreenElement) {
        if (player.current.requestFullscreen) {
          player.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, [player, isFullscreen,])

  const sec2Min = (sec: number) => {
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    return {
      min: min,
      sec: secRemain,
    };
  };

  const updateCurrentTime = useCallback(() => {
    if (!player.current) return

    const { min, sec } = sec2Min(player.current.duration)
    setDurationSec(player.current.duration);
    setDuration([min, sec]);

    const interval = setInterval(() => {
      if (!player.current) return

      const { min, sec } = sec2Min(player.current.currentTime)
      setCurrentTimeSec(player.current.currentTime);
      setCurrentTime([min, sec]);
    }, 10);

    return () => clearInterval(interval);

  }, [isPlaying, player])


  useEffect(() => {
    updateCurrentTime()
  }, [updateCurrentTime]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

      switch (event.code) {
        case "Space":
          tooglePlayPause();
          break
        case "KeyF":
          toggleFullscreen();
          break
        case "KeyM":
          toogleMute()
          break
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, isFullscreen, isMuted, toogleMute, tooglePlayPause, toggleFullscreen]);



  return (
    <div className=" p-0 md:p-4 pb-0">
      <div className="group h-[230px] md:rounded-md sm:h-[300px] md:h-[400px] lg:h-[500px] relative overflow-hidden">
        <img
          className=" size-full object-cover absolute top-0 transition-all duration-200"
          style={{ opacity: loading ? '100%' : '0%' }}
          src={thumbnailSource ? thumbnailSource : "https://c.wallhere.com/photos/40/c6/anime_girls_gun_Rebecca_edgerunners_Cyberpunk_Edgerunners_Adam_Smasher_girls_with_guns-2183323.jpg!d"}
          alt="thumbnail" />
        <div
          style={{ opacity: loading ? '100%' : '0%' }}
          className=" absolute bottom-4 right-4 rounded-lg px-3 py-1 flex items-center gap-2 bg-slate-100">
          <LoaderIcon size={18} className=" animate-spin transition-all duration-200" />Loading...</div>
        <video
          className="h-full w-full md:rounded-lg"
          crossOrigin="anonymous"
          controlsList="nodownload"
          autoPlay={isPlaying}
          ref={player}
        ></video>

        <div className="absolute top-0 right-0 flex items-center justify-center size-full">
          <Button
            style={{ opacity: loading ? '0%' : "" }}
            variant={'outline'}
            className="rounded-full aspect-square p-1 size-16 group-hover:opacity-100 opacity-0 transition-all"
            onClick={tooglePlayPause}>
            {isPlaying ? (<PauseIcon size={30} />) : (<PlayIcon size={30} />)}
          </Button>
        </div>

        <div
          style={{ opacity: !loading ? '100%' : '0%' }}
          className="flex translate-y-16 group-hover:translate-y-0 transition-all items-center gap-2 px-4 absolute bottom-0 w-full py-2 bg-black/20">
          <Button
            variant={'outline'}
            size={'sm'}
            className="rounded-full aspect-square p-2"
            onClick={tooglePlayPause}>
            {isPlaying ? (<PauseIcon />) : (<PlayIcon />)}
          </Button>
          <Button
            variant={'outline'}
            size={'sm'}
            style={{ backgroundColor: isMuted ? "#e67b6e" : 'white' }}
            className="rounded-full aspect-square p-2 "
            onClick={toogleMute}
          >
            {isMuted ? (<VolumeXIcon />) : (<Volume2Icon />)}
          </Button>
          <p className=" text-nowrap">
            {currentTime[0]}:{currentTime[1]} / {duration[0] ? duration[0] : 0}:{duration[1] ? duration[1] : 0}
          </p>
          <Slider
            min={0}
            max={durationSec}
            defaultValue={currentTime}
            value={[currentTimeSec ? currentTimeSec : 0, 0]}
            onValueChange={(e) => {
              if (player.current) {
                player.current.currentTime = e[1];
              }
            }}
            className="w-full ml-2 cursor-pointer"
          />
          <Button
            className="rounded-full aspect-square p-2 bg-gray-100/50"
            variant={'outline'}
            size={'sm'}
            onClick={toggleFullscreen}><FullscreenIcon /></Button>
        </div>
      </div>
    </div>
  );
}
