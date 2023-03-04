import React from "react";

type Props = {
  filterText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectRole: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const AdminDashboardControls = ({ filterText, selectRole }: Props) => {
  return (
    <div className="flex w-full flex-row justify-start gap-2">
      <div className="form-control w-full max-w-xs">
        <label htmlFor="text-filter" className="label sr-only">
          <span className="label-text ">Filter by Text</span>
        </label>
        <input
          id="text-filter"
          type="text"
          placeholder="Filter By Name or Email..."
          className="input-bordered input w-full max-w-xs"
          onChange={filterText}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label sr-only">
          <span className="label-text">Filter by Role</span>
        </label>
        <select className="select-bordered select" onChange={selectRole}>
          <option value="user">Users</option>
          <option value="admin">Admins</option>
        </select>
      </div>
    </div>
  );
};
