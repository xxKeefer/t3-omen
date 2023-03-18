import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Shell } from "~/components/Layout";
import { PrivateRoute } from "~/components/Routes/PrivateRoute";
import { adminRoutes, protectedRoutes } from "~/constants";
import { ActionDeckProvider } from "~/contexts/ActionDeckContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ActionDeckProvider>
        <Shell>
          <PrivateRoute
            adminRoutes={adminRoutes}
            protectedRoutes={protectedRoutes}
          >
            <Component {...pageProps} />
          </PrivateRoute>
        </Shell>
      </ActionDeckProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
