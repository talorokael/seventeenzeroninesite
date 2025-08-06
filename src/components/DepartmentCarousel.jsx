import React, { useRef, useState, useEffect } from "react";

// Example carousel data. Replace with your actual video/image/link paths.
const carouselItems = [
  {
    video: "/src/assets/videos/For Da Money Official Music Video - 1709 Records (1080p, h264) (1).mp4",
    image: "/src/assets/images/peep-record.webp",
    link: "https://www.youtube.com/watch?v=NnQb6yX8DdQ&list=RDNnQb6yX8DdQ&start_radio=1"
  },
  {
    video: "/src/assets/videos/ICE (OFFICIAL VIDEO) - 1709 Records (1080p, h264).mp4",
    image: "/src/assets/images/peep-disc.webp",
    link: "https://www.youtube.com/watch?v=Prl0bO-QJ7g"
  },
  // Add more items as needed
  {
    video: "/src/assets/videos/No Regrets (Official Music Video) - 1709 Records (1080p, h264).mp4",
    image: "/src/assets/images/peep-tape.webp",
    link: "https://www.youtube.com/watch?v=29N7s3DLcIc"
  },
  {
    video: "/src/assets/videos/NUMBA (OFFICIAL MUSIC VIDEO) - 1709 Records (1080p, h264).mp4",
    image: "/src/assets/images/bts-pc.jpg",
    link: "https://www.youtube.com/watch?v=gBmKJZhcaPA"
  }
];

function getMiddleSegment(videoEl, setLoop) {
  if (!videoEl.duration || isNaN(videoEl.duration)) return;
  const duration = videoEl.duration;
  const segment = 15;
  const start = Math.max(0, (duration / 2) - (segment / 2));
  const end = Math.min(duration, start + segment);
  setLoop({ start, end });
  videoEl.currentTime = start;
  videoEl.play();
}

export default function DepartmentCarousel() {
  const [current, setCurrent] = useState(0);
  const [loop, setLoop] = useState({ start: 0, end: 15 });
  const videoRef = useRef(null);
  const holdTimeout = useRef();

  // Loop only the middle 15s
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => getMiddleSegment(video, setLoop);
    video.addEventListener("loadedmetadata", onLoaded);
    const onTimeUpdate = () => {
      if (video.currentTime >= loop.end) video.currentTime = loop.start;
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [current, loop.start, loop.end]);

  // Carousel navigation
  function goTo(idx) {
    setCurrent(prevIdx => {
      let newIdx = idx;
      // If idx is relative, adjust from prevIdx
      if (typeof idx === 'function') newIdx = idx(prevIdx);
      if (newIdx < 0) newIdx = carouselItems.length - 1;
      if (newIdx >= carouselItems.length) newIdx = 0;
      return newIdx;
    });
  }
  function next() { goTo(prevIdx => prevIdx + 1); }
  function prev() { goTo(prevIdx => prevIdx - 1); }

  // Trackpad/mouse horizontal scroll (debounced)
  const scrollTimeout = useRef();
  const scrolling = useRef(false);
  useEffect(() => {
    function onWheel(e) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (!scrolling.current) {
          if (e.deltaX > 0) next();
          else if (e.deltaX < 0) prev();
          scrolling.current = true;
          clearTimeout(scrollTimeout.current);
          scrollTimeout.current = setTimeout(() => {
            scrolling.current = false;
          }, 400); // 400ms debounce
        }
      }
    }
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Click and hold navigation
  function handleHold(dir) {
    holdTimeout.current = setTimeout(() => {
      if (dir === "left") prev();
      else next();
    }, 300);
  }
  function clearHold() {
    clearTimeout(holdTimeout.current);
  }

  const item = carouselItems[current];

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#000" }}>
      <video
        ref={videoRef}
        src={item.video}
        autoPlay
        muted
        loop={false}
        playsInline
        style={{ width: "100vw", height: "100vh", objectFit: "cover", position: "absolute", top: 0, left: 0, zIndex: 1 }}
      />
      {/* Overlay image, same size/placement as homepage image */}
      <a href={item.link} target="_blank" rel="noopener noreferrer"
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}>
        <img src={item.image} alt="overlay" style={{ maxWidth: "53vw", maxHeight: "53vh", borderRadius: 8, boxShadow: "0 0 32px #000a" }} />
      </a>
      {/* Left/right arrows */}
      <button
        onMouseDown={() => handleHold("left")}
        onMouseUp={clearHold}
        onMouseLeave={clearHold}
        onClick={prev}
        style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", zIndex: 3, fontSize: 32, background: "rgba(0,0,0,0.5)", color: "#fff", border: "none", borderRadius: 24, width: 48, height: 48, cursor: "pointer" }}
        aria-label="Previous"
      >&#8592;</button>
      <button
        onMouseDown={() => handleHold("right")}
        onMouseUp={clearHold}
        onMouseLeave={clearHold}
        onClick={next}
        style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 3, fontSize: 32, background: "rgba(0,0,0,0.5)", color: "#fff", border: "none", borderRadius: 24, width: 48, height: 48, cursor: "pointer" }}
        aria-label="Next"
      >&#8594;</button>
    </div>
  );
}
