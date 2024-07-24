import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Container, Wrapper, Title, Text, MUIStyles } from "./styles";
import { Api, handleErrorMessages } from "../../config/axios.config";
import { ApiResponse } from "../../models/general/api-response.interface";
import {
  getStorageData,
  keyStorage,
  setStorageData,
} from "../../services/session-storage.service";
import { IAssociateProps } from "../../models/associate/associate.interface";

const schema = yup.object().shape({
  cpf: yup
    .string()
    .required("O campo CPF é obrigatório")
    .length(11, "O CPF deve ter 11 dígitos"),
  name: yup.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
});

export const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isRegistered, setIsRegistered] = React.useState(true);
  const navigate = useNavigate();

  const handleVerifyIfIsRegistered = async ({ cpf }: { cpf: string }) => {
    try {
      const { data } = await Api.get<ApiResponse<IAssociateProps>>(
        `/associates/exists/${cpf}`
      );
      if (data.data == null) {
        setIsRegistered(false);
        return;
      }

      setStorageData(keyStorage.associate, data.data);
      navigate("/");
    } catch (error) {
      handleErrorMessages(error);
    }
  };

  const handleRegisterAssociate = async (data: IAssociateProps) => {
    try {
      const { data: response } = await Api.post<ApiResponse<IAssociateProps>>(
        "/associates",
        data
      );

      setStorageData(keyStorage.associate, response.data);
      navigate("/");
    } catch (error) {
      handleErrorMessages(error);
    }
  };

  return (
    <>
      <Container>
        <Wrapper
          onSubmit={handleSubmit((data) => {
            !isRegistered
              ? handleRegisterAssociate(data)
              : handleVerifyIfIsRegistered({ cpf: data.cpf });
          })}
        >
          <Title>
            {!isRegistered ? "Register new account" : "Login to your account"}
          </Title>
          <Controller
            defaultValue=""
            name="cpf"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="CPF"
                inputProps={{
                  maxLength: 11,
                }}
                variant="outlined"
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                {...field}
                sx={MUIStyles}
              />
            )}
          />
          {!isRegistered && (
            <Controller
              defaultValue=""
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...field}
                  sx={MUIStyles}
                />
              )}
            />
          )}
          <Button
            variant="contained"
            sx={MUIStyles}
            endIcon={isRegistered && <KeyboardArrowRightIcon />}
            type="submit"
          >
            {!isRegistered ? "Registrar" : "Entrar"}
          </Button>
          <Text
            onClick={() => {
              isRegistered ? setIsRegistered(false) : setIsRegistered(true);
            }}
          >
            {isRegistered ? "Não possui uma conta?" : "Já possui uma conta?"}
          </Text>
        </Wrapper>
      </Container>
    </>
  );
};
