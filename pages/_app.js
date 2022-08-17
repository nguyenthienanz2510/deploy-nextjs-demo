import "tailwindcss/tailwind.css";
import "../styles/globals.scss";
import Amplify, { API, withSSRContext } from "aws-amplify";
import awsExports from "../aws-exports";

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  // console.log(pageProps);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
