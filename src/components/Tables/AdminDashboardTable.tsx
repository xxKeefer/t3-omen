import type { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import { api } from "~/utils/api";
import { blurInput } from "~/utils/blurInput";

type Props = {
  users: User[] | undefined;
};

export const AdminDashboardTable = ({ users }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Verified?</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <th>{user.cursor}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.emailVerified
                  ? user.emailVerified.toLocaleDateString()
                  : "No"}
              </td>
              <td>{user.role}</td>
              <td>
                <UserActions user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

type UserActionsProps = {
  user: User;
};
const UserActions = ({ user }: UserActionsProps) => {
  const { promoteUser, demoteUser } = api.adminDashboard;
  const { mutate: demote } = demoteUser.useMutation();
  const { mutate: promote } = promoteUser.useMutation();
  const { data: sessionData } = useSession();

  return (
    <div className="dropdown dropdown-top dropdown-end">
      <label
        role="button"
        tabIndex={0}
        className="btn-outline btn btn-square btn-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-5 w-5 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow invert"
      >
        {user.role === "admin" && (
          <li>
            <button
              className="btn-ghost btn"
              disabled={sessionData?.user.email === user.email}
              onClick={() => {
                demote({ id: user.id }, { onSuccess: blurInput });
              }}
            >
              Demote to User
            </button>
          </li>
        )}
        {user.role === "user" && (
          <li>
            <button
              className="btn-ghost btn"
              // disabled={sessionData?.user.email === user.email}
              onClick={() => {
                promote({ id: user.id }, { onSuccess: blurInput });
              }}
            >
              Promote to Admin
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
