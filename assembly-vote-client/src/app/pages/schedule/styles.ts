import { SxProps, Theme } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const MUIStyles: SxProps<Theme> = {
  height: "50px",
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const WrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 10px;
  margin-top: 20px;
  height: 100%;
  overflow: auto;

  .wrapper-cards {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;

    margin-bottom: 20px;
  }
`;

export const WrapperScroll = styled.div`
  overflow: auto;
`;

export const LinkContainer = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  color: ${colors.deepSeaBlue};
`;
