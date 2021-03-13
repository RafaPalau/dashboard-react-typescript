import React from "react";
import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard";
import Aside from "./components/Aside";
import MainHeader from "./components/MainHeader";
import Content from "./components/Content";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Layout />
        </>
  );
};

export default App;
