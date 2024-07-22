import React from "react";

import { Container, WrapperBasicInformation } from "./styles";
import { ISessionProps } from "../../models/session/session.interface";

export const SessionCard = ({ data }: { data: ISessionProps }) => {
  const formatDateTime = (date: Date) => {
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth()
    ).padStart(
      2,
      "0"
    )}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  const splitDateAndTime = (date: string) => {
    return date.split(" ");
  };

  const hasExpired = (expiresIn: string) => {
    const date = new Date(expiresIn);
    return date > new Date();
  };

  return (
    <Container to={`/pauta/${data.id}`}>
      <WrapperBasicInformation hasexpires={String(hasExpired(data.expiresIn))}>
        <h2>N°{data.id}</h2>
        <span>{hasExpired(data.expiresIn) ? "Ativo" : "Expirado"}</span>
      </WrapperBasicInformation>

      <div className="wrapper-date">
        <div>
          <strong>Criado em:</strong>
          <p>{splitDateAndTime(formatDateTime(new Date(data.createAt)))[0]}</p>
          <p>{splitDateAndTime(formatDateTime(new Date(data.createAt)))[1]}</p>
        </div>
        <div className="linha-vertical"></div>
        <div>
          <strong>Data expiração:</strong>
          <p>{splitDateAndTime(formatDateTime(new Date(data.expiresIn)))[0]}</p>
          <p>{splitDateAndTime(formatDateTime(new Date(data.expiresIn)))[1]}</p>
        </div>
      </div>
    </Container>
  );
};
