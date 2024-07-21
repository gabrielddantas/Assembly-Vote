import React from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";

import { Container, Wrapper, WrapperForm, Title, MUIStyles } from "./styles";
import { Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Api, handleErrorMessages } from "../../../config/axios.config";
import { ApiResponse } from "../../../models/general/api-response.interface";
import { IScheduleProps } from "../../../models/schedule/schedule.interface";
import { toastr } from "../../../services/toastr.service";

const schema = yup.object().shape({
  title: yup.string().required("O campo título é obrigatório"),
  description: yup.string().required("O campo descrição é obrigatório"),
  session: yup.object().shape({
    expiresIn: yup.number(),
  }),
});

export const ScheduleRegister = ({
  handleCloseModal,
}: {
  handleCloseModal: (scheduleRegistered: boolean) => void;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegisterSchedule = async (data: any) => {
    try {
      await Api.post<ApiResponse<IScheduleProps>>("/schedules", data);

      toastr(
        { message: "Pauta cadastrada com sucesso", title: "Sucesso" },
        "success"
      );
      handleCloseModal(true);
    } catch (error) {
      handleErrorMessages(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <div className="close" onClick={() => handleCloseModal(false)}>
          <CloseIcon
            sx={{
              fontSize: 32,
            }}
          />
        </div>
        <Title>Cadastrar pauta</Title>
        <WrapperForm
          onSubmit={handleSubmit((data) => {
            handleRegisterSchedule(data);
          })}
        >
          <div className="wrapper-fields">
            <Controller
              defaultValue=""
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Título"
                  variant="outlined"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  {...field}
                  sx={MUIStyles}
                />
              )}
            />
            <Controller
              name="session.expiresIn"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Tempo de duração (Em minutos)"
                  type="number"
                  variant="outlined"
                  {...field}
                  sx={MUIStyles}
                />
              )}
            />
          </div>
          <Controller
            defaultValue=""
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Descrição"
                variant="outlined"
                error={!!errors.description}
                helperText={errors.description?.message}
                {...field}
                sx={{
                  ...MUIStyles,
                  width: "100%",
                }}
              />
            )}
          />

          <Button variant="contained" sx={MUIStyles} type="submit">
            Registrar
          </Button>
        </WrapperForm>
      </Wrapper>
    </Container>
  );
};
