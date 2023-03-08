import type { NextPage } from "next";
import { useState } from "react";
import {
  AdminDashboardControls,
  AdminDashboardPagination,
  AdminDashboardTable,
} from "~/components/Tables";
import { api } from "~/utils/api";
import type { inferRouterInputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import Head from "next/head";

type Filter = inferRouterInputs<AppRouter>["adminDashboard"]["getUsers"];

const Dashboard: NextPage = () => {
  const [filter, setFilter] = useState<Filter>({
    pagination: { skip: 0, take: 10 },
    role: "user",
    text: "",
  });

  const { data: users } = api.adminDashboard.getUsers.useQuery(filter);

  const prevPageDisabled =
    (users?.length ?? 0) === 0 ||
    (users?.some(({ cursor }) => cursor === 1) ?? true);
  const nextPageDisabled = (users?.length ?? 0) < filter.pagination.take;

  const selectRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({
      ...prev,
      role: e.target.value as Filter["role"],
    }));
  };

  const filterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      text: e.target.value,
    }));
  };

  const selectPageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        take: Number(e.target.value),
      },
    }));
  };

  return (
    <>
      <Head>
        <title>Omen | Admins</title>
        <meta name="description" content="Omen: A story driven table top RPG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full w-full p-4 ">
        <div className="card bg-neutral-100 shadow-xl">
          <div className="card-body flex flex-col items-center gap-4 text-center">
            <AdminDashboardControls
              filterText={filterText}
              selectRole={selectRole}
            />
            <AdminDashboardTable users={users} />
            <AdminDashboardPagination
              nextPageDisabled={nextPageDisabled}
              prevPageDisabled={prevPageDisabled}
              selectPageSize={selectPageSize}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
