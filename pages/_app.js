import "tailwindcss/tailwind.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  // console.log(pageProps);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
