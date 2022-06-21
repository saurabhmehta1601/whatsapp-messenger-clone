import "@Styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@Redux/store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
function MyApp({ Component, pageProps }: AppProps) {
  // later I will set the activeUser using firebase auth
  return (
    <AlertProvider template={AlertTemplate as any} timeout={3000}>
      <Provider store={store}>
        <CssBaseline />
        <Component {...pageProps} />
      </Provider>
    </AlertProvider>
  );
}

export default MyApp;
