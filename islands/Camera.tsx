import { useEffect, useRef, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface CameraProps {
  id: string;
  className?: string;
}

export default function Camera({ id }: CameraProps) {
  let videoRef = useRef();
  let canvasRef = useRef();

  function takePhoto(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas?.getContext("2d")?.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  }

  function clearPhoto(canvas: HTMLCanvasElement) {
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  }

  async function startCapture(video: HTMLVideoElement) {
    console.log(video);
    const constraints = {
      video: {
        width: video.offsetWidth,
        height: video.offsetHeight,
      },
    };

    try {
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia(
        constraints,
      );
      console.log("getUserMedia() got stream:", stream);

      video.srcObject = stream;
    } catch (e) {
      console.error("navigator.getUserMedia error:", e);
    }
  }

  function stopCapture(video: HTMLVideoElement) {
    const stream: any = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track: any) => {
      track.stop();
    });

    video.srcObject = null;
  }

  // async function getMedia() {
  //   const userMedia = await window.navigator.mediaDevices.getUserMedia({
  //     video: true,
  //     audio: true,
  //   });

  //   console.log(userMedia);

  //   setMediaStream(userMedia);
  // }

  useEffect(() => {
    if (
      typeof window !== "undefined" && canvasRef.current && videoRef.current
    ) {
      startCapture(videoRef.current);
    }
  }, []);

  return (
    <div class="flex flex-col gap-2 w-full">
      <canvas
        ref={canvasRef as any}
        width="640"
        height="480"
        id={`${id}-canvas`}
      >
      </canvas>
      <input type="button" value="RECORD" onClick={(e) => {}} />
      <input type="button" value="SAVE" />
      <video
        ref={videoRef as any}
        id={`${id}-video`}
        width="640"
        autoPlay
      />
    </div>
  );
}
