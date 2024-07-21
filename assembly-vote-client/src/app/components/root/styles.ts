import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { breakpoints } from "../../../styles/breakpoints";

export const ContainerMobile = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  width: 100vw;

  background-color: ${colors.silver};

  @media screen and (min-width: ${breakpoints.lg}) {
    display: none;
  }
`;

export const WrapperMobileContent = styled.div`
  padding: 20px;
`;

export const ContainerDesktop = styled.div`
  @media screen and (max-width: ${breakpoints.lg}) {
    display: none;
  }

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;

  background-color: ${colors.daySkyBlue};
`;

export const WrapperDesktopSecondary = styled.div`
  display: flex;
  align-items: center;
  max-width: 1920px;

  height: 100%;
  width: 100%;
`;

export const WrapperInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  width: 280px;

  .handles {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 50px;
  }
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;

  height: calc(100% - 70px);
  width: calc(100% - 350px);

  background-color: ${colors.silver};
  border-radius: 20px;
  padding: 20px;
`;
