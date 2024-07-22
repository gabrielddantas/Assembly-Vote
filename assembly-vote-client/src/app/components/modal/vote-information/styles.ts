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

  height: 100%;
  width: 100%;

  padding: 20px;

  border-radius: 10px;
  background-color: ${colors.white};
  overflow: auto;

  .close {
    display: flex;
    position: relative;
    justify-content: flex-end;
    align-items: center;
    width: 97%;

    cursor: pointer;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    max-height: 500px;
    max-width: 800px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: ${colors.deepSeaBlue};
  font-weight: 700;

  padding: 0 20px;

  text-transform: uppercase;
`;

export const Description = styled.p`
  padding: 0 20px;
  font-size: 16px;
  color: ${colors.black};
`;

export const WrapperVotesCard = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  margin-top: 20px;

  .wrapper-specific-votes {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
  }

  .wrapper-vote-total {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

export const VotesCard = styled.div<{
  fontcolor: keyof typeof colors;
  color: keyof typeof colors;
  width: number;
}>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width}%;

  padding: 20px;
  margin-top: 20px;

  background-color: ${({ color }) => colors[color]};
  border-radius: 10px;

  span {
    font-size: 14px;
    color: ${colors.black};
    font-weight: bold;
    color: ${({ fontcolor }) => colors[fontcolor]};
  }

  h2 {
    color: ${colors.black};
    font-size: 32px;
    text-align: center;
    margin-top: 5px;
    color: ${({ fontcolor }) => colors[fontcolor]};
  }
`;
