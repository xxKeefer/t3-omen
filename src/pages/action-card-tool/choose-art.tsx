"use client";

import type { NextPage } from "next";
import { useCallback, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { useRouter } from "next/navigation";
import { Head } from "~/components/Layout";
import { useActionDeck } from "~/contexts/ActionDeckContext";

const ChooseArt: NextPage = () => {
  const { setArt, getCroppedImage, resizeImage } = useActionDeck();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [croppedArea, setCroppedArea] = useState<Area>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const onConfirm = async () => {
    if (!image) return;
    const result = await getCroppedImage(image, croppedArea);
    if (!result) return;
    const resized = await resizeImage(result);
    image && setArt(resized);
    router.push("/action-card-tool/upload-overlays");
  };

  return (
    <>
      <Head
        title="Omen | Action Card Tool"
        meta="Omen: Action Card Generator Tool"
      />
      <div className="flex w-full flex-col items-center justify-center gap-4 p-16">
        <div className="card w-96 bg-base-100 p-4 shadow-xl">
          <div className="form-control w-full max-w-md">
            <label className="label">
              <span className="label-text">Choose some character art</span>
            </label>
            <input
              type="file"
              className="file-input-bordered file-input-primary file-input w-full max-w-md"
              onChange={(e) => {
                if (!e.target.files?.[0]) return null;
                setImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
        </div>
        {image && (
          <>
            <div className="relative h-96 w-96 overflow-hidden rounded-xl">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={2 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="card w-96 bg-base-100 p-4 shadow-xl">
              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text">Zoom</span>
                </label>
                <input
                  className="range range-primary"
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => {
                    setZoom(Number(e.target.value));
                  }}
                />
              </div>
            </div>
            <button
              className="btn-primary btn w-96"
              onClick={() =>
                void (async () => {
                  await onConfirm();
                })()
              }
            >
              Confirm Crop
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ChooseArt;
