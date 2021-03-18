import React, { useMemo, useState } from "react";
import Toggle from "../Toggle";

import emojis from "../../utils/emojis";
import { Container, Profile, Welcome, UserName } from "./styles";

import { useTheme } from "../../hooks/theme";

const MainHeader: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  // Trocar tema
  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );

  // Trocar tema
  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);
    return emojis[indice];
  }, []);
  return (
    <Container>
      {/* Trocar tema */}
      <Toggle
        checked={darkTheme}
        labelLeft="Light"
        labelRight="Dark"
        onChange={handleChangeTheme}
      />

      <Profile>
        <Welcome>Hello, {emoji}</Welcome>
        <UserName>Rafael Palau</UserName>
      </Profile>
    </Container>
  );
};

export default MainHeader;
