import type { NextPage } from "next";

import { api } from "~/utils/api";
import { Head } from "~/components/Layout";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiChevronUp, FiTrash2 } from "react-icons/fi";
import { useSession } from "next-auth/react";

type CreateConfigPayload =
  inferRouterInputs<AppRouter>["characters"]["createConfig"];
type Configuration =
  inferRouterOutputs<AppRouter>["characters"]["getConfigs"][number];

const Dashboard: NextPage = () => {
  const { data: session } = useSession();

  const { mutate: createConfiguration, isLoading: createLoading } =
    api.characters.createConfig.useMutation();

  const { mutate: updateConfiguration, isLoading: updateLoading } =
    api.characters.updateConfig.useMutation();

  const { mutate: deleteConfiguration, isLoading: deleteLoading } =
    api.characters.deleteConfig.useMutation();

  const { data: configurations, isLoading: readLoading } =
    api.characters.getConfigs.useQuery(
      { user: session?.user?.id ?? "" },
      { enabled: !!session }
    );

  const isLoading =
    createLoading || updateLoading || readLoading || deleteLoading;

  //TODO: add error toast system for trpc errors

  const { characters } = api.useContext();

  const onSubmit = (payload: CreateConfigPayload) => {
    selectedConfiguration?.id === undefined
      ? createConfiguration(payload, {
          onSuccess: () => void characters.getConfigs.invalidate(),
        })
      : updateConfiguration(
          {
            ...payload,
            id: selectedConfiguration.id,
          },
          { onSuccess: () => void characters.getConfigs.invalidate() }
        );
  };

  const [aspectsToggle, setAspectsToggle] = useState(false);
  const [approachesToggle, setApproachesToggle] = useState(false);
  const [skillsToggle, setSkillsToggle] = useState(false);
  const [selectedConfiguration, setSelectedConfiguration] =
    useState<Configuration>();

  const handleSelection =
    (configurations: Configuration[] | undefined) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (configurations === undefined) return;
      const selected = configurations.find(
        (config) => config.id === Number(e.target.value)
      );
      setSelectedConfiguration(selected);

      selected !== undefined
        ? // 😱 WHY???? why are they different types? where do the nulls come from?
          reset(selected as CreateConfigPayload)
        : reset(DEFAULT_VALUES);
    };

  const { register, handleSubmit, reset } = useForm<CreateConfigPayload>({
    defaultValues: DEFAULT_VALUES,
  });

  return (
    <>
      <Head
        title="Omen | Dashboard"
        meta="Omen: A story driven table top RPG"
      />
      <div className="h-full w-full p-4 ">
        <div className="card bg-base-300 shadow-xl">
          <form
            className="card-body flex flex-col items-start gap-4 "
            onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
          >
            <h1 className="card-title text-3xl font-black">
              Custom Character Sheet Configuration
            </h1>
            <div className="flex w-full flex-row flex-wrap-reverse justify-between ">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Setting Name</span>
                </label>
                <input
                  {...register("campaignName")}
                  className="input-bordered input w-full max-w-xs"
                />
              </div>
              <div className="flex w-full max-w-xs flex-nowrap items-end gap-4">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Load Configuration</span>
                  </label>
                  <select
                    className="select-bordered select"
                    onChange={handleSelection(configurations)}
                    disabled={(configurations?.length ?? 0) === 0}
                  >
                    <option selected value={undefined}>
                      New Configuration
                    </option>
                    {configurations?.map(({ id, campaignName }) => (
                      <option key={id} value={id}>
                        {campaignName}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  className="btn-error btn-square btn"
                  disabled={selectedConfiguration === undefined || isLoading}
                  onClick={() =>
                    selectedConfiguration?.id !== undefined &&
                    deleteConfiguration(
                      { id: selectedConfiguration.id },
                      {
                        onSuccess: () => {
                          reset(DEFAULT_VALUES);
                          setSelectedConfiguration(undefined);
                          void characters.getConfigs.invalidate();
                        },
                      }
                    )
                  }
                >
                  <FiTrash2 size={24} className="stroke-white" />
                </button>
              </div>
            </div>
            <div
              tabIndex={0}
              className={`collapse-${
                aspectsToggle ? "open" : "close"
              } -box collapse w-full border border-base-300 bg-base-100`}
            >
              <div
                className="collapse-title flex cursor-pointer justify-between pr-4"
                onClick={() => setAspectsToggle(!aspectsToggle)}
              >
                <span className="text-xl font-medium">Rename Aspects</span>
                <button type="button">
                  <FiChevronUp
                    size={24}
                    className={aspectsToggle ? "rotate-180" : "rotate-0"}
                  />
                </button>
              </div>
              <div className="collapse-content flex flex-wrap justify-start gap-4">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Concept</span>
                  </label>
                  <input
                    {...register("aspects.concept")}
                    className="input-bordered input w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Trouble</span>
                  </label>
                  <input
                    {...register("aspects.trouble")}
                    className="input-bordered input w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Profession</span>
                  </label>
                  <input
                    {...register("aspects.profession")}
                    className="input-bordered input w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Reputation</span>
                  </label>
                  <input
                    {...register("aspects.reputation")}
                    className="input-bordered input w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Loyalty</span>
                  </label>
                  <input
                    {...register("aspects.loyalty")}
                    className="input-bordered input w-full max-w-xs"
                  />
                </div>
              </div>
            </div>
            <div
              tabIndex={0}
              className={`collapse-${
                approachesToggle ? "open" : "close"
              } -box collapse w-full border border-base-300 bg-base-100`}
            >
              <div
                className="collapse-title flex cursor-pointer justify-between pr-4"
                onClick={() => setApproachesToggle(!approachesToggle)}
              >
                <span className="text-xl font-medium">Rename Approaches</span>
                <button type="button">
                  <FiChevronUp
                    size={24}
                    className={approachesToggle ? "rotate-180" : "rotate-0"}
                  />
                </button>
              </div>
              <div className="collapse-content flex flex-wrap justify-start gap-4">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Heroic</span>
                  </label>
                  <input
                    {...register("approaches.heroic")}
                    className="input-bordered input w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Expert</span>
                  </label>
                  <input
                    {...register("approaches.expert")}
                    className="input-bordered input w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Patient</span>
                  </label>
                  <input
                    {...register("approaches.patient")}
                    className="input-bordered input w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Brilliant</span>
                  </label>
                  <input
                    {...register("approaches.brilliant")}
                    className="input-bordered input w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Influential</span>
                  </label>
                  <input
                    {...register("approaches.influential")}
                    className="input-bordered input w-full max-w-xs"
                  />
                </div>
              </div>
            </div>
            <div
              tabIndex={0}
              className={`collapse-${
                skillsToggle ? "open" : "close"
              } -box collapse w-full border border-base-300 bg-base-100`}
            >
              <div
                className="collapse-title flex cursor-pointer justify-between pr-4"
                onClick={() => setSkillsToggle(!skillsToggle)}
              >
                <span className="text-xl font-medium">Rename Skills</span>
                <button type="button">
                  <FiChevronUp
                    size={24}
                    className={skillsToggle ? "rotate-180" : "rotate-0"}
                  />
                </button>
              </div>
              <div className="collapse-content flex flex-wrap justify-start gap-4">
                <div className="rounded-xl border-2 border-solid border-red-500 p-4">
                  <h2 className="mb-4 font-bold">Rename Heroic Skills</h2>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Might</span>
                      <span className="badge label-text-alt indicator border-red-500 bg-red-500" />
                    </label>
                    <input
                      {...register("skills.0.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Speed</span>
                      <span className="badge label-text-alt indicator border-green-500 bg-green-500" />
                    </label>
                    <input
                      {...register("skills.1.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Guts</span>
                      <span className="badge label-text-alt indicator border-purple-500 bg-purple-500" />
                    </label>
                    <input
                      {...register("skills.2.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Strike</span>
                      <span className="badge label-text-alt indicator border-blue-500 bg-blue-500" />
                    </label>
                    <input
                      {...register("skills.3.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Composure</span>
                      <span className="badge label-text-alt indicator border-yellow-500 bg-yellow-500" />
                    </label>
                    <input
                      {...register("skills.4.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                </div>
                <div className="rounded-xl border-2 border-solid  border-green-500 p-4">
                  <h2 className="mb-4 font-bold">Rename Expert Skills</h2>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Target</span>
                      <span className="badge label-text-alt indicator border-red-500 bg-red-500" />
                    </label>
                    <input
                      {...register("skills.5.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Nimble</span>
                      <span className="badge label-text-alt indicator border-green-500 bg-green-500" />
                    </label>
                    <input
                      {...register("skills.6.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Precision</span>
                      <span className="badge label-text-alt indicator border-purple-500 bg-purple-500" />
                    </label>
                    <input
                      {...register("skills.7.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Operate</span>
                      <span className="badge label-text-alt indicator border-blue-500 bg-blue-500" />
                    </label>
                    <input
                      {...register("skills.8.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Deceive</span>
                      <span className="badge label-text-alt indicator border-yellow-500 bg-yellow-500" />
                    </label>
                    <input
                      {...register("skills.9.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                </div>
                <div className="rounded-xl border-2 border-solid  border-purple-500 p-4">
                  <h2 className="mb-4 font-bold">Rename Patient Skills</h2>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Principle</span>
                      <span className="badge label-text-alt indicator border-red-500 bg-red-500" />
                    </label>
                    <input
                      {...register("skills.10.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Sneak</span>
                      <span className="badge label-text-alt indicator border-green-500 bg-green-500" />
                    </label>
                    <input
                      {...register("skills.11.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Search</span>
                      <span className="badge label-text-alt indicator border-purple-500 bg-purple-500" />
                    </label>
                    <input
                      {...register("skills.12.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Decipher</span>
                      <span className="badge label-text-alt indicator border-blue-500 bg-blue-500" />
                    </label>
                    <input
                      {...register("skills.13.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Rapport</span>
                      <span className="badge label-text-alt indicator border-yellow-500 bg-yellow-500" />
                    </label>
                    <input
                      {...register("skills.14.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                </div>
                <div className="rounded-xl border-2 border-solid border-blue-500 p-4">
                  <h2 className="mb-4 font-bold">Rename Brilliant Skills</h2>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Anatomy</span>
                      <span className="badge label-text-alt indicator border-red-500 bg-red-500" />
                    </label>
                    <input
                      {...register("skills.15.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Savvy</span>
                      <span className="badge label-text-alt indicator border-green-500 bg-green-500" />
                    </label>
                    <input
                      {...register("skills.16.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Protocol</span>
                      <span className="badge label-text-alt indicator border-purple-500 bg-purple-500" />
                    </label>
                    <input
                      {...register("skills.17.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Academics</span>
                      <span className="badge label-text-alt indicator border-blue-500 bg-blue-500" />
                    </label>
                    <input
                      {...register("skills.18.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Lore</span>
                      <span className="badge label-text-alt indicator border-yellow-500 bg-yellow-500" />
                    </label>
                    <input
                      {...register("skills.19.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                </div>
                <div className="rounded-xl border-2 border-solid border-yellow-500 p-4">
                  <h2 className="mb-4 font-bold">Rename Influential Skills</h2>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Threaten</span>
                      <span className="badge label-text-alt indicator border-red-500 bg-red-500" />
                    </label>
                    <input
                      {...register("skills.20.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Convince</span>
                      <span className="badge label-text-alt indicator border-green-500 bg-green-500" />
                    </label>
                    <input
                      {...register("skills.21.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Intuition</span>
                      <span className="badge label-text-alt indicator border-purple-500 bg-purple-500" />
                    </label>
                    <input
                      {...register("skills.22.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Networking</span>
                      <span className="badge label-text-alt indicator border-blue-500 bg-blue-500" />
                    </label>
                    <input
                      {...register("skills.23.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Presence</span>
                      <span className="badge label-text-alt indicator border-yellow-500 bg-yellow-500" />
                    </label>
                    <input
                      {...register("skills.24.name")}
                      className="input-bordered input w-full max-w-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`btn-${
                selectedConfiguration === undefined ? "primary" : "secondary"
              } btn-md btn w-full`}
              disabled={isLoading}
            >
              {selectedConfiguration === undefined ? "Save" : "Update"}{" "}
              Character Sheet Configuration
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

const DEFAULT_VALUES: CreateConfigPayload = {
  campaignName: "",
  approaches: {
    heroic: "",
    expert: "",
    patient: "",
    brilliant: "",
    influential: "",
  },
  aspects: {
    concept: "",
    trouble: "",
    profession: "",
    reputation: "",
    loyalty: "",
  },
  skills: [
    { name: "", replaces: "might", approach: "heroic", talent: "heroic" },
    { name: "", replaces: "speed", approach: "heroic", talent: "expert" },
    { name: "", replaces: "guts", approach: "heroic", talent: "patient" },
    {
      name: "",
      replaces: "strike",
      approach: "heroic",
      talent: "brilliant",
    },
    {
      name: "",
      replaces: "composure",
      approach: "heroic",
      talent: "influential",
    },
    { name: "", replaces: "target", approach: "expert", talent: "heroic" },
    { name: "", replaces: "nimble", approach: "expert", talent: "expert" },
    {
      name: "",
      replaces: "precision",
      approach: "expert",
      talent: "patient",
    },
    {
      name: "",
      replaces: "operate",
      approach: "expert",
      talent: "brilliant",
    },
    {
      name: "",
      replaces: "deceive",
      approach: "expert",
      talent: "influential",
    },
    {
      name: "",
      replaces: "principle",
      approach: "patient",
      talent: "heroic",
    },
    { name: "", replaces: "sneak", approach: "patient", talent: "expert" },
    {
      name: "",
      replaces: "search",
      approach: "patient",
      talent: "patient",
    },
    {
      name: "",
      replaces: "decipher",
      approach: "patient",
      talent: "brilliant",
    },
    {
      name: "",
      replaces: "rapport",
      approach: "patient",
      talent: "influential",
    },
    {
      name: "",
      replaces: "anatomy",
      approach: "brilliant",
      talent: "heroic",
    },
    {
      name: "",
      replaces: "savvy",
      approach: "brilliant",
      talent: "expert",
    },
    {
      name: "",
      replaces: "protocol",
      approach: "brilliant",
      talent: "patient",
    },
    {
      name: "",
      replaces: "academics",
      approach: "brilliant",
      talent: "brilliant",
    },
    {
      name: "",
      replaces: "lore",
      approach: "brilliant",
      talent: "influential",
    },
    {
      name: "",
      replaces: "threaten",
      approach: "influential",
      talent: "heroic",
    },
    {
      name: "",
      replaces: "convince",
      approach: "influential",
      talent: "expert",
    },
    {
      name: "",
      replaces: "intuition",
      approach: "influential",
      talent: "patient",
    },
    {
      name: "",
      replaces: "networking",
      approach: "influential",
      talent: "brilliant",
    },
    {
      name: "",
      replaces: "presence",
      approach: "influential",
      talent: "influential",
    },
  ],
};
