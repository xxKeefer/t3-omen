import { Spaceman } from "~/components/Svgs";

export default function Custom404() {
  return (
    <div className="flex h-[calc(100dvh_-_4rem)] items-center justify-center overflow-hidden bg-black/70">
      <Spaceman
        width={100}
        height={100}
        className="absolute top-16 left-0 m-0 max-w-sm animate-dvd overflow-hidden"
      />
      <h1 className="p-16 text-center text-5xl font-black tracking-tighter text-white sm:text-9xl">
        What? 404!
      </h1>
    </div>
  );
}
