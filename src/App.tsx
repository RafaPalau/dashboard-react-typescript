import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import dark from './styles/themes/dark'
import light from './styles/themes/light'

import Dashboard from "./pages/Dashboard";
import Aside from "./components/Aside";
import MainHeader from "./components/MainHeader";
import Content from "./components/Content";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      <Layout />
    </ThemeProvider>
  );
};

export default App;
