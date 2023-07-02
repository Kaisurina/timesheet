import { useEffect } from "react";
import { withProviders } from "./providers";
import { Routing } from "pages";
import { Header } from "widgets";

const App = () => {
  useEffect(() => {
    console.log("init");
  }, []);
  return (
    <div className="app">
      <Header />
      <Routing />
    </div>
  );
};

export default withProviders(App);
