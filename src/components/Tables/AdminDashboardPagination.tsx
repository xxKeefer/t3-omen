import React from "react";

type Props = {
  prevPageDisabled: boolean;
  nextPageDisabled: boolean;
  selectPageSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const AdminDashboardPagination = ({
  nextPageDisabled,
  prevPageDisabled,
  selectPageSize,
}: Props) => {
  return (
    <div className="flex w-full flex-row justify-start gap-2">
      <div className="btn-group grid w-full max-w-xs grid-cols-2">
        <button disabled={prevPageDisabled} className="btn-outline btn invert">
          Previous page
        </button>
        <button disabled={nextPageDisabled} className="btn-outline btn invert">
          Next
        </button>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label sr-only">
          <span className="label-text">Page Size</span>
        </label>
        <select className="select-bordered select" onChange={selectPageSize}>
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
        </select>
      </div>
    </div>
  );
};
