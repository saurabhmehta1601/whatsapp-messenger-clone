import "@Styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@Redux/store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { ActiveUserProvider } from "@Components/exports";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider
      template={AlertTemplate as any}
      timeout={3000}
      transition="fade"
    >
      <Provider store={store}>
        <ActiveUserProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </ActiveUserProvider>
      </Provider>
    </AlertProvider>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
