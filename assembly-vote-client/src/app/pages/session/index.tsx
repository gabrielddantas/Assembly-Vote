import React, { useEffect, useState } from "react";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";

import { Container, WrapperHeader, WrapperContent, MUIStyles } from "./styles";
import { Box, Button, Typography } from "@mui/material";
import { colors } from "../../../styles/colors";
import { Api, handleErrorMessages } from "../../config/axios.config";
import { ISessionProps } from "../../models/session/session.interface";
import { ApiResponse } from "../../models/general/api-response.interface";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import {
  IPaginatedData,
  IPagination,
} from "../../models/general/pagination.interface";
import { SessionCard } from "../../components/session-card";
import { ScheduleRegister } from "../../components/modal/schedule-register";

export const Session = () => {
  const [openModal, setOpenModal] = useState(false);
  const [sessions, setSessions] = useState<ISessionProps[]>([]);
  const [pagination, setPagination] = useState<IPagination>();

  useEffect(() => {
    getSessions();
  }, []);

  const getSessions = async (page: number = 0) => {
    try {
      const { data } = await Api.get<
        ApiResponse<IPaginatedData<ISessionProps[]>>
      >("/sessions", {
        params: {
          page: page,
        },
      });
      setSessions(data.data.content);
      setPagination(data.data.pagination);
    } catch (error) {
      handleErrorMessages(error);
    }
  };

  const handlePage = (page: number) => {
    if (page === pagination?.page) return;

    getSessions(page);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = (scheduleRegistered: boolean) => {
    console.log(scheduleRegistered);

    if (scheduleRegistered) {
      getSessions();
    }
    setOpenModal(false);
  };

  return (
    <Container>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <ScheduleRegister
            handleCloseModal={(scheduleRegistered) =>
              handleCloseModal(scheduleRegistered)
            }
          />
        </Box>
      </Modal>
      <WrapperHeader>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              color: colors.deepSeaBlue,
              fontSize: "18px",
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Sessões
          </Typography>
        </Breadcrumbs>
        <Button
          variant="contained"
          sx={MUIStyles}
          type="button"
          onClick={handleOpenModal}
        >
          Cadastrar uma pauta
        </Button>
      </WrapperHeader>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          color: colors.deepSeaBlue,
          marginTop: "20px",
          fontSize: "28px",
        }}
      >
        Listagem de sessões
      </Typography>
      <WrapperContent>
        <div className="wrapper-cards">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <SessionCard key={session.id} data={session} />
            ))
          ) : (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: colors.deepSeaBlue,
                marginTop: "20px",
                fontSize: "18px",
              }}
            >
              Nenhuma sessão encontrada
            </Typography>
          )}
        </div>
        <Pagination
          count={pagination?.numberOfPages || 1}
          page={pagination?.page ? pagination?.page + 1 : 1}
          onChange={(event, page) => handlePage(page - 1)}
        />
      </WrapperContent>
    </Container>
  );
};
