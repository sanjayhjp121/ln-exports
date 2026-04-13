"use client";

import { useRef, useState } from "react";

interface FactoryVideo {
  id: string;
  src: string;
  title: string;
  description: string;
  icon: string;
  stage: string;
}

const VIDEOS: FactoryVideo[] = [
  {
    id: "quarry",
    src: "/quarry-aerial.mp4",
    title: "Quarry Extraction",
    description:
      "Aerial footage from our partner quarries in Rajasthan and Italy. Blocks are precision-cut at the source using diamond wire saws.",
    icon: "landscape",
    stage: "Stage 1",
  },
  {
    id: "cutting",
    src: "/factory-cutting.mp4",
    title: "Precision Cutting",
    description:
      "Industrial CNC and bridge saw cutting of raw blocks into slabs, tiles, and custom dimensions with millimeter accuracy.",
    icon: "content_cut",
    stage: "Stage 2",
  },
  {
    id: "polishing",
    src: "/factory-marble.mp4",
    title: "Polishing & Finishing",
    description:
      "Multi-head polishing lines transform rough surfaces into mirror-finish, honed, or leather-textured final products.",
    icon: "auto_awesome",
    stage: "Stage 3",
  },
];

function VideoCard({ video }: { video: FactoryVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="group">
      <div className="relative aspect-video overflow-hidden rounded-[0.125rem] tonal-shadow bg-surface-container-low">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onMouseEnter={() => {
            videoRef.current?.play();
            setIsPlaying(true);
          }}
          onMouseLeave={() => {
            videoRef.current?.pause();
            setIsPlaying(false);
          }}
        >
          <source src={video.src} type="video/mp4" />
        </video>

        {/* Play overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 cursor-pointer ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
          onClick={togglePlay}
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-3xl ml-1">
              play_arrow
            </span>
          </div>
        </div>

        {/* Live badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white text-[10px] uppercase tracking-widest font-label font-bold">
            {video.stage}
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-xl">{video.icon}</span>
          <h4 className="font-headline text-xl text-on-surface">{video.title}</h4>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed pl-9">
          {video.description}
        </p>
      </div>
    </div>
  );
}

export default function FactoryVideos() {
  return (
    <section id="factory" className="py-32 bg-surface-container-lowest/50 backdrop-blur-sm">
      <div className="container mx-auto px-8 md:px-24">
        <div className="mb-16 text-center">
          <span className="text-primary font-label text-xs uppercase tracking-[0.4em] font-bold">
            From Quarry to Countertop
          </span>
          <h2 className="font-headline text-4xl md:text-5xl text-on-surface mt-2">
            Inside Our Factories
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mt-4 font-light text-lg">
            Watch live footage from our quarries and processing units — every slab is
            cut, polished, and quality-checked before it reaches you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-on-surface-variant text-sm italic">
            Want a factory walkthrough? We offer virtual factory tours via video call.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-primary font-label text-xs uppercase tracking-widest font-bold mt-3 hover:text-primary-container transition-colors"
          >
            Schedule a Tour
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
