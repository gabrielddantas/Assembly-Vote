import { SxProps, Theme } from "@mui/material";
import styled from "styled-components";

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
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  height: 100%;

  .wrapper-cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;

    margin-bottom: 20px;
  }
`;
