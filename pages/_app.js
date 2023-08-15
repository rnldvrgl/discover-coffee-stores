
import "../styles/globals.css";
import StoreProvider from "@/context/storeContext"

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;