import { withProviders } from "./providers";
import { Routing } from "pages";
import "./index.css";
import Header from "widgets/header";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routing />
    </div>
  );
};

export default withProviders(App);
