import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "urql";
import { FilterContextProvider } from "../contexts/FilterContext";
import { ModalContextProvider } from "../contexts/ModalContext";
import { client, ssrCache } from "../lib/urql";
import "../styles/globals.css";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ session: Session; urqlState: any }>) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <SessionProvider session={pageProps.session}>
      <Provider value={client}>
        <ModalContextProvider>
        <FilterContextProvider>
          <Component {...pageProps} />
        </FilterContextProvider>
        </ModalContextProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
