import React from "react";
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
} from "react-icons/md";

import logoImg from "../../assets/logo.svg";
import {
  Container,
  Header,
  LogoImg,
  Title,
  MenuContainer,
  MenuItemLink,
} from "./styles";

const Aside: React.FC = () => {
  return (
    <Container>
      <Header>
        <LogoImg src={logoImg} alt="Logo My wallet" />
        <Title>My Wallet</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="#">
          <MdDashboard /> Dashboard
        </MenuItemLink>
        <MenuItemLink href="#">
          <MdArrowUpward /> Inputs
        </MenuItemLink>
        <MenuItemLink href="#">
          <MdArrowDownward />
          Output
        </MenuItemLink>
        <MenuItemLink href="#">
          <MdExitToApp />
          Logoff
        </MenuItemLink>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
