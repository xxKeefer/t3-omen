import type { NextPage } from "next";
import Link from "next/link";
import { Head } from "~/components/Layout";

const ActionCardTool: NextPage = () => {
  return (
    <>
      <Head
        title="Omen | Action Card Tool"
        meta="Omen: Action Card Generator Tool"
      />

      <div className="hero py-8">
        <div className="hero-content rounded-md bg-base-200 text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Action Card Generator</h1>
            <h2 className="py-6 text-2xl">
              Here as some tips to get best results:
            </h2>
            <ul className="flex flex-col gap-2 pb-8">
              <li>Use a 2:3 aspect ratio images for overlays</li>
              <li>Reccomended size for overlays is 400x600</li>
              <li>Overlays should have a transparent background, use a .png</li>
            </ul>
            <Link href={"/action-card-tool/choose-art"}>
              <button className="btn-primary btn">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionCardTool;
