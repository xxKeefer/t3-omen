import type { NextPage } from "next";
import Head from "next/head";

const RuleBookHome: NextPage = () => {
  return (
    <>
      <Head>
        <title>Omen | Rules</title>
        <meta name="description" content="Omen: A story driven table top RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-9xl font-black tracking-tight text-white">
              Rule Book Stuff
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default RuleBookHome;
