import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Omen</title>
        <meta name="description" content="Omen: A story driven table top RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero h-full">
        <div className="hero-content text-center">
          <div className="max-w-xs sm:max-w-md">
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
