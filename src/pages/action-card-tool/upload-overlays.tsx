"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Head } from "~/components/Layout";
import { useActionDeck } from "~/contexts/ActionDeckContext";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";

const UploadOverlays: NextPage = () => {
  const {
    setOverlays,
    makeBase64Strings,
    state: { overlays, art },
  } = useActionDeck();
  const router = useRouter();

  const [themeName, setThemeName] = useState<string>();
  const [selectedTheme, setSelectedTheme] = useState<string>();
  const [themes, setThemes] = useState<string[]>(() => getDeckKeys());

  useEffect(() => {
    if (!art) {
      router.push("/action-card-tool");
    }
  }, [router, art]);

  return (
    <>
      <Head
        title="Omen | Action Card Tool"
        meta="Omen: Action Card Generator Tool"
      />

      <div className="flex w-full flex-col items-center justify-center gap-4 p-16">
        <div className="card flex flex-row gap-6 bg-base-100 p-4 shadow-xl">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Choose the action overlays</span>
            </label>
            <input
              type="file"
              multiple
              accept="image/png"
              className="file-input-bordered file-input-primary file-input w-full max-w-md"
              onChange={(e) => {
                void (async () => {
                  setOverlays(await makeBase64Strings(e.target.files));
                })();
              }}
            />
            <label className="label">
              <span className="label-text-alt">
                Use 400x600 .png files with transparency
              </span>
            </label>
          </div>
          {themes.length > 0 && (
            <>
              <div className="divider divider-horizontal">OR</div>
              <div className="flex items-center gap-2">
                <div className="form-control w-full max-w-md">
                  <label className="label">
                    <span className="label-text">
                      Load saved action overlays
                    </span>
                  </label>
                  <select
                    className="select-bordered select-primary select"
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                  >
                    <option disabled selected>
                      Select Theme
                    </option>
                    {getDeckKeys().map((key) => (
                      <option key={key} value={key}>
                        {key.split("deckTheme_")[1]}
                      </option>
                    ))}
                  </select>
                  <label className="label">
                    <span className="label-text-alt">
                      These overlays will be lost if you clear your cache
                    </span>
                  </label>
                </div>
                <button
                  className="btn-primary btn"
                  disabled={!selectedTheme || themes.length === 0}
                  onClick={() =>
                    selectedTheme && setOverlays(getDeckTheme(selectedTheme))
                  }
                >
                  Load
                </button>
                <button
                  className="btn-error btn-square btn"
                  disabled={!selectedTheme || themes.length === 0}
                  onClick={() => {
                    selectedTheme && deleteDeckTheme(selectedTheme);
                    setThemes(getDeckKeys());
                    setOverlays(null);
                  }}
                >
                  <FiTrash2 />
                </button>
              </div>
            </>
          )}
        </div>
        {overlays && (
          <>
            <div className="rounded-xl bg-base-300 p-4">
              <h2 className="pb-4 text-xl">Overlay Previews</h2>
              <div className="flex flex-wrap gap-2">
                {overlays.map(
                  (overlay) =>
                    overlay && (
                      <Image
                        className="rounded ring-1 ring-white ring-opacity-50"
                        src={overlay}
                        alt="overlay image"
                        height={300}
                        width={200}
                        key={overlay}
                      />
                    )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-end gap-4 rounded-xl bg-base-300 p-4">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Theme name</span>
                  </label>
                  <input
                    className="input-bordered input-primary input w-full"
                    type="text"
                    placeholder="Theme Name"
                    value={themeName}
                    onChange={(e) => setThemeName(e.target.value)}
                  />
                </div>
                <button
                  className="btn-primary btn"
                  disabled={!themeName}
                  onClick={() => {
                    themeName && setDeckTheme(themeName, overlays);
                    setThemes(getDeckKeys());
                  }}
                >
                  Save
                </button>
              </div>
              <button
                className="btn-secondary btn w-full"
                disabled={overlays === null}
                onClick={() => router.push("/action-card-tool/make-deck")}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UploadOverlays;

const setDeckTheme = (key: string, value: (string | null)[]) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(`deckTheme_${key}`, JSON.stringify(value));
  }
};

const getDeckKeys = () => {
  if (typeof window !== "undefined") {
    return Object.keys(window.localStorage).filter((key) =>
      key.startsWith("deckTheme_")
    );
  }
  return [];
};

const getDeckTheme = (key: string) => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem(key) || "[]") as string[];
  }
  return [];
};

const deleteDeckTheme = (key: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
};
