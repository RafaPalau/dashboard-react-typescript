import React, { useState } from "react";
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
  MdClose,
  MdMenu,
} from "react-icons/md";

import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";
import { useTheme } from "../../hooks/theme";
import Toggle from "../Toggle";
import {
  Container,
  Header,
  LogoImg,
  Title,
  MenuContainer,
  MenuItemLink,
  MenuItemButton,
  ToggleMenu,
  ThemeToggleFooter
} from "./styles";

const Aside: React.FC = () => {
  const { signOut } = useAuth();
  //trocar tema no responsivo
  const { toggleTheme, theme } = useTheme();
  const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);

  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );
  

  const handleToggleMenu = () => {
    setToggleMenuIsOpened(!toggleMenuIsOpened);
  };

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  return (
    <Container menuIsOpen={toggleMenuIsOpened}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
          {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
        </ToggleMenu>
        <LogoImg src={logoImg} alt="Logo My wallet" />
        <Title>Minha Carteira</Title>
      </Header>
      <MenuContainer>
        <MenuItemLink href="/">
          <MdDashboard /> Dashboard
        </MenuItemLink>
        <MenuItemLink href="/list/entry-balance">
          <MdArrowUpward /> Entradas
        </MenuItemLink>
        <MenuItemLink href="/list/exit-balance">
          <MdArrowDownward />
          Saídas
        </MenuItemLink>
        <MenuItemButton onClick={signOut}>
          <MdExitToApp />
          Sair
        </MenuItemButton>
      </MenuContainer>
      <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
      <Toggle
        checked={darkTheme}
        labelLeft="Light"
        labelRight="Dark"
        onChange={handleChangeTheme}
      />
      </ThemeToggleFooter>
    </Container>
  );
};

export default Aside;
