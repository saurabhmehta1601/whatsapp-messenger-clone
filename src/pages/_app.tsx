import "@Styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@Redux/store";
import { useAppDispatch } from "@Redux/hooks";

function MyApp({ Component, pageProps }: AppProps) {
  // later I will set the activeUser using firebase auth
  return (
    <Provider store={store}>
      <CssBaseline />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
