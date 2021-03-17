import React from "react";
import { ThemeProvider } from "styled-components";
import Routes from "./routes";
import GlobalStyles from "./styles/GlobalStyles";

import { useTheme } from './hooks/theme'

const App: React.FC = () => {
  const {theme} = useTheme()
  return (
    // Trocar tema Theme Provider
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
