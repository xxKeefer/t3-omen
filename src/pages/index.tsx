import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SpacemanLogo } from "~/components/Svgs";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Omen</title>
        <meta name="description" content="Omen: A story driven table top RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero h-full">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <SpacemanLogo className="h-full w-4/5 max-w-sm sm:w-full" />
          <div className="w-2/3 flex-grow text-center">
            <h1 className="text-7xl font-black tracking-tighter text-white sm:text-9xl">
              Omen
            </h1>
            <h2 className="py-6 text-2xl font-normal text-white sm:text-5xl">
              The Story Driven Table Top RPG.
            </h2>
            <Link href="/book">
              <button className="btn-primary btn">See the Rulebook</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
