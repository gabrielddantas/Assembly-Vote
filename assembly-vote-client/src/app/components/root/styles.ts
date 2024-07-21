import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const ContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  width: 100vw;

  background-color: ${colors.silver};
`;

export const WrapperContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: ${colors.silver};

  .content {
    height: calc(100% - 32px);
    width: calc(100% - 32px);
  }
`;
