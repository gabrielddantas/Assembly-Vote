import styled from "styled-components";
import { colors } from "../../../../styles/colors";
import { SxProps, Theme } from "@mui/material";
import { breakpoints } from "../../../../styles/breakpoints";

export const MUIStyles: SxProps<Theme> = {
  width: {
    xs: "100%",
    md: "48%",
  },
  marginBottom: "40px",
  height: "50px",
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  width: 100%;

  padding: 20px;

  border-radius: 10px;
  background-color: ${colors.white};

  .close {
    display: flex;
    position: relative;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    cursor: pointer;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    max-height: 400px;
    max-width: 700px;
  }
`;

export const WrapperForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  width: 90%;

  padding: 20px;

  border-radius: 10px;

  .wrapper-fields {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media screen and (min-width: ${breakpoints.md}) {
      flex-direction: row;
    }
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: ${colors.deepSeaBlue};
  font-weight: 700;
  margin: 20px 0;

  text-transform: uppercase;
`;
