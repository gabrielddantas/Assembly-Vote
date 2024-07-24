import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { breakpoints } from "../../../styles/breakpoints";
import { SxProps, Theme } from "@mui/material";

export const MUIStyles: SxProps<Theme> = {
  width: {
    xs: "90%",
    sm: "70%",
  },
  marginBottom: "40px",
  height: "50px",
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;

  background-color: ${colors.daySkyBlue};
`;

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  border-radius: 10px;

  background-color: ${colors.white};

  @media (min-width: ${breakpoints.sm}) {
    max-height: 400px;
    max-width: 600px;
  }
`;

export const Title = styled.p`
  color: ${colors.deepSeaBlue};
  font-size: 24px;
  font-weight: bold;

  margin-bottom: 30px;
`;

export const Text = styled.a`
  color: ${colors.silverSand};
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    color: ${colors.deepSeaBlue};
  }
`;
