import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type Props = {
  adminRoutes: string[];
  protectedRoutes: string[];
  children: JSX.Element;
};

export function PrivateRoute({
  adminRoutes,
  protectedRoutes,
  children,
}: Props): JSX.Element {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  const pathIsProtected = protectedRoutes.some((route) =>
    router.pathname.startsWith(route)
  );
  const pathIsAdminOnly = adminRoutes.some((route) =>
    router.pathname.startsWith(route)
  );
  const isProtectedRouted = pathIsProtected || pathIsAdminOnly;
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const isAdmin = sessionData?.user.role === "admin";
  const isDaniel = sessionData?.user.email === "danieljohnkeefer@gmail.com";

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isDaniel && pathIsAdminOnly) {
      void router.push("/");
    }
    if (!isLoading && !isAuthenticated && pathIsProtected) {
      void router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated, pathIsProtected, isAdmin, isDaniel]);

  //TODO: Add a better spinner for this
  if ((isLoading || !isAuthenticated) && isProtectedRouted) {
    return <span>Loading...</span>;
  }

  return children;
}
