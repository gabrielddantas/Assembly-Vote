import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { breakpoints } from "../../../styles/breakpoints";
import { Link } from "react-router-dom";

export const Container = styled(Link)`
  text-decoration: none;

  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  height: 130px;

  @media screen and (min-width: ${breakpoints.sm}) {
    width: 230px;
  }

  .wrapper-date {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .linha-vertical {
      height: 120%;
      border-left: 2px solid ${colors.silverSand};
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 5px;

      strong {
        font-size: 18px;
        color: ${colors.deepSeaBlue};
      }

      p {
        font-size: 14px;
        color: ${colors.black};

        &:nth-child(2) {
          font-size: 16px;
        }
      }
    }
  }
`;

export const WrapperBasicInformation = styled.div<{ hasexpires?: string }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 28px;
    color: ${colors.deepSeaBlue};
  }

  span {
    font-size: 18px;
    color: ${(props) =>
      props.hasexpires == "true" ? colors.green : colors.red};
  }
`;
