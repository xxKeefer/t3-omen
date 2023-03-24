import type { NextPage } from "next";

import { api } from "~/utils/api";
import { Head } from "~/components/Layout";
import { useSession } from "next-auth/react";

const Dashboard: NextPage = () => {
  const { data: session } = useSession();
  const { data } = api.characters.getConfigs.useQuery({
    user: session?.user.id ?? "",
  });

  return (
    <>
      <Head
        title="Omen | Dashboard"
        meta="Omen: A story driven table top RPG"
      />
      <div className="h-full w-full p-4 ">
        <div className="card bg-neutral-100 shadow-xl">
          <div className="card-body flex flex-col items-center gap-4 text-center">
            <button
              onClick={() => console.log({ data })}
              className="btn-lg btn"
            >
              TEST TEST TEST
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
